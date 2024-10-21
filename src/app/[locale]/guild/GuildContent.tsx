'use client';

import type { User } from '@/data-layer/supabase/models/User';
import type { Variants } from 'framer-motion';
import type { RichTranslationValues } from 'next-intl';

import { Stars } from '@/components/Stars';
import { i18nComponents } from '@/i18n/i18nComponents';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Subscription } from './+components/Subscription';

interface Props {
  user: User | undefined;
  isSubscribed: boolean;
}

const i18nMap: RichTranslationValues = {
  ...i18nComponents,
  atype: (chunk) => (
    <a
      className="text-accent-0"
      href="https://github.com/type-challenges/type-challenges"
    >
      {chunk}
    </a>
  ),
};

export const GuildContent = ({ user, isSubscribed }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [isOverlay, setOverlay] = useState(true);

  const t = useTranslations('guild');

  useEffect(() => {
    setTimeout(() => {
      setOverlay(false);
    }, 3000);

    setTimeout(() => {
      document.body.classList.add('retro-bg');
      setLoading(false);
    }, 1500);

    return () => {
      document.body.classList.remove('retro-bg');
    };
  }, []);

  const container: Variants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: -50 },
  };

  return (
    <div className="min-h-[800px]">
      <AnimatePresence>
        {isOverlay ? (
          <motion.div
            className="fixed left-0 top-0 size-full bg-black"
            exit={{ opacity: 0 }}
            animate={{
              opacity: [0, 1],
              transition: { ease: 'linear', duration: 2, delay: 0 },
            }}
          >
            <Stars className="w-[800px] opacity-40" count={50} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading ? (
          <Stars className="w-[800px] opacity-50" count={50} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading ? (
          <motion.div
            animate="visible"
            className="flex flex-col items-center justify-center gap-20"
            initial="hidden"
            transition={{ duration: 1 }}
            variants={container}
          >
            <motion.div variants={item}>
              <Image
                height={550}
                width={550}
                alt="Guild Logo"
                src="/image/guild.png"
              />
            </motion.div>
            <motion.p className="max-w-6xl" variants={item}>
              {t.rich('desc', i18nMap)}
            </motion.p>

            <motion.div variants={item}>
              <Subscription isSubscribed={isSubscribed} user={user} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
