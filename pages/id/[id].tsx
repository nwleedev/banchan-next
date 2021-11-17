import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IProductItem, IProductResponse } from '../../interfaces/product/item';
import { LinkIcon } from '../../components/icons';
import { MainLayout } from '../../components/layouts/Layout';
import { Doughnut } from 'react-chartjs-2';

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
      <MainLayout
        pageTitle={product.title}
        url={product.landing_url}
        image={product.thumbnail}
      >
        <div className="px-2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="xs:w-54 sm:w-72 md:w-96 relative my-4">
            <img
              src={product.thumbnail}
              alt={product.title}
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
                <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
              </h5>
            ))}
          </div>
          <h6 className="text-sm font-light my-2">
            태그를 눌러 태그 별 상품 페이지로 이동할 수 있습니다.
          </h6>
          <h3 className="text-md font-semibold mt-6 mb-2">
            사용자 리뷰: {product.review}개
          </h3>
          <div
            style={{ width: '100%', maxWidth: '600px' }}
            className="mt-2 mb-6"
          >
            {product && product.ratio && product.ratio.length === 5 && (
              <Doughnut
                data={{
                  labels: ['최고예요', '좋아요', '보통', '좀 그래요', '싫어요'],
                  datasets: [
                    {
                      data: product.ratio,
                      backgroundColor: [
                        '#ee6f85',
                        '#fd7f15',
                        '#fec106',
                        '#40d6a7',
                        '#527abe',
                      ],
                    },
                  ],
                }}
              />
            )}
          </div>
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
