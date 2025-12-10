export default function LoadingAnimation({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-stone-800 font-semibold text-lg">{message}</p>
      </div>
    </div>
  )
}

