import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { IProductItem, IProductResponse } from '../../interfaces/product/item';
import { LinkIcon } from '../../components/icons';
import { MainLayout } from '../../components/layouts/Layout';

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
    product && (
      <MainLayout pageTitle={product.title}>
        <div className="px-2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="xs:w-54 sm:w-72 md:w-96 relative my-4">
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
              <h5 className="text-center font-bold text-white">쇼핑하러가기</h5>
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
      </MainLayout>
    )
  );
};

export default ProductPage;
