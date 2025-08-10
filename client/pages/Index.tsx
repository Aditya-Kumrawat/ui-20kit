import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [selectedUser, setSelectedUser] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-start via-purple-900 to-purple-end relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-32 bg-gradient-to-b from-pink-400/40 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-24 bg-gradient-to-b from-purple-400/40 to-transparent transform -rotate-12"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-6xl w-full shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F7</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                Contact
              </Button>
              <Button className="rounded-full px-6 py-2 bg-gray-800 text-white hover:bg-gray-900">
                Menu
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">En</span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">Us</span>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Pink accent decoration */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-accent to-pink-400 rounded-full opacity-80"></div>
                <div className="absolute -top-2 left-8 w-4 h-4 bg-pink-300 rounded-full"></div>
              </div>

              {/* Main heading */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Unleash Your
                </h1>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Creativity<span className="text-gray-400">//</span>
                </h1>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-6">
                <Button className="bg-pink-button hover:bg-pink-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg">
                  Generate
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </span>
                  View the manual
                </Button>
              </div>

              {/* Description text */}
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-md">
                <p>
                  Our technology is based on advanced deep learning algorithms that bring incredible accuracy and creativity to the image creation process. Equipped with a large amount of data and the ability to adapt to a variety of styles and concepts.
                </p>
                <div className="flex items-center gap-6 text-xs text-gray-400">
                  <span className="hover:text-gray-600 cursor-pointer">How it works</span>
                  <span className="hover:text-gray-600 cursor-pointer">FAQ</span>
                </div>
              </div>
            </div>

            {/* Right content - 3D sphere and cards */}
            <div className="space-y-8">
              {/* 3D Sphere with metallic ribbons */}
              <div className="relative flex justify-center">
                <div className="w-80 h-80 relative">
                  {/* Main sphere */}
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-full shadow-2xl relative overflow-hidden">
                    {/* Metallic ribbon effects */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full h-6 bg-gradient-to-r from-pink-300/60 via-purple-300/80 to-pink-400/60 transform"
                          style={{
                            top: `${12 + i * 12}%`,
                            transform: `rotate(${i * 22.5}deg) translateY(${Math.sin(i) * 10}px)`,
                            borderRadius: '50px',
                          }}
                        ></div>
                      ))}
                    </div>
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full"></div>
                  </div>

                  {/* User avatars around sphere */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Add your own options</span>
                      <div className="flex -space-x-2">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-white cursor-pointer transition-all ${
                              selectedUser === i ? 'ring-2 ring-pink-400' : ''
                            }`}
                            style={{
                              backgroundColor: i === 0 ? '#8B5CF6' : i === 1 ? '#EC4899' : '#6366F1'
                            }}
                            onClick={() => setSelectedUser(i)}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Templates card */}
                <div className="bg-gray-900 text-white p-6 rounded-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2">Templates</h3>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-gray-900 text-xs">→</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                </div>

                {/* Design card */}
                <div className="bg-gray-100 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-2 text-gray-900">Design</h3>
                  <p className="text-xs text-gray-600 mb-3">Check out the gallery of our best works. How to combine different styles</p>
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">→</span>
                  </div>
                </div>

                {/* Interesting solutions card */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Interesting solutions</h3>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">→</span>
                    </div>
                  </div>
                  <div className="mt-4 h-16 bg-white/10 rounded-lg backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
