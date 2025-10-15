export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
      </div>

      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>

      <div className="flex gap-2 justify-center mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
