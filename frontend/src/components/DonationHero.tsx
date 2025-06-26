import { LuHeart, LuUsers, LuGlobe } from 'react-icons/lu';

export default function DonationHero() {
    return (
        <div className="relative overflow-hidden w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-white">
            {/* Geometric pattern overlay for dark mode */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Floating animated elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse [animation-duration:3s]"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-300/20 rounded-full animate-bounce [animation-duration:4s]"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-300/15 rounded-full animate-ping [animation-duration:2s]"></div>
                <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-rose-300/20 rounded-full animate-pulse [animation-duration:5s]"></div>

                {/* Floating shapes */}
                <div className="absolute top-1/3 right-1/5 w-12 h-12 bg-white/5 rotate-45 animate-spin [animation-duration:25s]"></div>
                <div className="absolute bottom-1/3 left-1/5 w-8 h-8 bg-pink-200/10 rotate-12 animate-spin [animation-duration:20s] [animation-direction:reverse]"></div>

                {/* Additional floating elements */}
                <div className="absolute top-1/6 left-2/3 w-6 h-6 bg-purple-200/15 rounded-full animate-bounce [animation-duration:6s]"></div>
                <div className="absolute bottom-1/6 right-2/3 w-10 h-10 bg-rose-200/10 rounded-full animate-pulse [animation-duration:4s]"></div>
            </div>

            <div className="relative container mx-auto px-6 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in hover:bg-white/30 transition-all duration-300">
                        <LuHeart className="w-5 h-5 text-pink-300 animate-pulse" />
                        <span className="text-sm font-medium">Make a Difference Today</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                        Change Lives with Your
                        <span className="block text-yellow-300 animate-pulse">Generosity</span>
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto animate-fade-in delay-150">
                        Every donation, no matter the size, creates ripples of hope and transforms communities around the world.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 animate-scale-in delay-300 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                            <LuUsers className="w-8 h-8 text-pink-300 animate-pulse delay-200" />
                            <div className="text-left">
                                <div className="text-2xl font-bold">50K+</div>
                                <div className="text-sm text-white/70">Lives Impacted</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 animate-scale-in delay-500 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                            <LuGlobe className="w-8 h-8 text-purple-300 animate-pulse delay-500" />
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