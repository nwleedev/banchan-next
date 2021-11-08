const CopyMessage = () => (
  <div className="fixed top-0 right-0 m-5">
    <div className="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
      <div className="text-green-500 rounded-full bg-white mr-3">
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 16 16"
          className="bi bi-check"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
          />
        </svg>
      </div>
      <div className="text-white max-w-xs ">링크가 복사되었습니다.</div>
    </div>
  </div>
);

export default CopyMessage;
