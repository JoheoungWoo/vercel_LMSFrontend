export const createButton = ({ label, style, onClick, size="90%" }) => (
  <button
    onClick={onClick}
    style={{ width: size }}
    className={`w-[${size}] text-white font-semibold py-2 rounded-lg transition ${style}`}
  >
    {label}
  </button>
);
