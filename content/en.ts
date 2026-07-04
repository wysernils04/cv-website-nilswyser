import type {Content} from './schema';

// English copy — written first (HANDOVER §4). Concrete nouns and numbers, active
// voice, no exclamation marks, banned buzzwords avoided. Review at checkpoint ⏸5.
export const en: Content = {
  hero: {
    eyebrow: 'IT Specialist — Basel, Switzerland [PLACEHOLDER: confirm public location wording]',
    name: 'Nils Wyser',
    valueProp:
      'I build reliable data and reporting systems — from Oracle-backed report pipelines to developer tooling in Python and TypeScript.',
    ctaPrimary: {label: 'View projects', href: '#projects'},
    ctaSecondary: {label: 'Get in touch', href: '#contact'}
  },
  about: {
    heading: 'I build systems that stay correct after I hand them over.',
    body: [
      'Betriebsinformatiker EFZ, trained at F. Hoffmann-La Roche across Manufacturing IT, Roche Services & Solutions, and PRED Data & Analytics.',
      'Currently completing an IT internship at Baumann & Cie, Banquiers in Basel, working on report consolidation and test automation.',
      'What I hand over is documented, tested, and boring in the best way.'
    ],
    closing:
      '[PLACEHOLDER: one personal closing sentence from Nils — interest/angle, e.g. music/DJing, only if he wants it public]',
    facts: [
      {label: 'Location', value: 'Basel, Switzerland'},
      {label: 'Languages', value: 'German — native · English — C1'},
      {label: 'Focus', value: 'Data & Reporting · Backend · Tooling'},
      {label: 'Availability', value: '[PLACEHOLDER: availability / open-to line, if any]'}
    ]
  },
  experience: {
    heading: "Where I've worked.",
    entries: [
      {
        index: '01',
        role: 'IT Internship',
        org: 'Baumann & Cie, Banquiers',
        location: 'Basel',
        period: 'May 2026 – present',
        bullets: [
          'Consolidating multilingual SAP Crystal Reports (DE/FR/EN) into single Oracle-backed base reports.',
          'Built Python test tooling to validate report migrations: rendering, diffing, regression dashboards.',
          'Writing technical documentation for internal reporting tools.'
        ]
      },
      {
        index: '02',
        role: 'Betriebsinformatiker EFZ Apprenticeship',
        org: 'F. Hoffmann-La Roche AG',
        location: 'Basel / Kaiseraugst',
        period: '2020–2024',
        bullets: [
          'Rotations: Manufacturing IT · Roche Services & Solutions · PRED Data & Analytics.',
          'On-site IT support for pharmaceutical production: GxP/GMP-regulated environment, hardware support, and lab inventory across Basel and Kaiseraugst.',
          'Software solutions and integrations for internal IT systems, including chatbots that automated user support and microservices built for scalability and maintainability.',
          'Modernised a system for DNA-Encoded Library Technology (DELT): micro-frontend web development and microservices in a Scrum team.'
        ]
      }
    ],
    education: {
      label: 'Education',
      value:
        'Betriebsinformatiker EFZ + Berufsmaturität, technical direction (2025)'
    }
  },
  projects: {
    heading: 'Selected work.',
    items: [
      {
        name: 'learning-assistant-mcp',
        description:
          'An MCP server for Claude that plans and assists learning: spaced-repetition scheduling (SM-2), an Obsidian vault as the source of truth, SQLite indexing, and SBB commute times for optimal study slots.',
        tags: ['Python', 'MCP', 'SQLite', 'Obsidian'],
        href: 'https://github.com/wysernils04/learning-assistant-mcp',
        visualNote: '',
        visual: {
          src: '/projects/learning-assistant-architecture.png',
          alt: 'Architecture diagram: Claude Desktop talks to the learning-assistant server over MCP; atomic dual-write to an Obsidian vault and SQLite, SM-2 scheduling, SBB OpenData API.',
          width: 2254,
          height: 1990
        }
      },
      {
        name: 'Solaris2',
        description:
          'Website for a client to present and rent out her holiday apartment in Albinen (Valais) — gallery, arrival information, and a direct inquiry flow.',
        tags: ['React', 'TypeScript', 'Vite'],
        href: 'https://solaris-albinen.ch',
        visualNote: '',
        visual: {
          src: '/projects/solaris2.jpg',
          alt: 'Screenshot of the Solaris2 website: hero with a photo of the chalet in Albinen, occupancy facts, and gallery.',
          width: 1400,
          height: 875
        }
      }
    ]
  },
  skills: {
    heading: 'What I work with.',
    groups: [
      {
        label: 'Languages',
        items: ['Python', 'TypeScript', 'Java', 'PowerShell', 'SQL'],
        context:
          'Python and TypeScript day to day; Java, PowerShell, and SQL where the job calls for them.'
      },
      {
        label: 'Frameworks & Frontend',
        items: ['Angular', 'Next.js / React'],
        context:
          'Angular in production; this site runs on Next.js. [PLACEHOLDER: confirm Next.js/React should be listed]'
      },
      {
        label: 'Data & Reporting',
        items: ['Oracle', 'SAP Crystal Reports', 'DuckDB'],
        context:
          'Report consolidation on Oracle-backed Crystal Reports; DuckDB for local analysis.'
      },
      {
        label: 'Tooling & Infrastructure',
        items: ['Docker', 'Git', 'CI'],
        context:
          'Containerised development, Git-based workflows, CI for tests. [PLACEHOLDER: confirm/extend]'
      }
    ]
  },
  contact: {
    heading: "Let's talk.",
    lead: 'The fastest way to reach me is email.',
    email: 'nils.wyser@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nils-wyser'
  }
};
