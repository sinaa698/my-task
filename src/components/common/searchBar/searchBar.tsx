import "./searchBar.css";

const SearchBar = ({
  onChange,
}: {
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="... بگرد"
      onChange={onChange}
    />
  );
};

export default SearchBar;
