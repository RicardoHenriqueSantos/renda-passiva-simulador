export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#22C55E] text-white px-4 py-2 rounded hover:bg-green-700 transition"
    >
      {children}
    </button>
  );
}
