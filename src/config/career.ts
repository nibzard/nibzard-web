// Shared public career record. Evidence and unresolved dates: docs/career-sources.md.
export const profile = {
  name: 'Nikola Balić',
  handle: 'nibzard',
  location: 'Split, Croatia',
  email: 'nikola@disequi.com',
  updated: '2026-09-11',
  currentRole: 'Founding Growth Lead',
  employer: { name: 'Steel', url: 'https://steel.dev/' },
  description: 'Nikola Balić builds developer tools and writes about AI agents. Founding Growth Lead at Steel.',
  speakerBio: 'Nikola Balić is the founding growth lead at Steel. He builds open-source tools and writes about AI agents and software development. Previously, he led growth at Daytona and worked in technology transfer at the University of Split. His background includes teaching data science and research on digital transformation.',
  links: [
    { label: 'GitHub', url: 'https://github.com/nibzard' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nikolabalic/' },
    { label: 'X', url: 'https://x.com/nibzard' },
  ],
  researchLinks: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=JT3JHokAAAAJ&hl=en&oi=ao' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0002-4405-1470' },
    { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Nikola_Balic' },
  ],
};

export interface CareerEntry {
  title: string;
  organization: string;
  period: string;
  details: string[];
  link?: { label: string; url: string };
}

export const experience: CareerEntry[] = [
  {
    title: profile.currentRole,
    organization: profile.employer.name,
    period: 'February 2026–present',
    details: [
      'Lead growth for browser infrastructure used by AI agents and automation developers.',
      'Work on product positioning, developer adoption, and the ecosystem around browser automation.',
      'Joined full-time after an advisory engagement focused on growth and positioning.',
    ],
    link: { label: 'Joining Steel', url: '/agent-web' },
  },
  {
    title: 'Head of Growth', organization: 'Daytona', period: '2023–2025',
    details: [
      'Led go-to-market strategy and product-led growth for developer infrastructure.',
      'Worked on the shift in positioning from cloud development environments to runtimes for AI agents.',
      'Produced technical articles, documentation, and video tutorials. Organized product launches and launch weeks.',
      'Established an open-source bounty program and used product analytics to guide adoption work.',
      'Built developer experiments, including a Python interpreter for Daytona sandboxes and a directory of AI development tools.',
    ],
  },
  {
    title: 'Growth Lead', organization: 'Codeanywhere', period: '2022–2023',
    details: [
      'Worked on user reactivation and retention for a cloud development environment.',
      'Ran email campaigns and a developer newsletter, using engagement data to guide growth experiments.',
    ],
  },
  {
    title: 'Head of Department for Science and Innovation',
    organization: 'University of Split', period: 'November 2018–May 2023',
    details: [
      'Led the department responsible for research support and innovation activities.',
      'Worked on university collaboration, research commercialization, and projects funded by the European Union.',
      'Contributed to the European University of the Seas (SEA-EU) alliance and its research program, reSEArch-EU.',
      'Co-authored reports on digital transformation, research infrastructure, and university entrepreneurship.',
    ],
  },
  {
    title: 'Technology transfer and project management',
    organization: 'University of Split · Technology Transfer Office', period: 'Earlier career',
    details: [
      'Managed TTAdria, a project connecting research organizations and businesses in the Croatian Adriatic region.',
      'Worked with researchers and companies on commercialization and innovation projects. Public project records document this work in 2013–2015.',
      'Supported entrepreneurship education and cooperation between universities and businesses.',
    ],
    link: { label: 'TTAdria project publication', url: 'https://www.oss.unist.hr/sites/default/files/dokumenti/novosti/TTadria_UTT_02.pdf' },
  },
];

export const advisory: CareerEntry[] = [
  {
    title: 'Founder', organization: 'Pulent / Disequi', period: 'Established 2018',
    details: ['Independent advisory practice focused on innovation strategy and bringing technical products to market.'],
  },
  {
    title: 'Management advisor', organization: 'Numarics', period: 'Early-stage engagement',
    details: ['Advised the management team during the early development of the Swiss fintech company.'],
    link: { label: 'Interview on advisory work', url: 'https://labenaventures.com/blog/nikola-balic-interview/' },
  },
  {
    title: 'Mentor', organization: 'Labena Ventures', period: '2023',
    details: ['Supported startup founders with business models, team development, and routes to market.'],
  },
  {
    title: 'National ambassador', organization: 'European IPR Helpdesk', period: 'Appointed 2013',
    details: ['Helped researchers and businesses access guidance on intellectual property rights (IPR) and technology transfer.'],
    link: { label: 'University appointment report', url: 'https://www.unizg.hr/fileadmin/rektorat/Novosti_press/universitas/universitas-42.pdf' },
  },
];

export const teaching: CareerEntry[] = [
  {
    title: 'Visiting Lecturer', organization: 'University of Split · Faculty of Science', period: 'Since 2023',
    details: [
      'Teach data science courses, including NoSQL databases and complex network analysis.',
      'Teaching also includes introductory software engineering and scientific programming.',
    ],
  },
];

export const education: CareerEntry[] = [
  {
    title: 'Doctoral research in computer science', organization: 'University of Split', period: 'Started September 2020',
    details: [
      'Research on digital transformation at the Faculty of Electrical Engineering, Mechanical Engineering and Naval Architecture.',
      'Published work examines digital readiness, technology adoption, and university collaboration.',
    ],
  },
  {
    title: 'Master of Science in Computing', organization: 'Qualification', period: '',
    details: ['Professional qualification recorded as mag. ing. comp. in University of Split project publications.'],
  },
];

