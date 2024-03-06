export default function InputField({
  labelContent,
  id,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{labelContent}</label>
      <input
        type={type}
        name={id}
        id={id}
        className="focus:outline-none p-1"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
