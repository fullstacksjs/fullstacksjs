import type {
  WakatimeLanguage,
  WakatimeUser,
} from '@/data-layer/wakatime/Wakatime';

import { Avatar } from '@/components/Avatar';
import { cn } from '@/utils/cn';

import { getLanguageColorClass } from './languages';

interface MemberProps {
  user: WakatimeUser;
  className?: string;
  nameClassName?: string;
  size?: 'md' | 'sm';
}

export function Member({
  user,
  className,
  nameClassName,
  size = 'sm',
}: MemberProps) {
  return (
    <div className={cn('flex items-center gap-8', className)}>
      <Avatar
        alt={`${user.name}'s avatar`}
        className={cn('size-16', {
          'desktop:size-24': size === 'md',
        })}
        size={size}
        src={user.avatar}
      />
      <div className="min-w-0">
        <p className={cn('truncate text-sm font-medium', nameClassName)}>
          {user.name}
        </p>
        <p className="truncate font-mono text-xs text-fg-1 bidi-plain">
          @{user.username}
        </p>
      </div>
    </div>
  );
}

interface LanguageBadgeProps {
  language?: WakatimeLanguage;
  className?: string;
  dotClassName?: string;
}

export function LanguageBadge({
  language,
  className,
  dotClassName,
}: LanguageBadgeProps) {
  if (!language) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-4 font-mono text-xs text-fg-1',
        className,
      )}
    >
      <span
        className={cn(
          'size-6 shrink-0 rounded-sm',
          getLanguageColorClass(language.name),
          dotClassName,
        )}
      />
      {language.name}
    </span>
  );
}
