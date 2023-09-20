/* eslint-disable react/no-unknown-property, jsx-a11y/alt-text, @next/next/no-img-element */
import type { NextRequest } from 'next/server';
import { ImageResponse } from 'next/server';

import { asks } from '@/app/[locale]/ask/asks';

import enMessages from '../../../../../messages/en.json';

type Guides = Record<string, { title: string; desc: string }>;

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const focus = request.nextUrl.searchParams.get('focus') ?? '';
  const guides = enMessages.ask.guides as Guides;

  const defaultTitle = 'How to Ask a Programming Question';
  const defaultDesc =
    'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.';

  const title = guides[focus]?.title ?? defaultTitle;
  const desc = guides[focus]?.desc ?? defaultDesc;
  const index = asks.findIndex((a) => a === focus);

  try {
    const rajdhaniBold = await fetch(
      new URL(`/assets/Rajdhani-Bold.ttf`, import.meta.url),
    ).then((res) => res.arrayBuffer());

    const rajdhaniSemiBold = await fetch(
      new URL(`/assets/Rajdhani-SemiBold.ttf`, import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundColor: '#23252E',
            height: '100%',
            width: '100%',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: '40px',
            padding: '60px 100px 0',
          }}
        >
          <div
            tw="flex flex-col text-[#D19A67] text-5xl"
            style={{ fontFamily: 'Bold' }}
          >
            <div tw="flex text-3xl">GUIDE #{index + 1}</div>
            <div>{title}</div>
          </div>
          <div tw="text-3xl text-white" style={{ fontFamily: 'SemiBold' }}>
            {desc}
          </div>
          <img
            tw="absolute bottom-0 left-1/2"
            style={{ transform: 'translateX(-25%)' }}
            src="https://fullstacksjs.com/image/og-logo.png"
            width="400"
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: 'Bold', data: rajdhaniBold, style: 'normal' },
          { name: 'SemiBold', data: rajdhaniSemiBold, style: 'normal' },
        ],
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
