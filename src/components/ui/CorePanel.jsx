export default function CorePanel({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/5
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        p-6
        ${className}
      `}
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      {children}
    </div>
  );
}
