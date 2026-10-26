import { assets } from '../assets';
import type { EventItem } from '../contexts/DataContext';

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function buildUtcTimestamp(year: number, month: number, day: number, hour = 0, minute = 0, second = 0, millisecond = 0) {
  const date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date.getTime();
}

export function normalizeDateToTimestamp(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null;

    const normalizedValue = Math.abs(value) < 1e12 ? value * 1000 : value;
    const date = new Date(normalizedValue);
    return Number.isFinite(date.getTime()) ? date.getTime() : null;
  }

  if (typeof value !== 'string') return null;

  const text = value.trim();
  if (!text) return null;

  const numericOnly = text.replace(/[^0-9]/g, '');
  if (numericOnly.length >= 5 && /^\d+$/.test(numericOnly)) {
    const asNumber = Number(numericOnly);
    if (Number.isFinite(asNumber)) {
      const normalizedValue = Math.abs(asNumber) < 1e12 ? asNumber * 1000 : asNumber;
      const date = new Date(normalizedValue);
      if (Number.isFinite(date.getTime())) return date.getTime();
    }
  }

  const isoWithTime = text.match(/^([0-9]{4})[-/\s]([0-9]{1,2})[-/\s]([0-9]{1,2})(?:[T\s]+([0-9]{1,2}):([0-9]{2})(?::([0-9]{2})(?:\.([0-9]{1,3}))?)?(?:Z|([+-])([0-9]{2})(?::?([0-9]{2}))?)?)?$/i);
  if (isoWithTime) {
    const [, yearRaw, monthRaw, dayRaw, hourRaw = '0', minuteRaw = '0', secondRaw = '0', millisecondRaw = '0', tzSign, tzHourRaw, tzMinuteRaw] = isoWithTime;
    const year = Number(yearRaw);
    const month = Number(monthRaw) - 1;
    const day = Number(dayRaw);
    let hour = Number(hourRaw);
    let minute = Number(minuteRaw);
    let second = Number(secondRaw);
    const millisecond = Number(millisecondRaw || '0');

    if (tzSign && tzHourRaw) {
      const tzHour = Number(tzHourRaw);
      const tzMinute = Number(tzMinuteRaw || '0');
      const offsetMinutes = tzHour * 60 + tzMinute;
      const offsetMilliseconds = offsetMinutes * 60 * 1000;
      const adjustedMilliseconds = tzSign === '+' ? offsetMilliseconds : -offsetMilliseconds;
      const utcMilliseconds = Date.UTC(year, month, day, hour, minute, second, millisecond) - adjustedMilliseconds;
      return Number.isFinite(utcMilliseconds) ? utcMilliseconds : null;
    }

    const timestamp = buildUtcTimestamp(year, month, day, hour, minute, second, millisecond);
    if (timestamp !== null) return timestamp;
  }

  const monthNameMatch = text.match(/^(?:([A-Za-z]+)\s+(\d{1,2})(?:,\s*)?(\d{4})|((?:\d{1,2})?)\s*([A-Za-z]+)\s+(\d{4}))$/i);
  if (monthNameMatch) {
    const monthName = (monthNameMatch[1] || monthNameMatch[5] || '').toLowerCase();
    const dayValue = Number(monthNameMatch[2] || monthNameMatch[4] || '0');
    const yearValue = Number(monthNameMatch[3] || monthNameMatch[6]);
    const monthIndex = MONTHS[monthName];

    if (monthIndex !== undefined && Number.isFinite(yearValue) && dayValue >= 1 && dayValue <= 31) {
      const timestamp = buildUtcTimestamp(yearValue, monthIndex, dayValue);
      if (timestamp !== null) return timestamp;
    }
  }

  const slashDateMatch = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (slashDateMatch) {
    const [, firstValueRaw, secondValueRaw, yearRaw, hourRaw = '0', minuteRaw = '0', secondRaw = '0'] = slashDateMatch;
    const firstValue = Number(firstValueRaw);
    const secondValue = Number(secondValueRaw);
    const year = Number(yearRaw);
    const hour = Number(hourRaw);
    const minute = Number(minuteRaw);
    const second = Number(secondRaw);

    let monthIndex: number;
    let dayValue: number;

    if (firstValue > 12 && secondValue <= 12) {
      dayValue = firstValue;
      monthIndex = secondValue - 1;
    } else if (secondValue > 12 && firstValue <= 12) {
      dayValue = secondValue;
      monthIndex = firstValue - 1;
    } else {
      monthIndex = firstValue - 1;
      dayValue = secondValue;
    }

    const timestamp = buildUtcTimestamp(year, monthIndex, dayValue, hour, minute, second);
    if (timestamp !== null) return timestamp;
  }

  const simpleIsoDate = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (simpleIsoDate) {
    const [, yearRaw, monthRaw, dayRaw] = simpleIsoDate;
    const timestamp = buildUtcTimestamp(Number(yearRaw), Number(monthRaw) - 1, Number(dayRaw));
    if (timestamp !== null) return timestamp;
  }

  const parsed = new Date(text);
  if (Number.isFinite(parsed.getTime()) && parsed.getFullYear() > 1970) {
    return parsed.getTime();
  }

  return null;
}

