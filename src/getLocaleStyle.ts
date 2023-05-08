interface LocaleStyle {
  fa: string;
  en: string;
}

export const LanguageStyle = ({ language }: { language: string }) => ({
  get: ({ en, fa }: LocaleStyle) => ({ en, fa }[language]),
});
