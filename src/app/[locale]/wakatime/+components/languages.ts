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
