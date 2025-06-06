export interface AuthorInfo {
  "@type": "Person";
  name: string;
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
  identifier?: {
    "@type": "PropertyValue";
    name: string;
    value: string;
  }[];
}

export const AUTHOR_INFO: AuthorInfo = {
  "@type": "Person",
  name: "Nikola Balić",
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
    "https://www.researchgate.net/profile/Nikola_Balic",
    "https://orcid.org/0000-0002-4405-1470"
  ],
  knowsAbout: [
    "Go-to-Market Strategy",
    "AI Product Development",
    "Digital Transformation",
    "Growth Marketing",
    "Complex Network Analysis",
    "Data Science",
    "Innovation Ecosystems"
  ],
  identifier: [
    {
      "@type": "PropertyValue",
      name: "ORCID",
      value: "0000-0002-4405-1470"
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