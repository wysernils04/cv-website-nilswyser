// Single typed shape shared by content/de.ts and content/en.ts. Values may embed
// `[PLACEHOLDER: …]` markers, which <FlaggedText> renders verbatim. Structured
// link fields (href, email) are checked with hasPlaceholder() so an unresolved
// value becomes a flag instead of a dead link (§2 "zero dead links").

export type Cta = {label: string; href: string};

export type Fact = {label: string; value: string};

export type ExperienceEntry = {
  index: string; // "01", "02" — the sequence is real information (§4.4)
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string; // may be a placeholder → rendered as a flag, not a link
  /** Note describing the still-missing visual asset (§4.5). */
  visualNote: string;
  /**
   * Real screenshot/diagram (§4.5 — never stock, never AI). Drop the file in
   * public/projects/ and fill this in; width/height are the intrinsic pixel
   * size (required so the layout never shifts). Replaces the visualNote frame.
   */
  visual?: {src: string; alt: string; width: number; height: number};
};

export type SkillGroup = {
  label: string;
  items: string[];
  context: string; // one quiet, honest scope line per group (§4.6)
};

export type Content = {
  hero: {
    eyebrow: string;
    name: string; // "Nils Wyser" — uppercased + animated in the hero
    valueProp: string;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
    /**
     * Quiet third CTA (§4.2): "Download CV (PDF)". Leave undefined until the
     * PDF exists in public/cv/ — the link is omitted entirely, never dead.
     */
    cvLink?: Cta;
  };
  about: {
    heading: string;
    body: string[];
    /** Optional personal closing sentence (§4.3) — a placeholder until Nils decides. */
    closing: string;
    facts: Fact[];
  };
  experience: {
    heading: string;
    entries: ExperienceEntry[];
    education: {label: string; value: string};
  };
  projects: {
    heading: string;
    items: Project[];
  };
  skills: {
    heading: string;
    groups: SkillGroup[];
  };
  contact: {
    heading: string;
    lead: string;
    email: string; // placeholder until §10.2 resolved
    linkedin: string; // placeholder until §10.3 resolved
  };
};
