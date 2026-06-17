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
      'National Centre for Technology Management in collaboration with Federal University of Technology (FUTMINNA) offers Professional Masters in Technology Management.',
    overview:
      'The Professional Master in Technology Management is designed for professionals who need advanced knowledge in managing technology, innovation processes, institutional transformation, and evidence-informed decisions.',
    audience: [
      'Mid-career and senior professionals',
      'Managers in public, private, academic, and development institutions',
      'Technology, innovation, and policy practitioners',
    ],
    highlights: [
      'Advanced technology management concepts',
      'Innovation and organizational strategy',
      'Research-informed management practice',
      'Collaboration with Federal University of Technology, Minna',
    ],
    outcomes: [
      'Lead technology-focused programmes and institutional initiatives',
      'Evaluate innovation opportunities and implementation risks',
      'Apply management tools to technology-driven development challenges',
    ],
    locations: [],
    duration: 'Professional postgraduate programme',
    format: 'Academic and professional coursework',
    iconColor: 'text-blue-500',
    img: assets.capacityImage,
  },
  {
    slug: 'professional-mtech-nanoscience-nanotechnology',
    icon: Microscope,
    title: 'Professional M.Tech. in Nanoscience / Nanotechnology',
    category: 'Professional Master Programme',
    description:
      'Nanotechnology is an emerging interdisciplinary field involving expertise in engineering, life science, physics, chemistry, mathematics, medicine, agriculture, and information processing.',
    overview:
      'This programme supports professional development in nanoscience and nanotechnology, helping participants understand the scientific, industrial, and innovation potential of nanoscale technologies.',
    audience: [
      'Scientists, engineers, and technical professionals',
      'Research and development personnel',
      'Professionals interested in emerging technology applications',
    ],
    highlights: [
      'Interdisciplinary nanoscience foundations',
      'Applications across industry, agriculture, medicine, and information systems',
      'Emerging technology management perspective',
      'Research and innovation orientation',
    ],
    outcomes: [
      'Understand the principles and applications of nanotechnology',
      'Identify opportunities for emerging technology use and development',
      'Connect technical knowledge with innovation and management needs',
    ],
    locations: [],
    duration: 'Professional postgraduate programme',
    format: 'Academic and professional coursework',
    iconColor: 'text-purple-500',
    img: assets.seminarImage,
  },
  {
    slug: 'professional-mtech-digital-marketing-strategy',
    icon: Globe,
    title: 'Professional M.Tech. in Digital Marketing and Strategy',
    category: 'Professional Master Programme',
    description:
      'The M.Tech. in Digital Marketing and Strategy programme prepares professionals to plan, manage, and evaluate digital marketing initiatives while contributing to knowledge in academia and industry.',
    overview:
      'This programme develops strategic digital marketing capability for professionals who need to use digital channels, analytics, content strategy, and innovation-focused thinking to support products, services, institutions, and public engagement.',
    audience: [
      'Marketing, communications, and business professionals',
      'Entrepreneurs and innovation programme managers',
      'Professionals seeking advanced digital strategy capability',
    ],
    highlights: [
      'Digital marketing strategy and planning',
      'Campaign management and performance evaluation',
      'Digital channels, platforms, and audience engagement',
      'Applied knowledge for academia and industry',
    ],
    outcomes: [
      'Design and manage digital marketing strategies',
      'Assess campaign performance using evidence and analytics',
      'Apply digital tools to institutional and market-facing goals',
    ],
    locations: [],
    duration: 'Professional postgraduate programme',
    format: 'Academic and professional coursework',
    iconColor: 'text-orange-500',
    img: assets.digitalAcademyImage,
  },
  {
    slug: 'training-certification-drone-piloting',
    icon: Drone,
    title: 'Training and Certification in Drone Piloting',
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
    locations: [],
    duration: 'Short-term course',
    format: 'Practical training and certification',
    iconColor: 'text-cyan-500',
    img: assets.dashboardImage,
  },
];

export function getCapacityProgram(slug: string | undefined) {
  return capacityPrograms.find((program) => program.slug === slug);
}
