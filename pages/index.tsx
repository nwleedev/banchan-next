import next, { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { IProduct, IProductResponse } from '../interfaces/product';
import { useCallback, useEffect, useState } from 'react';
import { CopyIcon, LinkIcon } from '../components/icons/copy';
import { MainLayout } from '../components/layouts/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/1`);
  const { products }: IProductResponse = resp.data;
  return {
    props: {
      products,
    },
  };
};

const Home = (props: any) => {
  const [products, setProducts] = useState<IProduct[]>(props.products);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNextData = useCallback(async () => {
    setIsLoading(false);
    console.log('At the bottom');
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${nextPage}`,
      );
      const { products: _products }: IProductResponse = resp.data;
      setProducts((products) => [...products, ..._products]);
      setNextPage((nextPage) => nextPage + 1);
      await new Promise((res, _) => {
        setTimeout(() => {
          res(null);
        }, 1000);
      });
      // alert(nextPage);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  }, [nextPage]);

  useEffect(() => {
    const callback = () => {
      if (!document.documentElement || !window) {
        return;
      }
      const { scrollHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;
      if (scrollTop + innerHeight + 20 >= scrollHeight && isLoading) {
        fetchNextData();
      }
    };
    document.addEventListener('scroll', callback);
    return () => document.removeEventListener('scroll', callback);
  }, [isLoading]);

  return (
    <MainLayout>
      <>
        <div className="my-4 px-2">
          <h4 className="mb-2 font-bold xs:text-md md:text-lg">
            우리들의 맛있는 반찬 전시회
          </h4>
          <hr className="w-100" />
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-6 px-2 mt-6">
          {products &&
            products.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col items-stretch relative py-3 px-4 shadow-lg mt-4 bg-white"
              >
                <div className="relative">
                  <Image
                    src={p.thumbnail}
                    alt={`thumbnail_${p.id}`}
                    layout="responsive"
                    objectFit="contain"
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
                    <h5 className="text-center font-bold text-white">
                      반찬 쇼핑
                    </h5>
                  </a>
                  <button className="bg-green-300 mt-2 p-1 rounded-md">
                    <CopyIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    </MainLayout>
  );
};

export default Home;
