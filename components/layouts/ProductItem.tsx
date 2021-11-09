import Link from 'next/link';
import { useState } from 'react';
import { IProduct } from '../../interfaces/product';
import { CopyIcon, LinkIcon } from '../icons';
import CopyMessage from './Toast';

export const ProductItem = ({ p }: { p: IProduct }) => {
  const [isCopyed, setIsCopyed] = useState(false);
  return (
    <div className="flex flex-col items-stretch relative py-3 px-4 shadow-lg mt-4 bg-white">
      <div className="relative">
        <img
          src={p.thumbnail}
          alt={`thumbnail_${p.id}`}
          // layout="responsive"
          // objectFit="contain"
          width="100%"
          height="100%"
        />
      </div>
      <h2 className="text-lg font-semibold mt-2 truncate">
        <Link href={`/id/${p.id}`}>{p.title}</Link>
      </h2>
      <div className="flex justify-between">
        <h4 className="font-bold">{p.price}원</h4>
        <h4 className="text-red-500">리뷰 {p.review}개</h4>
      </div>
      <div className="w-full flex items-center">
        <a
          className="w-full flex justify-center items-center rounded-md bg-red-400 mt-2 mr-2 py-1 "
          href={p.landing_url}
          target="_blank"
          rel="noreferer noreferrer"
        >
          <LinkIcon />
          <h5 className="text-center font-bold text-white">반찬 쇼핑</h5>
        </a>
        <button
          className="bg-green-300 mt-2 p-1 rounded-md"
          onClick={async () => {
            if (!('clipboard' in navigator)) {
              return;
            }
            navigator.clipboard.writeText(p.landing_url);
            if (!isCopyed) {
              setIsCopyed(true);
              await new Promise((res, _) => {
                setTimeout(() => {
                  setIsCopyed(false);
                  res(null);
                }, 3000);
              });
            }
          }}
        >
          <CopyIcon />
        </button>
        {isCopyed && <CopyMessage />}
      </div>
    </div>
  );
};
