export const Card = ({ children, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-black/[0.37] rounded-2xl p-6 cursor-pointer shadow-lg transition-transform active:scale-[0.98] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
};
