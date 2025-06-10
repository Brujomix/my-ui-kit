type SelectProps = React.InputHTMLAttributes<HTMLSelectElement>

type SelectInputProps<T> = {
  data: T[]
  label: string
  labelKey: keyof T
  valueKey: keyof T
  className?: string
} & SelectProps

export function Select_Input<T extends object>({
  className = "",
  data,
  label,
  valueKey,
  labelKey,
  ...props
}: SelectInputProps<T>) {
  return (
    <div className="grid gap-2">
      <label>{label}</label>
      <select
        className={`px-4 py-2 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
        {...props}
      >
        {data.map((obj) => (
          <option key={String(obj[valueKey])} value={String(obj[valueKey])}>
            {String(obj[labelKey])}
          </option>
        ))}
      </select>
    </div>
  );
}