export default function DateTimePicker({ label, value, onChange, name, className }) {
  return (
    <div className={`${className} w-full`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded text-sm sm:text-base"
      />
    </div>
  );
}
