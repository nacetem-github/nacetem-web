import { assets } from '../assets';

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author?: string;
  summary: string;
  content: string[];
  image: string;
  imageAlt: string;
};

export const newsArticles: NewsArticle[] = [
  {
    id: 'digital-filing-shift-save-nigeria-5bn',
    title: 'Digital Filing Shift to Save Nigeria N5bn, Says NACETEM DG',
    slug: 'digital-filing-shift-save-nigeria-5bn-nacetem-dg',
    category: 'Digital Transformation',
    date: 'May 2026',
    author: 'Effiong Lois',
    summary:
      'Nigeria could save up to N5 billion through the Federal Government\'s transition from paper-based filing systems to digital processes, according to NACETEM DG Dr. Olushola S. Odusanya.',
    content: [
      'Nigeria could save up to N5 billion through the Federal Government\'s ongoing transition from paper-based filing systems to digital processes, according to the Director General of the National Centre for Technology Management (NACETEM), Dr. Olushola S. Odusanya.',
      'Speaking during a NACETEM-led workshop focused on strengthening public policymaking through systems thinking and system dynamics, Odusanya highlighted that the Federal Government\'s digital filing initiative could save the country an estimated N5 billion.',
      'He explained that the shift away from analogue filing systems is not only a cost-saving measure but also a strategic move to improve efficiency and service delivery across public institutions. According to him, adopting digital processes will streamline operations, reduce waste, and ultimately enhance the quality of services delivered to citizens.',
      'Odusanya further noted that the financial benefits extend beyond the federal level, pointing out that state governments, local governments, and even the private sector stand to reduce operational costs significantly through similar digital transitions.',
      'Beyond cost savings, the DG of NACETEM emphasized the importance of systems thinking as a critical tool for effective governance. He explained that understanding how different components of a system interact enables policymakers to make informed decisions, anticipate outcomes, and manage the consequences of policy actions more effectively.',
      'He added that equipping public servants with systems thinking skills is a foundational step toward successful digital transformation, as it prepares them to adapt to new platforms and approaches while maintaining efficiency.',
      'The workshop also underscored the broader goal of embedding systems thinking into public service processes, enabling policymakers to better navigate complex challenges, set priorities, and implement reforms that drive sustainable economic growth.',
      'Participants were encouraged to recognize the interconnected nature of policy decisions, with Odusanya noting that every action carries consequences that must be carefully managed to achieve positive outcomes.',
      'The initiative is expected to deepen awareness among policymakers and strengthen their capacity to implement impactful reforms, particularly in managing the effects of major policy shifts while promoting long-term national development.',
    ],
    image: '/uploads/news/images/2026/01.jpeg',
    imageAlt: 'NACETEM stakeholders at a public sector transformation engagement',
  },
  {
    id: 'nacetem-auto-clinic-technical-skills-development',
    title: 'NACETEM, Auto-Clinic Partner to Advance Technical Skills Development in Nigeria',
    slug: 'nacetem-auto-clinic-technical-skills-development-nigeria',
    category: 'Skills Development',
    date: 'May 2026',
    author: 'Effiong Lois',
    summary:
      'NACETEM has partnered with Auto-Clinic and Dutch representatives to strengthen vocational and technical skills development in Nigeria through internationally aligned training and certification programmes.',
    content: [
      'The National Centre for Technology Management, NACETEM, has partnered with Auto-Clinic and Dutch representatives to strengthen vocational and technical skills development in Nigeria through internationally aligned training and certification programmes.',
      'The partnership was the focus of a high-level meeting held in Abuja, where stakeholders discussed strategies for equipping Nigerian youths and technicians with globally competitive skills in mechanical certification, industrial automation, welding certification, and metal forging.',
      'Participants at the meeting emphasized the importance of industry-driven training programmes capable of addressing the growing technical manpower gap across sectors while aligning with both African and European certification standards.',
      'Under the proposed implementation framework, the collaboration will adopt a three-stage approach of training, certification, and placement to ensure beneficiaries not only acquire practical skills but also gain access to employment opportunities upon completion of their programmes.',
      'As part of the resolutions reached, NACETEM, Auto-Clinic, and the National Board for Technical Innovation, NBTI, are expected to formalize the collaboration through the signing of a Memorandum of Understanding. The meeting also highlighted plans for close collaboration with Prof. Armenia Stephano to ensure certification alignment with international standards and enhance the global competitiveness of trainees.',
      'In the next phase of implementation, the partners will finalize training modules, prepare the draft MoU, and engage the Nigerian Education Loan Fund (NELFund) to explore funding support for participants.',
      'The partnership is expected to create opportunities for capacity building, workforce development, and improved employability for young Nigerians in technical and industrial sectors.',
    ],
    image: '/uploads/news/images/2026/02.jpeg',
    imageAlt: 'NACETEM technical skills development partnership meeting',
  },
  {
    id: 'tech-enabled-transformation-transport-sector',
    title: 'NACETEM Drives New Push for Tech-Enabled Transformation of Nigeria\'s Transport Sector',
    slug: 'nacetem-tech-enabled-transformation-nigeria-transport-sector',
    category: 'Transport Innovation',
    date: 'May 2026',
    author: 'Lois Effiong',
    summary:
      'NACETEM has advanced discussions with the Federal University of Transportation, Daura and international technology partners to accelerate innovation across Nigeria\'s transport sector.',
    content: [
      'In a renewed effort to modernize Nigeria\'s transportation landscape, the National Centre for Technology Management (NACETEM) has advanced discussions with the Federal University of Transportation, Daura, alongside international technology partners, to accelerate innovation across the sector.',
      'The engagement, held at NACETEM\'s Federal Secretariat Office in Abuja, brought together key stakeholders focused on deploying cutting-edge solutions to improve mobility systems nationwide. Leading the discussions were the Director-General/CEO of NACETEM, senior representatives from the institution, delegates from the Federal University of Transportation, Daura, and international collaborator Dr. S. Hassan of Tech India.',
      'Central to the dialogue was the integration of artificial intelligence and emerging technologies across rail, water, land, and air transportation systems. Participants emphasized the need for smarter, data-driven approaches to optimize operations, improve safety, and boost efficiency across Nigeria\'s transport networks.',
      'The meeting also highlighted plans to strengthen human capacity through targeted skill development initiatives. Proposed interventions include the establishment of specialized welding and ICT hubs aimed at equipping professionals with practical competencies required to support modern transport infrastructure.',
      'In addition, stakeholders explored opportunities for joint research and policy development, particularly in the areas of smart traffic management systems and forward-looking transportation policies that can keep pace with rapid technological change.',
      'The collaboration reflects a growing commitment among public institutions and global partners to reposition Nigeria\'s transport sector through innovation, capacity building, and strategic partnerships, signaling a forward-looking approach to addressing the country\'s mobility challenges.',
    ],
    image: '/uploads/news/images/2026/03.jpeg',
    imageAlt: 'NACETEM transport sector technology transformation meeting',
  },
  {
    id: 'youth-innovation-technology-growth-lagos-future-conference',
    title: 'NACETEM Champions Youth Innovation and Technology-Driven Growth at Lagos Future Conference',
    slug: 'nacetem-youth-innovation-technology-growth-lagos-future-conference',
    category: 'Youth Innovation',
    date: 'May 26, 2026',
    author: 'Lois Effiong',
    summary:
      'NACETEM reaffirmed its commitment to innovation, technology, and youth-driven development at the Digivation Network Future Conference in Lagos.',
    content: [
      'The leadership of National Centre for Technology Management, NACETEM, has reaffirmed the agency\'s commitment to promoting innovation, technology, and youth-driven development as key pillars for Nigeria\'s economic transformation.',
      'This position was made known at the Digivation Network Future Conference held in Lagos, where stakeholders from across government, academia, business, and the technology ecosystem gathered to explore strategies for harnessing innovation and digital advancement for national growth.',
      'Director-General and Chief Executive Officer of NACETEM, Dr. Olushola Odusanya, who was represented at the event by the South-West Zonal Coordinator, Mrs. Ireti Oyefuga, delivered a goodwill message emphasizing the critical role of technology, leadership, and collaboration in shaping Nigeria\'s future economy.',
      'According to the DG, technology remains a powerful tool for development when combined with effective leadership, mentorship, and innovation-driven policies.',
      '"Technology is just a tool. In terms of getting young people to work together and stay motivated, leadership and guidance remain essential," he stated.',
      'He noted that NACETEM remains committed to advancing research, innovation, and technology management policies that support entrepreneurship, industrial growth, and sustainable national development.',
      'Dr. Odusanya further stressed the importance of collaborative efforts among policymakers, innovators, institutions, and the private sector in creating opportunities for young Nigerians and strengthening the nation\'s economic competitiveness.',
      'He explained that the Centre\'s initiatives are focused on generating evidence-based research and policy recommendations capable of driving technological advancement, job creation, and inclusive economic growth. He also commended the organisers of the conference for creating a platform that encourages meaningful conversations around youth empowerment, innovation, and digital transformation.',
      'The DG of NACETEM further expressed optimism that the ideas and recommendations emerging from the conference would contribute significantly to shaping policies and programmes that promote sustainable development across the country.',
      '"We believe our collective efforts will stimulate economic growth, create opportunities for young people, and improve the lives of Nigerians. Together, we can build a stronger and more prosperous future for the nation," he added.',
      'The conference featured discussions on emerging technologies, entrepreneurship, digital innovation, and strategies for leveraging Nigeria\'s youthful population for long-term economic progress.',
    ],
    image: '/uploads/news/images/2026/04.jpeg',
    imageAlt: 'NACETEM youth innovation and future conference engagement',
  },
  {
    id: 'carbon-credit-potential-ecological-project-office',
    title: 'NACETEM, Ecological Project Office Move to Unlock Nigeria\'s Carbon Credit Potential',
    slug: 'nacetem-ecological-project-office-carbon-credit-potential',
    category: 'Climate Innovation',
    date: 'May 26, 2026',
    author: 'Effiong Lois',
    summary:
      'NACETEM and the Ecological Project Office have initiated strategic discussions to develop Nigeria\'s carbon credit potential and strengthen climate finance opportunities.',
    content: [
      'Nigeria\'s drive to harness the economic value of its environmental resources received a boost as the National Centre for Technology Management, NACETEM, and the Ecological Project Office initiated strategic discussions aimed at developing Nigeria\'s carbon credit potential and strengthening climate finance opportunities.',
      'The high-level strategic meeting, facilitated by the Director-General of NACETEM, Dr. Olusola Odusanya, focused on developing practical frameworks for quantifying and monetizing Nigeria\'s carbon assets, while positioning the country to take advantage of emerging opportunities in the global carbon market.',
      'Discussions at the meeting centered on the fundamentals of carbon credits and the increasing role of climate finance in supporting sustainable development across the world. Participants explored strategies for accurately assessing Nigeria\'s carbon credit potential and establishing systems capable of attracting investment into the nation\'s environmental assets.',
      'A major highlight of the engagement was the consideration of Blue Credit opportunities, a climate finance approach focused on the protection and monetization of marine and coastal ecosystems. The discussion marked an important step in exploring how Nigeria can leverage its aquatic and coastal resources within the international carbon market.',
      'The meeting also produced key strategic recommendations, including the need for immediate collaboration with the National Agency for the Great Green Wall, NAGGW, to strengthen institutional partnerships and expand Nigeria\'s environmental sustainability agenda.',
      'Stakeholders noted that the collaboration could create new economic opportunities for Nigeria through climate-related revenue generation, while also strengthening the country\'s position within Africa\'s growing carbon market space.',
      'Beyond the economic prospects, the initiative is expected to contribute significantly to global climate action efforts by promoting sustainable environmental practices and reinforcing Nigeria\'s commitment to climate resilience.',
      'The meeting ended on a positive note, with participants expressing optimism about the outcomes of the engagement and the possibility of NACETEM hosting future strategic sessions on carbon credit development and climate innovation.',
    ],
    image: '/uploads/news/images/2026/05.jpeg',
    imageAlt: 'NACETEM carbon credit and climate finance strategic meeting',
  },
  {
    id: 'innovation-leadership-national-sti-council-meeting',
    title: 'National Centre for Technology Management Showcases Innovation Leadership at National STI Council Meeting',
    slug: 'nacetem-innovation-leadership-national-sti-council-meeting',
    category: 'STI Policy',
    date: 'May 14, 2026',
    author: 'Lois Effiong',
    summary:
      'NACETEM reaffirmed its commitment to Nigeria\'s innovation and technology ecosystem through active participation in the 22nd Meeting of the National Council on Innovation, Science and Technology.',
    content: [
      'The National Centre for Technology Management (NACETEM) has reaffirmed its commitment to advancing Nigeria\'s innovation and technology ecosystem through active participation in the 22nd Meeting of the National Council on Innovation, Science and Technology held in Abuja.',
      'The three-day meeting, hosted at the National Space Research and Development Agency (NASRDA) from May 12 to 14, brought together policymakers, researchers, and key stakeholders across the science, technology, and innovation sector to deliberate on strategies for strengthening Nigeria\'s development through innovation-driven policies and collaborations.',
      'Leading the Centre\'s delegation, the Director-General of NACETEM, Dr. Olushola Odusanya, participated in high-level discussions focused on repositioning the Federal Ministry of Innovation, Science and Technology and its agencies for greater national impact and global competitiveness.',
      'Speaking during the event, Dr. Odusanya emphasized the importance of research, policy innovation, and institutional collaboration in driving sustainable development and economic transformation in Nigeria.',
      '"NACETEM remains committed to providing strategic policy support and innovation-driven solutions that will strengthen Nigeria\'s science and technology sector and enhance national development," he said.',
      'A major highlight of the meeting was NACETEM\'s exhibition stand, which attracted visits from the Honourable Minister, the Permanent Secretary, and other distinguished delegates. The Centre showcased its expertise in science, technology and innovation policy research, technology management, capacity development, and evidence-based advisory services aimed at supporting national growth.',
      'The exhibition also provided an opportunity for NACETEM to demonstrate its growing role in promoting knowledge-driven governance and fostering innovation as a catalyst for socio-economic progress.',
      'As Nigeria continues to pursue a knowledge-based economy, NACETEM says it will remain at the forefront of efforts to strengthen innovation policies, build institutional capacity, and support the nation\'s drive toward sustainable technological advancement.',
    ],
    image: '/uploads/news/images/2026/06.jpeg',
    imageAlt: 'NACETEM exhibition and participation at National STI Council meeting',
  },
  {
    id: 'nbti-nacetem-partnership-innovation-industrialisation-job-creation',
    title: 'NBTI, NACETEM Deepen Partnership on Innovation, Industrialisation, Job Creation',
    slug: 'nbti-nacetem-partnership-innovation-industrialisation-job-creation',
    category: 'Partnerships',
    date: 'May 2026',
    author: 'Lois Effiong',
    summary:
      'NBTI and NACETEM have strengthened their strategic alliance to advance technological innovation, industrialisation, job creation, clean energy, and entrepreneurship development in Nigeria.',
    content: [
      'The National Board for Technology Incubation (NBTI) and the National Centre for Technology Management (NACETEM) have strengthened their strategic alliance to advance technological innovation, industrialisation and job creation in Nigeria through a renewed focus on emerging technologies, clean energy and entrepreneurship development.',
      'The renewed collaboration is expected to support the Federal Government\'s drive for economic diversification by creating more opportunities for startups, researchers, innovators, small-scale manufacturers and skilled youths across the country.',
      'During a high-level engagement between both agencies in Abuja, the Director-General and Chief Executive Officer of NBTI, Dr. Kazeem Kolawole Raji, described the partnership as a critical step towards accelerating Nigeria\'s transition to a technology-driven and industrially competitive economy.',
      'He stressed that stronger cooperation between technology incubation agencies and research institutions would play a major role in unlocking Nigeria\'s economic potential and strengthening local industries.',
      'Raji noted that NBTI\'s nationwide network of incubation and fabrication centres would be leveraged to promote enterprise development, technical skills acquisition and innovation in key sectors of the economy.',
      'According to him, the joint initiative will focus on strategic areas such as artificial intelligence, digital skills development, compressed natural gas technology, renewable energy, fabrication and welding technology, as well as agricultural innovation and food security.',
      'He explained that both institutions are working towards developing an AI ecosystem that will connect Nigerian technology experts within and outside the country to drive digital transformation, research collaboration and innovation-led growth.',
      'On energy transition, the agencies are expected to support ongoing national efforts to expand CNG adoption and promote cleaner energy alternatives, including the use of liquefied natural gas for marine transportation and industrial operations.',
      'The partnership will also utilize NBTI\'s fabrication centres for practical training in welding, fibre glass technology, CNG conversion and other vocational skills aimed at empowering youths and boosting entrepreneurship nationwide.',
      'In the agricultural sector, the collaboration is expected to promote technology-driven farming initiatives, improve seed distribution systems and encourage export-oriented agriculture to enhance food security and agro-industrial development.',
      'Also speaking, the Director-General and Chief Executive Officer of NACETEM, Dr. Olusola Odusanya, reaffirmed the Centre\'s commitment to advancing research, innovation policy and capacity building through strategic institutional partnerships.',
      'Odusanya said the collaboration would further position Nigeria as a major player in emerging technologies while promoting sustainable economic growth, industrial expansion and global competitiveness.',
      'Both agencies expressed optimism that the strengthened alliance would accelerate Nigeria\'s journey towards a knowledge-driven economy, stimulate local manufacturing and create sustainable employment opportunities for Nigerians.',
    ],
    image: '/uploads/news/images/2026/07.jpeg',
    imageAlt: 'NBTI and NACETEM partnership meeting on innovation and industrialisation',
  },
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
      'The collaboration is expected to support evidence-based governance and innovation-driven development across Bayelsa State, while creating opportunities for stronger partnerships between public institutions, researchers, innovators, and development stakeholders.',
    ],
    image: assets.bayelsaNewsImage,
    imageAlt: 'NACETEM South-South collaboration with Bayelsa State Ministry',
  },
  {
    id: 'nta-ai-interview',
    title: 'NACETEM DG/CEO Speaks on Artificial Intelligence and Nigeria\'s Future on NTA International',
    slug: 'nacetem-dg-ceo-artificial-intelligence-nta-international',
    category: 'Artificial Intelligence',
    date: 'March 11, 2025',
    summary:
      'The Director-General and Chief Executive Officer of NACETEM, Dr. Olushola Odusanya, discussed artificial intelligence adoption in Nigeria\'s public sector during an NTA International interview.',
    content: [
      'The Director-General/CEO of NACETEM, Dr. Olushola Odusanya, featured on NTA International\'s "Issues of the Moment" programme to discuss the future of Artificial Intelligence in Nigeria.',
      'The discussion explored AI opportunities in governance, emerging risks and ethical concerns, AI-driven public sector transformation, national readiness for AI adoption, and innovation and digital competitiveness.',
      'The media engagement reinforces NACETEM\'s commitment to advancing responsible and strategic AI adoption in Nigeria through research, policy advisory support, stakeholder engagement, and capacity development.',
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
      'This initiative represents another milestone in strengthening Nigeria\'s knowledge economy and building stronger institutional pathways for research, learning, innovation, and national development.',
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
      'These programmes are designed to equip professionals, researchers, public servants, and innovation actors with future-ready digital and innovation skills required in today\'s rapidly evolving economy.',
      'The Centre\'s capacity development work remains central to its mandate of strengthening technology management capabilities across public institutions, academia, industry, and the wider national innovation system.',
    ],
    image: assets.capacityImage,
    imageAlt: 'NACETEM capacity development programme',
  },
  {
    id: 'sti-intelligence-research',
    title: 'Strengthening Nigeria\'s STI Intelligence Through Data and Research',
    slug: 'strengthening-nigeria-sti-intelligence-data-research',
    category: 'Research & Policy',
    date: 'September 20, 2025',
    summary:
      'NACETEM continues to strengthen Nigeria\'s Science, Technology, and Innovation intelligence systems through STI indicators, innovation surveys, and research analytics platforms.',
    content: [
      'NACETEM continues to strengthen Nigeria\'s Science, Technology, and Innovation intelligence systems through the development of STI indicators, innovation surveys, and research analytics platforms.',
      'The Centre\'s STI Dashboard & Databank supports evidence-based national planning, research data management, innovation ecosystem monitoring, policy evaluation, and national competitiveness analysis.',
      'Through this work, NACETEM contributes significantly to strategic decision-making, policy coordination, and improved visibility of Nigeria\'s science, technology, and innovation outputs.',
    ],
    image: assets.dashboardImage,
    imageAlt: 'NACETEM STI Dashboard and Databank',
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
      'The initiative aligns with NACETEM\'s commitment to strengthening Nigeria\'s innovation ecosystem and creating enabling spaces for research, technology management, and public sector transformation.',
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
      'The conference provided a platform for researchers, policymakers, industry representatives, and development partners to exchange ideas on Nigeria\'s science, technology, and innovation future.',
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
      'The partnerships are expected to strengthen industry-facing skills development and support Nigeria\'s transition toward a more competitive knowledge-driven economy.',
      'Through these collaborations, NACETEM continues to promote institutional linkages that connect research, training, industry needs, and national innovation priorities.',
    ],
    image: assets.aiEcosystemImage,
    imageAlt: 'Technology partnership and innovation ecosystem engagement',
  },
];

export const latestNewsArticles = newsArticles.slice(0, 3);

export function getNewsArticleBySlug(slug: string | undefined) {
  return newsArticles.find((article) => article.slug === slug);
}
