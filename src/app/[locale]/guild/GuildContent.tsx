'use client';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { Emoji } from '@/components/Emoji';
import { Highlight } from '@/components/Highlight';
import { useCurrentUser } from '@/firebase/useCurrentUser';
import { useSignIn } from '@/firebase/useSignIn';
import { useSubscribeGuild } from '@/firebase/useSubscribeGuild';

const JoinButton = () => {
  const t = useTranslations();
  const subscribe = useSubscribeGuild();

  const button: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        repeatDelay: 3,
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <Button asChild>
      <motion.button onClick={subscribe} variants={button} animate="animate">
        {t('join')}
      </motion.button>
    </Button>
  );
};

const NeedToJoin = ({ onClick }: { onClick: VoidFunction }) => {
  const t = useTranslations();
  return (
    <p className="text-fg-1">
      {t.rich('sign-in', {
        join: (chunk) => (
          <button className="text-accent-0" onClick={onClick}>
            {chunk}
          </button>
        ),
      })}
    </p>
  );
};

export const GuildContent = () => {
  const [isLoading, setLoading] = useState(true);
  const [isOverlay, setOverlay] = useState(true);
  const { signIn } = useSignIn();

  const { data: user } = useCurrentUser();

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
            transition={{ duration: 1, ease: 'easeIn' }}
            initial={{ background: '#0000' }}
            animate={{ background: '#111216' }}
            className="fixed left-0 top-0 h-full w-full"
            exit={{ background: '#0000' }}
          />
        ) : null}
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
              {!user ? (
                <NeedToJoin onClick={() => signIn()} />
              ) : user.isGuildMember ? (
                <div className="flex items-center">
                  Subscribed <Emoji name="party" />
                </div>
              ) : (
                <JoinButton />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
