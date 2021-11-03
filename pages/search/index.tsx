import { useRouter } from 'next/router';
import { useState } from 'react';
import { SearchIcon } from '../../components/icons';
import { MainLayout } from '../../components/layouts/Layout';
import { ISearch } from '../../interfaces/search';

const ProductSearch = () => {
  const [value, setValue] = useState<ISearch>({
    keyword: '',
    type: 'keyword',
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search/${value.keyword}`);
  };

  return (
    <MainLayout>
      <form
        onSubmit={handleSubmit}
        className="flex relative mx-auto items-center my-4 sticky top-0 z-50 rounded-md border-2 bg-gray-200 transition p-1"
      >
        <select
          name="type"
          className="py-2 text-sm font-semibold pl-2 pr-1"
          value={value.type}
          onChange={(e) => {
            e.preventDefault();
            setValue({
              ...value,
              type: e.currentTarget.value === 'keyword' ? 'keyword' : 'tag',
            });
          }}
        >
          <option value="keyword" className="text-sm font-semibold">
            키워드
          </option>
          {/* <option value="tag" className="text-sm font-semibold">
            태그
          </option> */}
        </select>
        <input
          className="transition py-2 pl-3 pr-12 focus:outline-none w-full text-black text-sm"
          type="search"
          name="search"
          placeholder="검색어 입력"
          value={value.keyword}
          onChange={(e) => {
            e.preventDefault();
            setValue({
              ...value,
              keyword: e.target.value,
            });
          }}
        />
        <button type="submit" className="absolute right-2 mr-2">
          <SearchIcon />
        </button>
      </form>
    </MainLayout>
  );
};

export default ProductSearch;
