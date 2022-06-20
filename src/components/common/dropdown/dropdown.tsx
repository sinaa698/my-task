import { ReactFC } from "./../../../utils/types";
import "./dropdown.css";

const Dropdown: ReactFC<{
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
}> = ({ label, value, options, onChange }) => {
  return (
    <div className="drop-down">
      <label>
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="drop-down__label">{label}</span>
      </label>
    </div>
  );
};

export default Dropdown;
