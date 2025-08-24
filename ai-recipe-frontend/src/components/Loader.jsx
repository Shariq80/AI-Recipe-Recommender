import React from 'react'

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Creating Your Recipes</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Our AI chef is analyzing your ingredients and cooking up some delicious recipes just for you...
        </p>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
