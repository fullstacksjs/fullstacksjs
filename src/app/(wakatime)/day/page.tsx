import { Podium } from '@/app/[locale]/wakatime/+components/Podium';
import { RankingTable } from '@/app/[locale]/wakatime/+components/RankingTable';
import { getReportWithoutCache } from '@/data-layer/wakatime/getReport';

export default async function WakatimeDay() {
  const { day, year, usages, winners } = await getReportWithoutCache(10);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl/none font-bold tracking-tight">
          Wakatime
        </h1>
        <p className="text-xl font-bold text-fg-1">
          Day {day} of the year {year}
        </p>
      </div>
      <Podium winners={winners} />

      <div className="w-full rounded-lg border border-border bg-bg-raised shadow-sm">
        <RankingTable usages={usages} />
      </div>
    </>
  );
}
