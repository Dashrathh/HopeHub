import { LuHeart, LuUsers, LuGlobe } from 'react-icons/lu';

export default function DonationHero  ()  {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container m-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in">
            <LuHeart className="w-5 h-5 text-pink-300 animate-pulse" />
            <span className="text-sm font-medium">Make a Difference Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Change Lives with Your
            <span className="block text-yellow-300">Generosity</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto animate-fade-in delay-150">
            Every donation, no matter the size, creates ripples of hope and transforms communities around the world.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 animate-scale-in delay-300">
              <LuUsers className="w-8 h-8 text-blue-300" />
              <div className="text-left">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/70">Lives Impacted</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 animate-scale-in delay-500">
              <LuGlobe className="w-8 h-8 text-green-300" />
              <div className="text-left">
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm text-white/70">Countries Reached</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
