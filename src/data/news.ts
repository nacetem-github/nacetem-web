import { assets } from '../assets';

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  summary: string;
  content: string[];
  image: string;
  imageAlt: string;
};

export const newsArticles: NewsArticle[] = [
  {
    id: 'bayelsa-sti-collaboration',
    title: 'NACETEM South-South Office Strengthens Collaboration with Bayelsa State Ministry on STI Development',
    slug: 'nacetem-south-south-bayelsa-sti-development',
    category: 'Government Collaboration',
    date: 'May 1, 2026',
    summary:
      'NACETEM South-South Office visited the Bayelsa State Ministry of Communications, Science and Technology to explore strategic collaborations in STI policy, technical skills mapping, and innovation-driven public service reforms.',
    content: [
      'NACETEM South-South Zonal Office engaged the Bayelsa State Ministry of Communications, Science and Technology in strategic discussions aimed at strengthening Science, Technology, and Innovation (STI) development within the state.',
      'The engagement focused on STI policy implementation, technical skills mapping, innovation ecosystem development, digital transformation strategies, and capacity building for public institutions.',
      'The collaboration is expected to support evidence-based governance and innovation-driven development across Bayelsa State, while creating opportunities for stronger partnerships between public institutions, researchers, innovators, and development stakeholders.'
    ],
    image: assets.bayelsaNewsImage,
    imageAlt: 'NACETEM South-South collaboration with Bayelsa State Ministry',
  },
  {
    id: 'nta-ai-interview',
    title: 'NACETEM DG/CEO Speaks on Artificial Intelligence and Nigeria’s Future on NTA International',
    slug: 'nacetem-dg-ceo-artificial-intelligence-nta-international',
    category: 'Artificial Intelligence',
    date: 'March 11, 2025',
    summary:
      'The Director-General and Chief Executive Officer of NACETEM, Dr. Olushola Odusanya, discussed artificial intelligence adoption in Nigeria’s public sector during an NTA International interview.',
    content: [
      'The Director-General/CEO of NACETEM, Dr. Olushola Odusanya, featured on NTA International’s “Issues of the Moment” programme to discuss the future of Artificial Intelligence in Nigeria.',
      'The discussion explored AI opportunities in governance, emerging risks and ethical concerns, AI-driven public sector transformation, national readiness for AI adoption, and innovation and digital competitiveness.',
      'The media engagement reinforces NACETEM’s commitment to advancing responsible and strategic AI adoption in Nigeria through research, policy advisory support, stakeholder engagement, and capacity development.'
    ],
    image: assets.ntaImage,
    imageAlt: 'NACETEM DG CEO interview on NTA International',
  },
  {
    id: 'sti-education-partnership',
    title: 'NACETEM Advances STI Education Through Strategic Academic Partnerships',
    slug: 'nacetem-advances-sti-education-academic-partnerships',
    category: 'Education & Capacity Development',
    date: 'March 8, 2025',
    summary:
      'NACETEM signed a collaborative Memorandum of Understanding with the Federal University of Technology, Minna and Neuro-Linguistic Programming Ltd. to support STI education and innovation development.',
    content: [
      'NACETEM signed a collaborative Memorandum of Understanding with the Federal University of Technology, Minna and Neuro-Linguistic Programming Ltd. to strengthen STI education and professional capacity development in Nigeria.',
      'The partnership aims to enhance postgraduate STI programmes, promote innovation-driven education, expand technology management training, improve industry-academia collaboration, and support national innovation capacity.',
      'This initiative represents another milestone in strengthening Nigeria’s knowledge economy and building stronger institutional pathways for research, learning, innovation, and national development.'
    ],
    image: assets.news1Image,
    imageAlt: 'NACETEM STI education collaboration',
  },
  {
    id: 'digital-capacity-development',
    title: 'NACETEM Expands Digital Capacity Development Programmes',
    slug: 'nacetem-expands-digital-capacity-development-programmes',
    category: 'Capacity Building',
    date: 'September 28, 2025',
    summary:
      'NACETEM continues to expand its professional training programmes through specialized courses in technology management, innovation management, digital strategy, and STI policy studies.',
    content: [
      'NACETEM continues to expand its professional training programmes through specialized courses in Technology Management, Digital Marketing and Strategy, Nanoscience and Nanotechnology, Innovation Management, and STI Policy Studies.',
      'These programmes are designed to equip professionals, researchers, public servants, and innovation actors with future-ready digital and innovation skills required in today’s rapidly evolving economy.',
      'The Centre’s capacity development work remains central to its mandate of strengthening technology management capabilities across public institutions, academia, industry, and the wider national innovation system.'
    ],
    image: assets.capacityImage,
    imageAlt: 'NACETEM capacity development programme',
  },
  {
    id: 'sti-intelligence-research',
    title: 'Strengthening Nigeria’s STI Intelligence Through Data and Research',
    slug: 'strengthening-nigeria-sti-intelligence-data-research',
    category: 'Research & Policy',
    date: 'September 20, 2025',
    summary:
      'NACETEM continues to strengthen Nigeria’s Science, Technology, and Innovation intelligence systems through STI indicators, innovation surveys, and research analytics platforms.',
    content: [
      'NACETEM continues to strengthen Nigeria’s Science, Technology, and Innovation intelligence systems through the development of STI indicators, innovation surveys, and research analytics platforms.',
      'The Centre’s STI Dashboard initiative supports evidence-based national planning, research data management, innovation ecosystem monitoring, policy evaluation, and national competitiveness analysis.',
      'Through this work, NACETEM contributes significantly to strategic decision-making, policy coordination, and improved visibility of Nigeria’s science, technology, and innovation outputs.'
    ],
    image: assets.dashboardImage,
    imageAlt: 'NACETEM STI intelligence dashboard',
  },
  {
    id: 'innovation-hub-abuja',
    title: 'NACETEM Launches New Innovation Hub in Abuja',
    slug: 'nacetem-launches-new-innovation-hub-abuja',
    category: 'Infrastructure',
    date: 'September 10, 2025',
    summary:
      'The National Centre for Technology Management opened a new innovation hub to support collaboration among researchers, entrepreneurs, and policymakers working on emerging technologies.',
    content: [
      'The National Centre for Technology Management opened a new Innovation Hub in Abuja, providing facilities for researchers, technology entrepreneurs, public institutions, and policy stakeholders to collaborate on emerging technologies.',
      'The hub is designed to support practical engagement, innovation development, capacity building, and policy-relevant technology demonstrations.',
      'The initiative aligns with NACETEM’s commitment to strengthening Nigeria’s innovation ecosystem and creating enabling spaces for research, technology management, and public sector transformation.'
    ],
    image: assets.headquartersImage,
    imageAlt: 'NACETEM innovation hub and institutional facility',
  },
  {
    id: 'national-sti-policy-conference',
    title: 'National Conference on Science and Technology Policy Concludes',
    slug: 'national-conference-science-technology-policy-concludes',
    category: 'Conferences',
    date: 'August 25, 2025',
    summary:
      'The annual National Conference on Science and Technology Policy concluded with recommendations for strengthening indigenous technology development and digital inclusion across Nigeria.',
    content: [
      'The annual National Conference on Science and Technology Policy, hosted by NACETEM, concluded with recommendations for enhancing indigenous technology development and digital inclusion across Nigeria.',
      'Participants discussed practical pathways for improving STI policy implementation, strengthening research systems, promoting innovation, and addressing institutional barriers to technology-driven development.',
      'The conference provided a platform for researchers, policymakers, industry representatives, and development partners to exchange ideas on Nigeria’s science, technology, and innovation future.'
    ],
    image: assets.policyImage,
    imageAlt: 'Science and Technology Policy conference session',
  },
  {
    id: 'international-tech-partnerships',
    title: 'NACETEM Partners with International Tech Firms to Boost Local Capacity',
    slug: 'nacetem-partners-international-tech-firms-local-capacity',
    category: 'Partnerships',
    date: 'August 12, 2025',
    summary:
      'NACETEM formalized partnerships with technology stakeholders to strengthen local capacity and support advanced training opportunities for Nigerian youth and professionals.',
    content: [
      'NACETEM formalized partnerships with technology stakeholders to enhance local technological capacity and support advanced training opportunities in areas such as software engineering, data science, innovation management, and digital transformation.',
      'The partnerships are expected to strengthen industry-facing skills development and support Nigeria’s transition toward a more competitive knowledge-driven economy.',
      'Through these collaborations, NACETEM continues to promote institutional linkages that connect research, training, industry needs, and national innovation priorities.'
    ],
    image: assets.aiEcosystemImage,
    imageAlt: 'Technology partnership and innovation ecosystem engagement',
  },
];

export const latestNewsArticles = newsArticles.slice(0, 3);

export function getNewsArticleBySlug(slug: string | undefined) {
  return newsArticles.find((article) => article.slug === slug);
}
