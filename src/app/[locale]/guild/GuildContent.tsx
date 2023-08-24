'use client';

import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Emoji } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';
import { Stars } from '@/components/Stars';
import type { User } from '@/supabase/User';

import { Subscription } from './_components/Subscription';

interface Props {
  user: User | undefined;
  isSubscribed: boolean;
}

export const GuildContent = ({ user, isSubscribed }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [isOverlay, setOverlay] = useState(true);

  const t = useTranslations();

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
            animate={{
              opacity: [0, 1],
              transition: {
                ease: 'linear',
                duration: 2,
                delay: 0,
              },
            }}
            className="fixed left-0 top-0 h-full w-full bg-black"
            exit={{ opacity: 0 }}
          >
            <Stars count={50} className="w-1/2 opacity-40" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading ? <Stars count={50} className="w-1/2 opacity-50" /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading ? (
          <motion.div
            transition={{ duration: 1 }}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-16"
            variants={container}
          >
            <motion.div variants={item}>
              <Image
                src="/image/guild.png"
                width={550}
                height={550}
                alt="Guild Logo"
              />
            </motion.div>
            <motion.p variants={item} className="max-w-6xl">
              {t.rich('desc', {
                mark: (chunk) => <Highlight>{chunk}</Highlight>,
                br: () => <br />,
                eflag: () => <Emoji name="pirate" />,
                eparty: () => <Emoji name="party" />,
                atype: (chunk) => (
                  <a
                    className="text-accent-0"
                    href="https://github.com/type-challenges/type-challenges"
                  >
                    {chunk}
                  </a>
                ),
              })}
            </motion.p>

            <motion.div variants={item}>
              <Subscription user={user} isSubscribed={isSubscribed} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
