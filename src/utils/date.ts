import { isNull } from '@fullstacksjs/toolbox';

import { addLeadingZero } from './number';

export function formatStopWatch(diff: number | null) {
  if (isNull(diff)) return '00.000';

  const seconds = Math.floor(diff / 1000);
  const milliseconds = diff % 1000;

  return `${addLeadingZero(seconds)}.${addLeadingZero(milliseconds)}`;
}
