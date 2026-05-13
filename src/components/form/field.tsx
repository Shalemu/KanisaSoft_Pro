interface Props {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
}

export default function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full px-4 py-2 rounded-lg bg-[#2d314b] border border-gray-500"
      />
    </div>
  );
}