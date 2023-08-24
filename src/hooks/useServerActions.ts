import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Options {
  keepLoading?: boolean;
}

export const useServerActions = <T>(
  action: () => Promise<T>,
  options: Options = {},
) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const mutate = async () => {
    setLoading(true);
    const data = await action();
    router.refresh();
    if (!options.keepLoading) setLoading(false);
    return data;
  };

  return { loading, mutate };
};
