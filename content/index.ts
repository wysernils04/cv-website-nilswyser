import type {Locale} from '@/i18n/routing';
import type {Content} from './schema';
import {de} from './de';
import {en} from './en';

const byLocale: Record<Locale, Content> = {de, en};

export function getContent(locale: Locale): Content {
  return byLocale[locale];
}

export type {Content} from './schema';
