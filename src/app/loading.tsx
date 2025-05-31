export default function Loading() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full animate-spin"></div>
      <div className="absolute inset-2 bg-white rounded-full"></div>
      <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
        </div>
  );
}
