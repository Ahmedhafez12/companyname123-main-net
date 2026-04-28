import { useLocale } from './LocaleContext';
import en from './translations/en';
import ar from './translations/ar';
import type { Translations } from './translations/types';

const translations: Record<string, Translations> = { en, ar };

export function useTranslation() {
  const { locale, isRTL, dir } = useLocale();
  const t = translations[locale] ?? en;
  return { t, locale, isRTL, dir };
}
