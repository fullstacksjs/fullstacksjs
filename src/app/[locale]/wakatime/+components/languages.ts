import type {
  WakatimeLanguage,
  WakatimeUsage,
} from '@/data-layer/wakatime/Wakatime';

const LANGUAGE_CLASSES: Record<string, string> = {
  typescript: 'bg-lang-typescript',
  javascript: 'bg-lang-javascript',
  python: 'bg-lang-python',
  go: 'bg-lang-go',
  rust: 'bg-lang-rust',
  java: 'bg-lang-java',
  kotlin: 'bg-lang-kotlin',
  c: 'bg-lang-c',
  'c++': 'bg-lang-cpp',
  'c#': 'bg-lang-csharp',
  php: 'bg-lang-php',
  ruby: 'bg-lang-ruby',
  swift: 'bg-lang-swift',
  dart: 'bg-lang-dart',
  html: 'bg-lang-html',
  css: 'bg-lang-css',
  json: 'bg-lang-json',
  markdown: 'bg-lang-markdown',
  yaml: 'bg-lang-yaml',
  shell: 'bg-lang-shell',
  bash: 'bg-lang-shell',
  vue: 'bg-lang-vue',
  elixir: 'bg-lang-elixir',
  sql: 'bg-lang-sql',
};

const FALLBACK_CLASS = 'bg-lang-other';

export function getLanguageColorClass(name: string): string {
  return LANGUAGE_CLASSES[name.toLowerCase()] ?? FALLBACK_CLASS;
}

export function getTopLanguage(
  languages: WakatimeLanguage[],
): WakatimeLanguage | undefined {
  return languages[0];
}

export function getCommunityTopLanguage(
  usages: WakatimeUsage[],
): string | undefined {
  const totals = new Map<string, number>();

  for (const usage of usages) {
    for (const lang of usage.user.languages) {
      totals.set(lang.name, (totals.get(lang.name) ?? 0) + lang.totalSeconds);
    }
  }

  let top: string | undefined;
  let max = -1;

  for (const [name, seconds] of totals) {
    if (seconds > max) {
      max = seconds;
      top = name;
    }
  }

  return top;
}
