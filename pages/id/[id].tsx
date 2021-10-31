import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { IProductItem, IProductResponse } from '../../interfaces/product/item';
import { LinkIcon } from '../../layouts/icons/copy';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (typeof id !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/id/${id}`,
  );
  const data: IProductResponse = resp.data;
  const { product } = data;
  return {
    props: {
      product,
    },
  };
};

const ProductPage = (props: any) => {
  const product: IProductItem = props.product;

  return (
    <div
      className="lg:container lg:mx-auto pb-8 px-8"
      style={{ width: '100%', maxWidth: '1080px', minWidth: '420px' }}
    >
      {product && (
        <>
          <Head>
            <title>{product.title} - Banchan App</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no"
            />
            <meta name="description" content="Welcome to Online Banchan App!" />
          </Head>

          <div className="flex items-center mt-4">
            <h1 className="text-4xl font-bold mr-2 pl-6">
              <Link href="/">BANCHAN APP</Link>
            </h1>
            <Image
              src="/header_icon.png"
              alt="header-icon"
              width="52px"
              height="52px"
            />
          </div>
          <div className="my-2 px-6">
            <hr className="w-100" />
          </div>
          <div className="px-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="w-96 relative my-4">
              <Image
                src={product.thumbnail}
                alt={`thumbnail_${product.id}`}
                layout="responsive"
                objectFit="contain"
                width="100%"
                height="100%"
              />
            </div>
            <h3 className="font-bold text-lg">
              현재가: <span className="text-red-500">{product.price}원</span>
            </h3>
            <div className="flex flex-wrap items-center">
              {product.tags.map((tag) => (
                <h5
                  key={tag.id}
                  className="bg-pink-600 flex mr-2 my-1 px-2 py-1 rounded-xl font-bold text-white shadow-md"
                >
                  {tag.name}
                </h5>
              ))}
            </div>
            <h3 className="text-md font-semibold my-2">
              사용자 리뷰: {product.review}개
            </h3>
            <div className="flex">
              <a
                className="px-4 flex justify-center items-center rounded-md bg-green-400 mr-2 py-1 shadow-md"
                href={product.landing_url}
                target="_blank"
                rel="noreferer noreferrer"
              >
                <LinkIcon />
                <h5 className="text-center font-bold text-white">
                  쇼핑하러가기
                </h5>
              </a>
            </div>
            <h3 className="font-bold mt-4 text-xl">관련 이미지</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 gap-8">
              {product.posters.map((poster, i) => (
                <div key={i} className="w-full relative mt-4 mx-auto">
                  <Image
                    src={poster.url}
                    alt={`product_poster_${i}`}
                    layout="responsive"
                    objectFit="contain"
                    width="100%"
                    height="100%"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
