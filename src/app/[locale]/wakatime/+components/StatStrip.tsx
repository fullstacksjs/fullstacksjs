import { useTranslations } from 'next-intl';

import type { WakatimeUsage } from '@/data-layer/wakatime/Wakatime';

import { ClockIcon, UsersIcon } from './Icons';

interface Props {
  winners: WakatimeUsage[];
  usages: WakatimeUsage[];
}

function StatCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-45 flex-1 rounded-lg border border-border bg-bg-raised px-10 py-8 shadow-sm">
      <div className="mb-10 flex items-center gap-8 text-fg-1">
        <span className="size-14">{icon}</span>
        <span className="font-mono text-xs tracking-wide uppercase">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export function StatStrip({ winners, usages }: Props) {
  const t = useTranslations('wakatime');
  const all = [...winners, ...usages];
  const totalSeconds = all.reduce((sum, u) => sum + u.totalSeconds, 0);
  const totalHours = Math.round(totalSeconds / 3600).toLocaleString();

  return (
    <div className="mb-24 flex w-full flex-wrap gap-12">
      <StatCard
        icon={<UsersIcon className="size-full" />}
        label={t('membersCoding')}
      >
        <p className="text-3xl/none font-bold bidi-plain">{all.length}</p>
      </StatCard>
      <StatCard
        icon={<ClockIcon className="size-full" />}
        label={t('hoursToday')}
      >
        <p className="text-3xl/none font-bold bidi-plain">{totalHours}</p>
      </StatCard>
    </div>
  );
}
