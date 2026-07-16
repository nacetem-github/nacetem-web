import type { LucideIcon } from 'lucide-react';
import { BookOpen, Drone, Globe, GraduationCap, Microscope } from 'lucide-react';
import { assets } from '../assets';

export type CapacityProgram = {
  slug: string;
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  overview: string;
  audience: string[];
  highlights: string[];
  outcomes: string[];
  curriculum?: string[];
  careerOpportunities?: string[];
  locations: string[];
  duration: string;
  format: string;
  iconColor: string;
  img: string;
  cardImg?: string;
  imageFit?: 'cover' | 'contain';
};

export const capacityPrograms: CapacityProgram[] = [
  {
    slug: 'postgraduate-diploma-technology-management',
    icon: GraduationCap,
    title: 'Postgraduate Diploma in Technology Management',
    category: 'Diploma Programme',
    description:
      'A specialized programme that equips graduates and professionals to manage technological innovation, resources, and technology-driven organizations.',
    overview:
      'The Postgraduate Diploma in Technology Management is designed to equip graduates and professionals with the knowledge and skills required to effectively manage technological innovation, technological resources, and technology-driven organizations. The programme bridges the gap between technical expertise and managerial competence, enabling participants to make informed decisions in today\'s rapidly evolving technological environment.',
    audience: [
      'Graduates from science, engineering, technology, business, and related disciplines',
      'Professionals seeking to enhance their managerial capabilities',
      'Individuals aiming to advance their careers in technology-oriented industries',
      'Candidates seeking a pathway to further postgraduate studies in Technology Management and related fields',
    ],
    highlights: [
      'Bridges technical expertise with managerial competence',
      'Focuses on managing innovation, technological resources, and technology-driven organizations',
      'Addresses contemporary issues in digital transformation and technology development',
      'Supports progression into Master\'s degree programmes in Technology Management and related fields',
    ],
    outcomes: [
      'Apply management principles to technology-based organizations',
      'Analyze and evaluate technological innovations and their business implications',
      'Plan, implement, and manage technology projects effectively',
      'Develop strategies for technology adoption and organizational growth',
      'Demonstrate leadership and decision-making skills in technology-driven environments',
      'Understand emerging trends in information technology, innovation, and entrepreneurship',
    ],
    curriculum: [
      'Principles of management',
      'Innovation and entrepreneurship',
      'Information systems',
      'Project management',
      'Strategic technology planning',
      'Research and development management',
      'Technology policy',
      'Organizational leadership',
    ],
    careerOpportunities: [
      'Technology consulting',
      'Project management',
      'Innovation management',
      'Information systems management',
      'Research and development administration',
      'Operations management',
      'Entrepreneurship across public and private sectors',
    ],
    locations: ['Ile Ife', 'Lagos Study Centre', 'Abuja Study Centre', 'Bayelsa Study Centre', 'Enugu Study Centre'],
    duration: 'One year',
    format: 'Hybrid',
    iconColor: 'text-emerald-500',
    img: assets.pgdImage,
  },
  {
    slug: 'professional-master-technology-management',
    icon: BookOpen,
    title: 'Professional Master in Technology Management (M.Tech.)',
    category: 'Professional Master Programme',
    description:
      'A professional master programme offered by NACETEM in collaboration with the Federal University of Technology, Minna (FUTMINNA), focused on technology, innovation, and digital transformation leadership.',
    overview:
      'The National Centre for Technology Management, in collaboration with the Federal University of Technology, Minna (FUTMINNA), offers a Professional Master in Technology Management (M.Tech.) designed to equip professionals with the knowledge and practical skills required to manage technology, innovation, and digital transformation in modern organizations. The programme is ideal for individuals who desire to bridge the gap between technical knowledge and managerial leadership in today\'s rapidly evolving technological environment.',
    audience: [
      'Professionals and managers leading technology-driven work',
      'Researchers and entrepreneurs seeking stronger innovation management capacity',
      'Public-sector officers supporting technology-driven development',
      'Individuals seeking to strengthen institutional transformation and leadership capability',
    ],
    highlights: [
      'Strong foundation in technology management and innovation strategy',
      'Research commercialization, entrepreneurship, and policy focus',
      'Organizational leadership for digital transformation',
      'Collaboration with Federal University of Technology, Minna',
    ],
    outcomes: [
      'Evaluate emerging technologies and their organizational value',
      'Manage innovation projects and technology-driven initiatives',
      'Support technology transfer and research commercialization',
      'Apply strategic management tools to real-world organizational challenges',
      'Contribute to institutional transformation and national development priorities',
    ],
    locations: ['Ile Ife', 'Lagos Study Centre', 'Abuja Study Centre', 'Bayelsa Study Centre', 'Enugu Study Centre'],
    duration: 'Professional postgraduate programme',
    format: 'Hybrid',
    iconColor: 'text-blue-500',
    img: assets.capacityImage,
    cardImg: assets.mtechTechnologyManagementImage,
    imageFit: 'contain',
  },
  {
    slug: 'professional-mtech-nanoscience-nanotechnology',
    icon: Microscope,
    title: 'Professional Master in Nanoscience/Nanotechnology (M.Tech.)',
    category: 'Professional Master Programme',
    description:
      'An advanced professional programme focused on nanoscience, nanotechnology applications, and emerging technology-driven development.',
    overview:
      'The Professional M.Tech. in Nanoscience and Nanotechnology is designed to provide advanced knowledge and practical skills in one of the world\'s fastest-growing interdisciplinary fields. Nanotechnology brings together expertise from engineering, building technology, life sciences, physics, chemistry, mathematics, medicine, agriculture, and information processing to develop innovative solutions for industry, research, healthcare, energy, environment, and national development.',
    audience: [
      'Professionals seeking capacity in nanoscience and nanotechnology applications',
      'Researchers, scientists, and engineers',
      'Innovators working with emerging technology-driven development',
      'Technical professionals interested in interdisciplinary technology solutions',
    ],
    highlights: [
      'Advanced knowledge in nanoscience and nanotechnology',
      'Interdisciplinary applications across industry, healthcare, energy, and environment',
      'Practical skills for emerging technology-driven development',
      'Research and innovation orientation for national development',
    ],
    outcomes: [
      'Understand the principles and applications of nanotechnology',
      'Identify opportunities for emerging technology use and development',
      'Connect technical knowledge with innovation and management needs',
    ],
    locations: ['Ile Ife', 'Lagos Study Centre', 'Abuja Study Centre', 'Bayelsa Study Centre', 'Enugu Study Centre'],
    duration: 'Professional postgraduate programme',
    format: 'Hybrid',
    iconColor: 'text-purple-500',
    img: assets.seminarImage,
    cardImg: assets.mtechNanotechnologyImage,
    imageFit: 'contain',
  },
  {
    slug: 'professional-mtech-digital-marketing-strategy',
    icon: Globe,
    title: 'Professional Master in Digital Marketing and Strategy (M.Tech.)',
    category: 'Professional Master Programme',
    description:
      'A professional programme that develops advanced knowledge and practical expertise in digital channels, marketing strategy, innovation, and technology-driven business growth.',
    overview:
      'The Professional M.Tech. in Digital Marketing and Strategy is designed to develop advanced knowledge and practical expertise in the use of digital channels for marketing products, services, brands, and organizations. The programme equips participants with the intellectual, strategic, and analytical capacity required to plan, implement, and evaluate effective digital marketing campaigns while also contributing to research and knowledge development in academia.',
    audience: [
      'Professionals and marketers seeking stronger digital marketing competence',
      'Entrepreneurs focused on technology-driven business growth',
      'Researchers contributing to digital marketing knowledge development',
      'Individuals interested in digital marketing, strategy, and innovation',
    ],
    highlights: [
      'Advanced use of digital channels for products, services, brands, and organizations',
      'Strategic and analytical capacity for campaign planning and evaluation',
      'Digital marketing, strategy, innovation, and business growth focus',
      'Research and knowledge development orientation for academia',
    ],
    outcomes: [
      'Design and manage digital marketing strategies',
      'Assess campaign performance using evidence and analytics',
      'Apply digital tools to institutional and market-facing goals',
    ],
    locations: ['Ile Ife', 'Lagos Study Centre', 'Abuja Study Centre', 'Bayelsa Study Centre', 'Enugu Study Centre'],
    duration: 'Professional postgraduate programme',
    format: 'Hybrid',
    iconColor: 'text-orange-500',
    img: assets.digitalAcademyImage,
    cardImg: assets.mtechDigitalMarketingImage,
    imageFit: 'contain',
  },
  {
    slug: 'training-certification-drone-piloting',
    icon: Drone,
    title: 'Training, Certification and Licensing in Drone Piloting',
    category: 'Short-Term Course',
    description:
      'A short-term practical course designed to build competence in drone operation, safety procedures, flight planning, and responsible use of unmanned aerial systems.',
    overview:
      'This practical course introduces participants to drone piloting, operational safety, flight preparation, responsible deployment, and basic use cases for unmanned aerial systems in research, industry, monitoring, and public-sector applications.',
    audience: [
      'Beginners and professionals interested in drone operations',
      'Researchers, technical officers, and field teams',
      'Institutions exploring unmanned aerial systems for practical work',
    ],
    highlights: [
      'Drone operation and safety procedures',
      'Flight planning and pre-flight checks',
      'Responsible use of unmanned aerial systems',
      'Practical training and certification focus',
    ],
    outcomes: [
      'Operate drones with stronger safety awareness',
      'Plan basic drone missions and field activities',
      'Understand responsible and practical drone use cases',
    ],
    locations: ['Ile Ife', 'Lagos Study Centre', 'Abuja Study Centre', 'Bayelsa Study Centre', 'Enugu Study Centre'],
    duration: 'Short-term course',
    format: 'Practical training and certification',
    iconColor: 'text-cyan-500',
    img: assets.dashboardImage,
    cardImg: assets.droneBannerImage,
    imageFit: 'contain',
  },
];

export function getCapacityProgram(slug: string | undefined) {
  return capacityPrograms.find((program) => program.slug === slug);
}