export function sortByNewestFirst<T>(items: T[], getDateValue: (item: T) => unknown): T[] {
  return [...items].sort((leftItem, rightItem) => {
    const leftValue = normalizeDateToTimestamp(getDateValue(leftItem));
    const rightValue = normalizeDateToTimestamp(getDateValue(rightItem));

    if (leftValue === null && rightValue === null) return 0;
    if (leftValue === null) return 1;
    if (rightValue === null) return -1;

    return rightValue - leftValue;
  });
}

export const eventFallbackImages = [assets.dashboardImage, assets.capacityImage, assets.policyImage, assets.seminarImage];

export function slugifyEventTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getEventSlug(event: EventItem) {
  return slugifyEventTitle(event.id || event.title);
}

export function formatEventTime(value?: string) {
  if (!value) return '';
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return value;
  const hour = Number(match[1]);
  const minute = match[2];
  const period = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${minute} ${period}`;
}

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getEventEndDate(eventDate: string) {
  const compactDate = eventDate.replace(/\s+/g, ' ').trim();
  const rangeMatch = compactDate.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),\s*(\d{4})$/);

  if (rangeMatch) {
    const [, monthName, , endDay, year] = rangeMatch;
    const monthIndex = MONTHS[monthName.toLowerCase()];
    if (monthIndex !== undefined) return new Date(Number(year), monthIndex, Number(endDay));
  }

  const singleDate = new Date(compactDate);
  if (!Number.isNaN(singleDate.getTime())) return singleDate;

  return null;
}

function parseIsoDate(value?: string) {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

export function getEventExpiryDate(eventDate: string) {
  const endDate = getEventEndDate(eventDate);
  if (!endDate) return null;

  const expiryDate = getStartOfDay(endDate);
  expiryDate.setDate(expiryDate.getDate() + 7);
  return expiryDate;
}

export function isEventVisibleAsUpcoming(event: EventItem, referenceDate = new Date()) {
  const managedEndDate = parseIsoDate(event.endDate || event.startDate);
  const expiryDate = managedEndDate ?? getEventExpiryDate(event.date);
  if (!expiryDate) return true;
  return getStartOfDay(expiryDate) >= getStartOfDay(referenceDate);
}

export function splitEventsByStatus(events: EventItem[], referenceDate = new Date()) {
  const upcomingEvents = events.filter((event) => isEventVisibleAsUpcoming(event, referenceDate));
  const pastEvents = events.filter((event) => !isEventVisibleAsUpcoming(event, referenceDate));

  return { upcomingEvents, pastEvents };
}
