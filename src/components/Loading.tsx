import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export interface LoaderSizeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
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
}: LoaderSizeProps): React.JSX.Element | null {
  if (!loading) return null;

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  return (
    <motion.div
      animate="visible"
      className={cn('relative', className)}
      exit="hidden"
      initial="hidden"
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute left-0 rounded-full"
        variants={variants}
        transition={{ duration, repeat: Infinity }}
        style={{
          height: size,
          width: size,
          border: `3px solid ${color}`,
        }}
      />
    </motion.div>
  );
}
