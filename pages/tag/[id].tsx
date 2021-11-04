import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layouts/Layout';
import { ProductItem } from '../../components/layouts/ProductItem';
import { IProduct } from '../../interfaces/product';
import { ITagWithProductResponse } from '../../interfaces/tag';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tag = context.params?.id;
  if (typeof tag !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tags/id/${tag}/1`,
  );
  const {
    tag: { id, name, products },
  }: ITagWithProductResponse = resp.data;
  return {
    props: {
      id,
      name,
      products,
    },
  };
};

const ProductByTag = (props: any) => {
  const tagName: string = props.name;
  const tagId: number = props.id;
  const [products, setProducts] = useState<IProduct[]>(props.products);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNextData = async () => {
    setIsLoading(false);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags/id/${tagId}/${nextPage}`,
      );
      const {
        tag: { products: _products },
      }: ITagWithProductResponse = resp.data;
      if (!_products) {
        return;
      }
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
    <MainLayout pageTitle={tagName + ' 태그'}>
      <>
        <div className="flex items-end">
          <h4 className="text-center font-bold text-white py-1 ml-2 mr-2 bg-black w-32 rounded-md">
            <Link href="/search">검색 화면</Link>
          </h4>
          <h5 className="ml-auto bg-pink-600 text-white text-sm py-1 mr-2 w-14 text-center rounded-md">
            {tagName}
          </h5>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-6 px-2 mt-6">
          {products &&
            products.map((p, idx) => <ProductItem key={idx} p={p} />)}
        </div>
      </>
    </MainLayout>
  );
};

export default ProductByTag;
