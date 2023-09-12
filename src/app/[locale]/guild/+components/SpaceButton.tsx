import type { HTMLMotionProps, Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { Loader } from '@/components/Loading';
import { Stars } from '@/components/Stars';
import { cn } from '@/utils/cn';

import styles from './Button.module.css';

const buttonAnim: Variants = {
  anim: {
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.5,
    },
  },
};

const highlightContainerAnim: Variants = {
  init: {
    scaleY: 1,
    scaleX: 1,
    transition: {
      ease: 'linear',
      duration: 0.001,
    },
  },
  anim: {
    scaleY: [null, -1],
    scaleX: [null, -1],
    transition: {
      ease: 'linear',
      duration: 0.001,
      delay: 1.3,
      repeatDelay: 1.3,
      repeatType: 'reverse',
      repeat: Infinity,
    },
  },
};

const highlightAnim: Variants = {
  init: {
    rotateZ: -65,
    transition: { ease: 'linear', duration: 0.001 },
  },
  anim: {
    rotateZ: [null, 65],
    transition: {
      ease: [0.5, 1, 0.89, 1],
      duration: 1.3,
      repeat: Infinity,
    },
  },
};

interface Props extends HTMLMotionProps<'button'> {
  loading?: boolean;
}

export const SpaceButton = ({
  children,
  disabled,
  loading,
  className,
  ...props
}: Props) => {
  return (
    <div className="relative flex items-center justify-center">
      <Stars className="w-[400px]" count={30} />
      <motion.button
        variants={buttonAnim}
        initial="init"
        animate="anim"
        type="button"
        disabled={!!disabled || loading}
        className={cn(
          'relative flex cursor-pointer items-center gap-4 rounded-full px-8 py-6 text-sm font-semibold transition-all',
          styles['button'],
        )}
        {...props}
      >
        <motion.div
          variants={highlightContainerAnim}
          className={cn(
            'absolute inset-0 overflow-hidden rounded-[inherit] pt-[2px]',
            styles['border'],
          )}
        >
          <motion.div
            variants={highlightAnim}
            className={cn(
              `absolute left-1/2 top-0 -z-10 aspect-square w-[200%] rounded-[inherit]`,
              styles['highlight'],
            )}
          />
        </motion.div>
        <motion.span
          className={cn(
            'flex flex-1 items-start justify-center gap-4 overflow-hidden whitespace-nowrap transition-all',
            className,
          )}
        >
          {loading ? <Loader /> : children}
        </motion.span>
      </motion.button>
    </div>
  );
};
