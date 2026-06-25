export type ArchivedEventReport = {
  slug: string;
  title: string;
  summary: string;
  focusAreas: string[];
};

export const archivedEventReports: ArchivedEventReport[] = [
  {
    slug: 'sti-indicator-dashboard-stakeholder-workshop-2025',
    title: 'One Day Sensitization Workshop / Stakeholders Engagement on STI Indicator Dashboard for Nigeria',
    summary: 'A stakeholder sensitization programme focused on Nigeria\'s STI Indicator Dashboard and its role in strengthening access to science, technology, and innovation data.',
    focusAreas: ['STI indicator awareness', 'Stakeholder engagement', 'Dashboard orientation'],
  },
  {
    slug: 'sti-food-insecurity-challenge-2024',
    title: 'Leveraging Science, Technology & Innovation for Tackling the Perennial Food Insecurity Challenge in Nigeria',
    summary: 'A concluded programme examining how science, technology, and innovation can contribute to responses to Nigeria\'s food insecurity challenge.',
    focusAreas: ['STI policy discussion', 'Food security challenges', 'Innovation-led responses'],
  },
  {
    slug: 'connecting-innovators-blue-economy-2023',
    title: 'Connecting Innovators: Unlocking the Potential of Market-ready Technological Solutions for Blue Economy in Nigeria',
    summary: 'A stakeholder programme centred on connecting innovators and exploring market-ready technological solutions for Nigeria\'s blue economy.',
    focusAreas: ['Market-ready technologies', 'Innovator connections', 'Blue economy opportunities'],
  },
  {
    slug: 'artificial-intelligence-public-sector-2023',
    title: 'Artificial Intelligence in the Public Sector',
    summary: 'A concluded programme focused on the application, governance, and responsible adoption of artificial intelligence within the public sector.',
    focusAreas: ['Public-sector AI adoption', 'Governance and capacity', 'Responsible implementation'],
  },
];

export function getArchivedEventReportByTitle(title: string) {
  return archivedEventReports.find((report) => report.title === title);
}

export function getArchivedEventReportBySlug(slug: string | undefined) {
  return archivedEventReports.find((report) => report.slug === slug);
}