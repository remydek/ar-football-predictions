export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-5"></div>
      <p className="text-white/60">Loading...</p>
    </div>
  );
};
