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
      'Currently completing an IT internship at Baumann & Cie, Banquiers in Basel [PLACEHOLDER: confirm employer may be named publicly], working on report consolidation and test automation.',
      'What I hand over is documented, tested, and boring in the best way.'
    ],
    closing:
      '[PLACEHOLDER: one personal closing sentence from Nils — interest/angle, e.g. music/DJing, only if he wants it public]',
    facts: [
      {label: 'Location', value: 'Basel, Switzerland'},
      {label: 'Languages', value: 'German — native · English — [PLACEHOLDER: level, e.g. C1]'},
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
        period: '[PLACEHOLDER: start date] – present',
        bullets: [
          'Consolidating multilingual SAP Crystal Reports (DE/FR/EN) into single Oracle-backed base reports.',
          'Built Python test tooling to validate report migrations: rendering, diffing, regression dashboards.',
          'Writing technical documentation for internal reporting tools.',
          '[PLACEHOLDER: employer-approved final wording]'
        ]
      },
      {
        index: '02',
        role: 'Betriebsinformatiker EFZ Apprenticeship',
        org: 'F. Hoffmann-La Roche AG',
        location: 'Basel / Kaiseraugst',
        period: '[PLACEHOLDER: years, e.g. 20XX–20XX]',
        bullets: [
          'Rotations: Manufacturing IT · Roche Services & Solutions · PRED Data & Analytics.',
          '[PLACEHOLDER: 2–3 result-oriented bullets per rotation or overall — reuse the CV bullets Nils already wrote]'
        ]
      }
    ],
    education: {
      label: 'Education',
      value:
        'Betriebsinformatiker EFZ + Berufsmaturität [PLACEHOLDER: BM direction + completion year]'
    }
  },
  projects: {
    heading: 'Selected work.',
    items: [
      {
        name: 'learning-assistant-mcp',
        description:
          'An MCP server for Claude that plans and assists learning: spaced-repetition scheduling (SM-2), an Obsidian vault as the source of truth, SQLite indexing, and Google Calendar integration.',
        tags: ['Python', 'MCP', 'SQLite', 'Obsidian'],
        href: 'https://github.com/wysernils04/learning-assistant-mcp',
        visualNote: '[PLACEHOLDER: architecture diagram or terminal capture]'
      },
      {
        name: 'Solaris2',
        description:
          'Website for a client to present and rent out her chalet in Valais. [PLACEHOLDER: one line on scope — design, build, booking/inquiry flow?]',
        tags: ['[PLACEHOLDER: stack]'],
        href: '[PLACEHOLDER: live URL + permission to show client name/screenshots]',
        visualNote: '[PLACEHOLDER: screenshot]'
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
    linkedin: 'https://www.linkedin.com/in/nilswyser'
  }
};
