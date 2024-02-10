import SearchIcon from "./SearchIcon";
import SearchInput from "./SearchInput";

const Search = () => {
  return (
    <div className="flex items-center gap-2 border-solid focus-within:border-orange-400 border-[2px] rounded-full p-[8px] min-w-[240px]">
      <SearchIcon />
      <SearchInput />
    </div>
  );
};

export default Search;
