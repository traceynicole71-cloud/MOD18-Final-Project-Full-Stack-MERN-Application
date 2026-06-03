export default function Spinner({ message = "Retrieving live streams..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff79c6]"></div>
      <p className="text-xs text-[#f8f8f2]/40 tracking-wider font-light">{message}</p>
    </div>
  );
}