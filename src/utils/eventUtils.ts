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

export function getEventExpiryDate(eventDate: string) {
  const endDate = getEventEndDate(eventDate);
  if (!endDate) return null;

  const expiryDate = getStartOfDay(endDate);
  expiryDate.setDate(expiryDate.getDate() + 7);
  return expiryDate;
}

export function isEventVisibleAsUpcoming(event: EventItem, referenceDate = new Date()) {
  const expiryDate = getEventExpiryDate(event.date);
  if (!expiryDate) return true;

  return expiryDate >= getStartOfDay(referenceDate);
}

export function splitEventsByStatus(events: EventItem[], referenceDate = new Date()) {
  const upcomingEvents = events.filter((event) => isEventVisibleAsUpcoming(event, referenceDate));
  const pastEvents = events.filter((event) => !isEventVisibleAsUpcoming(event, referenceDate));

  return { upcomingEvents, pastEvents };
}
