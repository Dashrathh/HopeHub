import { LuQuote, LuStar } from "react-icons/lu";

export default function TestimonialList() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Regular Donor",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "Seeing the direct impact of my donations through their updates fills my heart with joy. It's amazing how much difference we can make together.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Monthly Supporter",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            content: "The transparency and regular communication from this organization is outstanding. I know exactly where my money is going and how it's helping.",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Corporate Partner",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            content: "Our company has been partnering with them for years. Their professionalism and genuine care for their mission is truly inspiring.",
            rating: 5
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-white to-gray-50 w-full h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Stories of Impact
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Hear from our community about the difference we're making together
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.name}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border border-gray-100"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Quote icon */}
                            <div className="absolute -top-4 left-8">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-3">
                                    <LuQuote className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6 mt-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <LuStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                                />
                                <div>
                                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
