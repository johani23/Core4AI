export default function CorePanel({ children, className = "" }) {
  return (
    <div
      className={`
        relative
        border border-white/10
        rounded-2xl
        p-6
        overflow-hidden
        ${className}
      `}
      style={{
        backgroundColor: "rgba(20,20,22,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}
