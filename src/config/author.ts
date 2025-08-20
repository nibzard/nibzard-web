export interface AuthorInfo {
  "@type": "Person";
  name: string;
  alternateName: string[];
  url: string;
  image: string;
  description: string;
  jobTitle: string;
  worksFor: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  sameAs: string[];
  email?: string;
  alumniOf?: {
    "@type": "EducationalOrganization";
    name: string;
  }[];
  knowsAbout?: string[];
  knowsLanguage?: string[];
  affiliation?: {
    "@type": "Organization";
    name: string;
    url?: string;
  }[];
  identifier?: {
    "@type": "PropertyValue";
    name: string;
    value: string;
  }[];
}

export const AUTHOR_INFO: AuthorInfo = {
  "@type": "Person",
  name: "Nikola Balić",
  alternateName: [
    "Nikola Balic",
    "Nikola Balic (nibzard)",
    "Nikola Balić (nibzard)",
    "nibzard"
  ],
  url: "https://nibzard.com",
  image: "https://nibzard.com/avatar/avatar-nibzard.png",
  description: "I build go-to-market engines for AI driven products that matter. Expert in scaling innovation ecosystems and digital transformation.",
  jobTitle: "Growth Marketing Leader & AI Strategy Consultant",
  worksFor: {
    "@type": "Organization",
    name: "Independent Consultant",
  },
  sameAs: [
    "https://x.com/nibzard",
    "https://www.linkedin.com/in/nikolabalic/",
    "https://github.com/nibzard",
    "https://scholar.google.com/citations?user=JT3JHokAAAAJ&hl=en&oi=ao",
    "https://www.researchgate.net/profile/Nikola_Balic",
    "https://orcid.org/0000-0002-4405-1470"
  ],
  knowsAbout: [
    "Go-to-Market Strategy",
    "Product Market Fit",
    "AI Product Development",
    "AI Coding Agents",
    "Digital Transformation",
    "Growth Marketing",
    "Design Sprints",
    "Design Thinking",
    "Jobs To Be Done",
    "Business Model Canvas",
    "Complex Network Analysis",
    "Data Science",
    "Innovation Ecosystems"
  ],
  knowsLanguage: [
    "English",
    "Croatian"
  ],
  affiliation: [
    {
      "@type": "Organization",
      name: "Faculty of Science, University of Split",
      url: "https://www.pmfst.unist.hr/"
    }
  ],
  identifier: [
    {
      "@type": "PropertyValue",
      name: "ORCID",
      value: "0000-0002-4405-1470"
    },
    {
      "@type": "PropertyValue",
      name: "Google Scholar",
      value: "JT3JHokAAAAJ"
    },
    {
      "@type": "PropertyValue",
      name: "ResearchGate",
      value: "Nikola_Balic"
    }
  ]
};

export const ORGANIZATION_INFO = {
  "@type": "Organization",
  name: "nibzard",
  url: "https://nibzard.com",
  logo: "https://nibzard.com/favicon.svg",
  description: "Personal website and insights from Nikola Balić on AI, growth marketing, and innovation",
  founder: AUTHOR_INFO,
  sameAs: [
    "https://x.com/nibzard"
  ]
};