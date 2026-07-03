import {useTranslations} from 'next-intl';
import type {Content} from '@/content/schema';
import {hasPlaceholder} from '@/lib/placeholders';
import {FlaggedText} from './flagged-text';
import {Reveal} from './reveal';
import {Section} from './section';

// Projects (§4.5): large cards — name (display face), one-sentence description,
// mono tag row, single visual slot, link. Hover: title underline in accent.
// A placeholder href renders as a visible flag, never as a dead link (§2).
// The visual slot shows a flagged note until a real screenshot/diagram exists —
// no stock imagery, ever.
export function Projects({content}: {content: Content['projects']}) {
  const t = useTranslations('sections');
  const ta = useTranslations('actions');

  return (
    <Section
      id="projects"
      eyebrow={t('projectsEyebrow')}
      heading={content.heading}
      grid
    >
      <div className="flex flex-col gap-6 md:gap-8">
        {content.items.map((project, i) => {
          const linkReal = !hasPlaceholder(project.href);
          const isGithub = project.href.includes('github.com');

          const card = (
            <article className="group grid gap-8 border border-line bg-surface p-6 transition-colors duration-200 md:grid-cols-2 md:gap-6 md:p-10">
              <div className="flex flex-col">
                <h3 className="display-3 text-fg">
                  <span
                    className={
                      linkReal
                        ? 'bg-[linear-gradient(var(--accent-text),var(--accent-text))] bg-[position:0_100%] bg-no-repeat [background-size:0%_1px] transition-[background-size] duration-150 group-hover:[background-size:100%_1px]'
                        : undefined
                    }
                  >
                    {project.name}
                  </span>
                </h3>
                <p className="mt-4 max-w-[52ch] text-muted">
                  <FlaggedText text={project.description} />
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label="Stack">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      <FlaggedText text={tag} />
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-auto pt-8 text-fg">
                  {linkReal ? (
                    <span className="link-underline">
                      {isGithub ? ta('viewOnGithub') : ta('visitSite')}{' '}
                      <span aria-hidden>↗</span>
                    </span>
                  ) : (
                    <FlaggedText text={project.href} />
                  )}
                </p>
              </div>

              {/* Visual slot — real screenshot/diagram only (§4.5). Until the
                  asset exists, an honest flagged note fills the frame. */}
              <div
                className="flex min-h-48 items-center justify-center border border-dashed p-6 md:min-h-full"
                style={{borderColor: 'var(--border)'}}
              >
                <p className="eyebrow text-center">
                  {ta('visualPending')} — <FlaggedText text={project.visualNote} />
                </p>
              </div>
            </article>
          );

          return (
            <Reveal key={project.name} delay={i * 0.06}>
              {linkReal ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:outline-2"
                  aria-label={`${project.name} — ${isGithub ? ta('viewOnGithub') : ta('visitSite')}`}
                >
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
