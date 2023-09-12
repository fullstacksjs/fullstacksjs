import { motion } from 'framer-motion';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export interface LoaderSizeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  size?: string;
  color?: string;
  loading?: boolean;
  duration?: number;
}

export function Loader({
  loading = true,
  color = 'currentColor',
  duration = 2,
  className,
  size = '30px',
}: LoaderSizeProps): JSX.Element | null {
  if (!loading) return null;

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      <motion.span
        variants={variants}
        transition={{ duration, repeat: Infinity }}
        className="absolute left-0 rounded-full"
        style={{
          height: size,
          width: size,
          border: `3px solid ${color}`,
        }}
      />
    </motion.div>
  );
}
