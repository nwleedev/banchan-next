import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const keyword = context.params?.keyword;
  if (typeof keyword !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const TagSearch = () => {};

export default TagSearch;
