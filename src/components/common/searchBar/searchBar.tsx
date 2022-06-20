import "./searchBar.css";

const SearchBar = ({
  onChange,
}: {
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}) => (
  <input
    className="search-bar"
    type="text"
    placeholder="... کوریر رو بگرد"
    onChange={onChange}
  />
);

export default SearchBar;
