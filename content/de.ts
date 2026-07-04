import type {Content} from './schema';

// German copy — Swiss High German orthography: always «ss», never «ß» (§4).
// Same register as the English: precise, concrete, no exclamation marks, no
// buzzwords. Contact uses the professional «Sie». Review at checkpoint ⏸5.
// Placeholder notes stay in English on purpose — they are instructions to Nils
// and must grep identically across both locales.
export const de: Content = {
  hero: {
    eyebrow: 'IT-Spezialist — Basel, Schweiz [PLACEHOLDER: confirm public location wording]',
    name: 'Nils Wyser',
    valueProp:
      'Ich baue zuverlässige Daten- und Reporting-Systeme — von Oracle-gestützten Report-Pipelines bis zu Developer-Tooling in Python und TypeScript.',
    ctaPrimary: {label: 'Projekte ansehen', href: '#projects'},
    ctaSecondary: {label: 'Kontakt aufnehmen', href: '#contact'}
  },
  about: {
    heading: 'Ich baue Systeme, die nach der Übergabe korrekt bleiben.',
    body: [
      'Betriebsinformatiker EFZ, ausgebildet bei F. Hoffmann-La Roche in Manufacturing IT, Roche Services & Solutions und PRED Data & Analytics.',
      'Zurzeit absolviere ich ein IT-Praktikum bei Baumann & Cie, Banquiers in Basel [PLACEHOLDER: confirm employer may be named publicly] und arbeite an Report-Konsolidierung und Testautomatisierung.',
      'Was ich übergebe, ist dokumentiert, getestet und im besten Sinne unaufgeregt.'
    ],
    closing:
      '[PLACEHOLDER: one personal closing sentence from Nils — interest/angle, e.g. music/DJing, only if he wants it public]',
    facts: [
      {label: 'Standort', value: 'Basel, Schweiz'},
      {label: 'Sprachen', value: 'Deutsch — Muttersprache · Englisch — [PLACEHOLDER: level, e.g. C1]'},
      {label: 'Fokus', value: 'Daten & Reporting · Backend · Tooling'},
      {label: 'Verfügbarkeit', value: '[PLACEHOLDER: availability / open-to line, if any]'}
    ]
  },
  experience: {
    heading: 'Werdegang.',
    entries: [
      {
        index: '01',
        role: 'IT-Praktikum',
        org: 'Baumann & Cie, Banquiers',
        location: 'Basel',
        period: 'Mai 2026 – heute',
        bullets: [
          'Konsolidierung mehrsprachiger SAP Crystal Reports (DE/FR/EN) zu einzelnen, Oracle-gestützten Basis-Reports.',
          'Python-Test-Tooling zur Validierung von Report-Migrationen: Rendering, Diffing, Regressions-Dashboards.',
          'Technische Dokumentation für interne Reporting-Tools.',
          '[PLACEHOLDER: employer-approved final wording]'
        ]
      },
      {
        index: '02',
        role: 'Lehre Betriebsinformatiker EFZ',
        org: 'F. Hoffmann-La Roche AG',
        location: 'Basel / Kaiseraugst',
        period: '2020–2024',
        bullets: [
          'Rotationen: Manufacturing IT · Roche Services & Solutions · PRED Data & Analytics.',
          '[PLACEHOLDER: 2–3 result-oriented bullets per rotation or overall — reuse the CV bullets Nils already wrote]'
        ]
      }
    ],
    education: {
      label: 'Ausbildung',
      value:
        'Betriebsinformatiker EFZ + Berufsmaturität [PLACEHOLDER: BM direction + completion year]'
    }
  },
  projects: {
    heading: 'Ausgewählte Projekte.',
    items: [
      {
        name: 'learning-assistant-mcp',
        description:
          'Ein MCP-Server für Claude, der Lernen plant und unterstützt: Spaced-Repetition-Planung (SM-2), ein Obsidian-Vault als Single Source of Truth, SQLite-Indexierung und Google-Calendar-Integration.',
        tags: ['Python', 'MCP', 'SQLite', 'Obsidian'],
        href: 'https://github.com/wysernils04/learning-assistant-mcp',
        visualNote: '[PLACEHOLDER: architecture diagram or terminal capture]'
      },
      {
        name: 'Solaris2',
        description:
          'Website für eine Kundin, um ihr Chalet im Wallis zu präsentieren und zu vermieten. [PLACEHOLDER: one line on scope — design, build, booking/inquiry flow?]',
        tags: ['[PLACEHOLDER: stack]'],
        href: '[PLACEHOLDER: live URL + permission to show client name/screenshots]',
        visualNote: '[PLACEHOLDER: screenshot]'
      }
    ]
  },
  skills: {
    heading: 'Womit ich arbeite.',
    groups: [
      {
        label: 'Sprachen',
        items: ['Python', 'TypeScript', 'Java', 'PowerShell', 'SQL'],
        context:
          'Python und TypeScript im Alltag; Java, PowerShell und SQL, wo es die Aufgabe verlangt.'
      },
      {
        label: 'Frameworks & Frontend',
        items: ['Angular', 'Next.js / React'],
        context:
          'Angular in Produktion; diese Website läuft auf Next.js. [PLACEHOLDER: confirm Next.js/React should be listed]'
      },
      {
        label: 'Daten & Reporting',
        items: ['Oracle', 'SAP Crystal Reports', 'DuckDB'],
        context:
          'Report-Konsolidierung auf Oracle-gestützten Crystal Reports; DuckDB für lokale Analysen.'
      },
      {
        label: 'Tooling & Infrastruktur',
        items: ['Docker', 'Git', 'CI'],
        context:
          'Containerisierte Entwicklung, Git-basierte Workflows, CI für Tests. [PLACEHOLDER: confirm/extend]'
      }
    ]
  },
  contact: {
    heading: 'Sprechen wir.',
    lead: 'Am schnellsten erreichen Sie mich per E-Mail.',
    email: 'nils.wyser@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nilswyser'
  }
};
