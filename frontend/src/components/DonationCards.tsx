import { useState } from 'react';
import { LuGift, LuHeart, LuSparkles, LuStar } from 'react-icons/lu';


export default function DonationCards() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [
    { amount: 25, impact: "Provides meals for 5 children", icon: LuHeart, color: "from-pink-500 to-rose-500" },
    { amount: 50, impact: "Sponsors education for 1 child", icon: LuStar, color: "from-purple-500 to-indigo-500" },
    { amount: 100, impact: "Supplies clean water for 10 families", icon: LuGift, color: "from-blue-500 to-cyan-500" },
    { amount: 250, impact: "Funds medical care for 5 patients", icon: LuSparkles, color: "from-emerald-500 to-teal-500" }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Choose Your Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select an amount that feels right for you. Every contribution makes a meaningful difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {predefinedAmounts.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = selectedAmount === item.amount;

            return (
              <div
                key={item.amount}
                onClick={() => setSelectedAmount(item.amount)}
                className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className={`relative bg-white/95 backdrop-blur-sm m-1 rounded-xl p-6 transition-all duration-300 ${isSelected ? 'ring-4 ring-blue-400 shadow-2xl' : 'hover:shadow-xl'
                  }`}>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">${item.amount}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.impact}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-scale-in">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Custom Amount</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                placeholder="Enter amount"
                className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <LuHeart className="w-6 h-6 group-hover:animate-pulse" />
            <span className="text-lg">Donate ${customAmount || selectedAmount}</span>
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Secure payment • 100% of your donation goes to the cause
          </p>
        </div>
      </div>
    </div>
  );
};