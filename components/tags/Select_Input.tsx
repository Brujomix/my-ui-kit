type SelectProps = React.InputHTMLAttributes<HTMLSelectElement>

type OptionItem = {
  k: string;
  v: string | number;
};

type SelectInputProps = {
    data : OptionItem[]
    label ?: string
    className ? : string
} & SelectProps

export function Select_Input({
  className = "",
  data,
  label,
  ...props
}: SelectInputProps) {
  return (
    <div className="grid gap-2">
    <label>{label}</label>
    <select
      className={`px-4 py-2 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
      {...props}
    >
      {data.map(({ k, v}, index) => (
        <option key={index} value={v}>
          {k}
        </option>
      ))}
    </select>
    </div>
  );
}