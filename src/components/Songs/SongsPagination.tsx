interface SongsPaginationProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}

const SongsPagination = ({ count, setCount, length }: SongsPaginationProps) => {
  return (
    <div className="flex gap-2 pb-5">
      <button
        onClick={() => setCount((prev) => prev - 10)}
        disabled={count === 10}
        className="disabled:opacity-20"
      >
        {"<"}
      </button>
      <div>
        {count / 10} / {Math.ceil(length / 10)}
      </div>
      <button
        onClick={() => setCount((prev) => prev + 10)}
        disabled={count / 10 === Math.ceil(length / 10)}
        className="disabled:opacity-20"
      >
        {">"}
      </button>
    </div>
  );
};

export default SongsPagination;