export const programs = [
  { name: 'reSEArch-EU', period: 'From 2021', detail: 'Research collaboration, digital transformation, and shared research infrastructure. Co-authored the reports listed below.' },
  { name: 'SEA-EU', period: 'From 2019', detail: 'Member of the research, development, and innovation subcommittee.' },
  { name: 'Science and innovation center, University of Split', period: 'From 2020', detail: 'Project management for university research and innovation infrastructure.' },
  { name: 'University of Split research infrastructure integration', period: 'From 2018', detail: 'Project management for the integration of university science and research infrastructure.' },
];

export const publications = [
  {
    title: 'Pre-AI Baseline: Developer IDE Satisfaction and Tool Autonomy in 2022',
    authors: 'Balić, N.', year: '2026', venue: 'arXiv:2603.06050', kind: 'Preprint', url: 'https://arxiv.org/abs/2603.06050',
  },
  {
    title: 'The Role of Multi-Stakeholder Collaborations in Integrating University Missions: Experience of Six Universities in Europe',
    authors: 'Pace, L. A.; Vranješ Markić, L.; Sammut, F.; Miles, I. D.; Balić, N.', year: '2025', venue: 'European Journal of Education', kind: 'Journal article', url: 'https://doi.org/10.1111/ejed.70301',
  },
  {
    title: 'Will Agents Replace Us? Perceptions of Autonomous Multi-Agent AI',
    authors: 'Balić, N.', year: '2025', venue: 'arXiv:2506.02055', kind: 'Preprint', url: 'https://arxiv.org/abs/2506.02055',
  },
  {
    title: 'Navigating through ocean literacy gaps: an analysis of elementary school textbooks in Croatian education',
    authors: 'Ezgeta-Balić, D.; Balić, N.', year: '2024', venue: 'Mediterranean Marine Science, 25(1), 1–13', kind: 'Journal article', url: 'https://doi.org/10.12681/mms.35378',
  },
  {
    title: 'Perceptions of Digital Learning and Teaching: The Case of a Croatian University Transition to an Emergency Digital Environment',
    authors: 'Balić, N.; Grubišić, A.; Granić, A.', year: '2024', venue: 'Technology, Knowledge and Learning, 29, 453–481 · Online publication: 2023', kind: 'Journal article', url: 'https://doi.org/10.1007/s10758-023-09692-4',
  },
  {
    title: 'Digital transformation of research and innovation roadmap',
    authors: 'Alfirević, N.; Balić, N.', year: '2022', venue: 'reSEArch-EU · Deliverable D2.2', kind: 'Report', url: 'https://researcheu.sea-eu.org/wp-content/uploads/2024/02/2022-12-20-D2.2-Digital-transformation-of-research-and-innovation-roadmap-v5.pdf',
  },
  {
    title: 'Summary report on the Innovative and Entrepreneurial potential of the SEA-EU',
    authors: 'Balić, N.; Vranješ Markić, L.; Vuka, I.', year: '2022', venue: 'reSEArch-EU · Deliverable D3.1', kind: 'Report', url: 'https://researcheu.sea-eu.org/wp-content/uploads/2023/01/2022-12-20-D3.1.-Summary-report-on-the-Innovative-and-Entrepreneurial-potential-of-the-SEA-V2.pdf',
  },
  {
    title: 'Remote work and remotization of infrastructure case study',
    authors: 'Ćukušić, M.; Ljubica, J.; Šćulac, T.; Vranješ Markić, L.; Balić, N.; Vučković, M.', year: '2022', venue: 'reSEArch-EU · Deliverable D2.3', kind: 'Report', url: 'https://researcheu.sea-eu.org/wp-content/uploads/2024/02/D2.3_Remote-work-and-remotization-of-infrastructure-case-study_v1_final.pdf',
  },
  {
    title: 'SEA-EU Academy Guiding principles',
    authors: 'Vranješ Markić, L.; Balić, N.; Vučković, M.', year: '2022', venue: 'reSEArch-EU · Deliverable D2.4', kind: 'Report', url: 'https://projekty.ug.edu.pl/wp-content/uploads/2024/01/SEA-EU-Academy-Guiding-Principles.pdf',
  },
];

export const software = [
  { name: 'AgentProbe', detail: 'Tests how AI agents interact with command-line tools.', url: 'https://github.com/nibzard/agentprobe' },
  { name: 'Agentic AI patterns', detail: 'An open catalogue of patterns for building systems with AI agents.', url: 'https://github.com/nibzard/awesome-agentic-patterns' },
  { name: 'Daytona MCP Interpreter', detail: 'A Model Context Protocol (MCP) server for running Python in temporary Daytona sandboxes.', url: 'https://github.com/nibzard/daytona-mcp-interpreter' },
  { name: 'Claude Threads', detail: 'A web viewer for Claude Code conversations.', url: 'https://github.com/nibzard/claude-threads' },
  { name: 'LLMDB', detail: 'An experimental memory store for autonomous agents.', url: 'https://github.com/nibzard/llmdb' },
  { name: 'AI Enablement Stack', detail: 'A community directory of tools for AI development.', url: 'https://github.com/daytonaio/ai-enablement-stack' },
];
