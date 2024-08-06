import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src="/path-to-profile-image.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Welcome Message */}
      <div className="mb-6">
        <p className="text-gray-600">Hi Mr. Michael,</p>
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search burger, pizza, drink or ect..." 
          className="w-full py-3 px-4 pr-10 rounded-lg bg-white text-sm"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Drink Category */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Drink Category</h2>
          <Link to="/categories" className="text-orange-500 text-sm">See All</Link>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 rounded-full text-sm bg-gray-200 text-gray-700">All</button>
          <button className="px-4 py-2 rounded-full text-sm bg-orange-500 text-white">🍺 Beer</button>
          <button className="px-4 py-2 rounded-full text-sm bg-gray-200 text-gray-700">🍷 Wine</button>
        </div>
      </div>

      {/* Popular */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Popular</h2>
          <Link to="/popular" className="text-orange-500 text-sm">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['Modelo Especial', 'Miller Lite', 'Corona Premier', 'Budweiser'].map((beer, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow">
              <img src={`/path-to-${beer.toLowerCase().replace(' ', '-')}-image.jpg`} alt={beer} className="w-full h-32 object-contain mb-2" />
              <h3 className="font-semibold">{beer}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${index === 0 ? '28.65' : '12.45'}</span>
                <button className="bg-orange-500 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        <Link to="/home" className="text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <Link to="/menu" className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Link>
        <Link to="/cart" className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </Link>
        <Link to="/settings" className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}

export default Home;