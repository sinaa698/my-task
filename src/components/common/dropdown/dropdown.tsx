import "./dropdown.css";

const Dropdown = ({
  value,
  label,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: any;
}) => (
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

export default Dropdown;
