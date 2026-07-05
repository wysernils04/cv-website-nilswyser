import type {Content} from './schema';

// German copy — Swiss High German orthography: always «ss», never «ß» (§4).
// Same register as the English: precise, concrete, no exclamation marks, no
// buzzwords. Contact uses the professional «Sie». Review at checkpoint ⏸5.
// Placeholder notes stay in English on purpose — they are instructions to Nils
// and must grep identically across both locales.
export const de: Content = {
  hero: {
    eyebrow: 'IT-Spezialist — Basel, Schweiz',
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
      'Zurzeit absolviere ich ein IT-Praktikum bei Baumann & Cie, Banquiers in Basel und arbeite an Report-Konsolidierung und Testautomatisierung.',
      'Was ich übergebe, ist dokumentiert, getestet und im besten Sinne unaufgeregt.'
    ],
    closing:
      'Ich lerne gerne Neues und entwickle Lösungen, die auch morgen noch funktionieren.',
    facts: [
      {label: 'Standort', value: 'Basel, Schweiz'},
      {label: 'Sprachen', value: 'Deutsch — Muttersprache · Englisch — C1'},
      {label: 'Fokus', value: 'Daten & Reporting · Backend · Tooling'},
      {label: 'Verfügbarkeit', value: 'Aktuell in der Passerelle und offen für passende Praktika oder Projekte im IT-Umfeld.'}
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
          'Technische Dokumentation für interne Reporting-Tools.'
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
          'On-site IT-Support für die Pharmaproduktion: GxP/GMP-reguliertes Umfeld, Hardware-Support und Labor-Inventar in Basel und Kaiseraugst.',
          'Software-Lösungen und Integrationen für interne IT-Systeme, darunter Chatbots zur Automatisierung des User-Supports und Microservices für Skalierbarkeit und Wartbarkeit.',
          'Modernisierung eines Systems für DNA-Encoded Library Technology (DELT): Micro-Frontend-Webentwicklung und Microservices im Scrum-Team.'
        ]
      }
    ],
    education: {
      label: 'Ausbildung',
      value:
        'Betriebsinformatiker EFZ + Berufsmaturität, technische Richtung (2025)'
    }
  },
  projects: {
    heading: 'Ausgewählte Projekte.',
    items: [
      {
        name: 'learning-assistant-mcp',
        description:
          'Ein MCP-Server für Claude, der Lernen plant und unterstützt: Spaced-Repetition-Planung (SM-2), ein Obsidian-Vault als Single Source of Truth, SQLite-Indexierung und SBB-Pendelzeiten für optimale Lernfenster.',
        tags: ['Python', 'MCP', 'SQLite', 'Obsidian'],
        href: 'https://github.com/wysernils04/learning-assistant-mcp',
        visualNote: '',
        visual: {
          src: '/projects/learning-assistant-architecture.png',
          alt: 'Architekturdiagramm: Claude Desktop spricht über MCP mit dem Learning-Assistant-Server; atomarer Dual-Write in Obsidian-Vault und SQLite, SM-2-Scheduling, SBB-OpenData-API.',
          width: 2254,
          height: 1990
        }
      },
      {
        name: 'Solaris2',
        description:
          'Website für eine Kundin: Präsentation und Vermietung ihrer Ferienwohnung in Albinen (Wallis) — Galerie, Anreise-Informationen und direkte Anfrage.',
        tags: ['React', 'TypeScript', 'Vite'],
        href: 'https://solaris-albinen.ch',
        visualNote: '',
        visual: {
          src: '/projects/solaris2.jpg',
          alt: 'Screenshot der Solaris2-Website: Hero mit Chalet-Foto in Albinen, Belegungs-Kennzahlen und Galerie.',
          width: 1400,
          height: 875
        }
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
          'Angular in Produktion; diese Website läuft auf Next.js.'
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
          'Containerisierte Entwicklung, Git-basierte Workflows, CI für Tests.'
      }
    ]
  },
  contact: {
    heading: 'Sprechen wir.',
    lead: 'Am schnellsten erreichen Sie mich per E-Mail.',
    email: 'nils.wyser@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nils-wyser'
  }
};
