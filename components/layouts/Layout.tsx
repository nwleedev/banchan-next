/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ILayout } from '../../interfaces/layout';
import { ScrollIcon } from '../icons';
import Script from 'next/script';

export const MainLayout = ({
  pageTitle,
  image,
  url,
  children,
  keyword,
}: ILayout) => {
  return (
    <>
      <div
        className="lg:container lg:mx-auto px-8"
        style={{
          width: '100%',
          maxWidth: '1080px',
          minWidth: '0px',
          paddingBottom: '120px',
        }}
      >
        <Head>
          <title>{pageTitle && pageTitle + ' - '}반찬 저장소</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <meta name="description" content="Welcome to Online Banchan App!" />
          {image && (
            <>
              <meta name="image" content={image} />
              <meta name="og:image" content={image} />
              <meta name="twitter:image" content={image} />
            </>
          )}
          {url && (
            <>
              <meta name="url" content={url} />
              <meta name="og:url" content={url} />
              <meta name="twitter:url" content={url} />
            </>
          )}
          {keyword && (
            <>
              <meta
                name="keyword"
                content={keyword + ',반찬저장소,우리들의 맛있는 반찬 전시회'}
              />
              <meta
                name="og:keyword"
                content={keyword + ',반찬저장소,우리들의 맛있는 반찬 전시회'}
              />
              <meta
                name="twitter:keyword"
                content={keyword + ',반찬저장소,우리들의 맛있는 반찬 전시회'}
              />
            </>
          )}
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex items-center mt-4 whitespace-nowrap relative">
          <h1 className="md:text-4xl xs:text-2xl font-bold mr-2 pl-2 whitespace-nowrap">
            <Link href="/">반찬 저장소</Link>
          </h1>
          <Link href="/" passHref={true}>
            <div className="relative xs:w-12 md:w-18">
              <img
                src="/header_icon.png"
                alt="header-icon"
                width="100%"
                height="100%"
              />
            </div>
          </Link>
        </div>
        <div className="my-4 px-2">
          <h4 className="mb-2 font-bold xs:text-md md:text-lg">
            우리들의 맛있는 반찬 전시회
          </h4>
          <hr className="w-100" />
        </div>
        {children}
        <button
          className="bg-white fixed p-2 rounded-2xl z-10"
          style={{ bottom: 48, left: 30 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <ScrollIcon />
        </button>
      </div>
      <div className="bg-black p-1 fixed bottom-0 left-0 right-0">
        <h2 className="text-white text-center font-bold text-xs">
          이 사이트는 쿠팡 파트너스의 활동을 통해 쿠팡에서 일정액의 수수료를
          제공받습니다.
        </h2>
      </div>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GA}');`}
      </Script>
    </>
  );
};
