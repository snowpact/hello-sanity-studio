import frTranslations from '../i18n/fr.json';

export function translate(key: string) {
  try {
    return frTranslations[key as keyof typeof frTranslations];
  } catch {
    return key;
  }
}
