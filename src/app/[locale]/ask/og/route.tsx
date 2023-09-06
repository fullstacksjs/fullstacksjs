import type { NextRequest } from 'next/server';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const defaultTitle = 'How to Ask a Programming Question';
    const defaultDesc =
      'This guide will teach you how to ask a programming question in a way that is clear, concise, and informative. By following these tips, you can increase your chances of getting the help you need from other programmers.';

    const guideNumber: string =
      request.nextUrl.searchParams.get('guideNumber') || '0';
    const title: string =
      request.nextUrl.searchParams.get('title') || defaultTitle;
    const desc: string =
      request.nextUrl.searchParams.get('desc') || defaultDesc;

    const rajdhaniBold = await fetch(
      new URL('/assets/Rajdhani-Bold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    const rajdhaniSemiBold = await fetch(
      new URL('/assets/Rajdhani-SemiBold.ttf', import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#313744',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: 'Rajdhani-Bold',
              fontSize: 50,
              fontStyle: 'normal',
              color: '#D19A67',
              padding: '30px 110px 15px 110px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {`GUIDE #${guideNumber}`}
          </div>
          <div
            style={{
              fontSize: 50,
              fontStyle: 'normal',
              color: '#D19A67',
              whiteSpace: 'pre-wrap',
              padding: '15px 110px 15px 110px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: 'Rajdhani-SemiBold',
              fontSize: 28,
              fontStyle: 'normal',
              color: '#E6E6E6',
              padding: '15px 110px 30px 110px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
            }}
          >
            {desc}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -188,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              width="380"
              height="380"
              src="https://fullstacksjs.com/mstile-150x150.png"
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Rajdhani-Bold',
            data: rajdhaniBold,
            style: 'normal',
          },
          {
            name: 'Rajdhani-SemiBold',
            data: rajdhaniSemiBold,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
