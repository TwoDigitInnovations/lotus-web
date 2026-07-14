export default function EmptyState({ message = "No data available yet.", variant = "dark", className = "" }) {
  const light = variant === "light";
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 text-center ${className}`}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${light ? "bg-white/15" : "bg-slate-100"}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={light ? "text-white/70" : "text-slate-400"}
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 7l2.5-4h13L21 7" />
          <path d="M9 11h6" />
        </svg>
      </div>
      <p className={`text-sm ${light ? "text-white/70" : "text-gray-400"}`}>{message}</p>
    </div>
  );
}
