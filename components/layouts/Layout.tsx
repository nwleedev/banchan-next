import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ILayout } from '../../interfaces/layout';
import { TopIcon } from '../icons/scroll';

export const MainLayout = ({ pageTitle, children }: ILayout) => (
  <div
    className="lg:container lg:mx-auto pb-8 px-8"
    style={{ width: '100%', maxWidth: '1080px', minWidth: '0px' }}
  >
    <Head>
      <title>{pageTitle && pageTitle + ' - '}Banchan Online</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta name="description" content="Welcome to Online Banchan App!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex items-center mt-4 whitespace-nowrap relative">
      <h1 className="md:text-4xl xs:text-2xl font-bold mr-2 pl-2 whitespace-nowrap">
        <Link href="/">BANCHAN APP</Link>
      </h1>
      <Link href="/" passHref={true}>
        <div className="relative xs:w-12 md:w-18">
          <Image
            src="/header_icon.png"
            alt="header-icon"
            layout="responsive"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </div>
      </Link>
    </div>
    {children}
    <button
      className="bg-black fixed p-2 rounded-2xl"
      style={{ bottom: 50, left: 50 }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <TopIcon />
    </button>
  </div>
);
