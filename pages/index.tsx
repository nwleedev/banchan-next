import next, { GetServerSideProps } from 'next';
import Link from 'next/link';
import { IProduct, IProductResponse } from '../interfaces/product';
import { useEffect, useState } from 'react';
import { MainLayout } from '../components/layouts/Layout';
import { ProductItem } from '../components/layouts/ProductItem';

export const getServerSideProps: GetServerSideProps = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/1`);
  const { products }: IProductResponse = await resp.json();
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

  const fetchNextData = async () => {
    setIsLoading(false);
    console.log('At the bottom');
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${nextPage}`,
      );
      const { products: _products }: IProductResponse = await resp.json();
      setProducts((products) => [...products, ..._products]);
      setNextPage((nextPage) => nextPage + 1);
      await new Promise((res, _) => {
        setTimeout(() => {
          res(null);
        }, 2000);
      });
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const callback = async () => {
      if (!document.documentElement || !window) {
        return;
      }
      const { scrollHeight, scrollTop } = document.documentElement;
      const { innerHeight } = window;
      if (scrollTop + innerHeight + 20 >= scrollHeight && isLoading) {
        setIsLoading(false);
        await fetchNextData();
      }
    };
    document.addEventListener('scroll', callback);
    return () => document.removeEventListener('scroll', callback);
  }, [isLoading]);

  return (
    <MainLayout>
      <>
        <h4 className="text-center font-bold text-white px-1 py-2 ml-2 bg-black w-32 rounded-md">
          <Link href="/search">검색 화면</Link>
        </h4>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-6 px-2 mt-6">
          {products &&
            products.map((p, idx) => <ProductItem key={idx} p={p} />)}
        </div>
      </>
    </MainLayout>
  );
};

export default Home;
