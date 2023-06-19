import { isNull } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import type { RuleState } from '@/components/Rule';

export function useRuleTarget() {
  const [activeTarget, setActive] = useState<string | undefined>();

  const getState = (target: string): RuleState => {
    if (isNull(activeTarget)) return 'idle';
    if (activeTarget === target) return 'focused';
    return 'faded';
  };

  const handleSelect = (target: string) => {
    if (target === activeTarget) setActive(undefined);
    else setActive(target);
  };

  return { handleSelect, getState };
}
