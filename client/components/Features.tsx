'use client';

import { useState } from 'react';
import { Activity, Utensils, Brain, TrendingUp, Zap, Users, MessageCircle, Moon } from 'lucide-react';

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            title: "AI-Powered Plans",
            description: "Workouts that adapt to your progress.",
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            color: "from-purple-500/20 to-blue-500/20",
            border: "group-hover:border-purple-500/50",
            detail: "Our advanced ML algorithms analyze your performance after every session to adjust weights, sets, and reps for optimal growth.",
            link: "/dashboard"
        },
        {
            title: "Smart Nutrition",
            description: "Macros calculated for your specific metabolism.",
            icon: <Utensils className="w-6 h-6 text-green-400" />,
            color: "from-green-500/20 to-emerald-500/20",
            border: "group-hover:border-green-500/50",
            detail: "Get precise calorie and macro targets. We generate full meal plans including breakfast, lunch, dinner, and snacks.",
            link: "/nutrition"
        },
        {
            title: "Progress Tracking",
            description: "Visualize your journey with real-time stats.",
            icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
            color: "from-orange-500/20 to-red-500/20",
            border: "group-hover:border-orange-500/50",
            detail: "Track every rep and meal. See your consistency streak and weight trends on beautiful interactive charts.",
            link: "/progress"
        },
        {
            title: "Wearable Sync",
            description: "Connect Apple Health & Fitbit seamlessly.",
            icon: <Activity className="w-6 h-6 text-red-400" />,
            color: "from-red-500/20 to-pink-500/20",
            border: "group-hover:border-red-500/50",
            detail: "Automatically import your steps, heart rate, and sleep data to fine-tune your recovery recommendations.",
            link: "/wearables"
        },
        {
            title: "Expert Chat",
            description: "24/7 access to AI and human coaches.",
            icon: <MessageCircle className="w-6 h-6 text-indigo-400" />,
            color: "from-indigo-500/20 to-blue-500/20",
            border: "group-hover:border-indigo-500/50",
            detail: "Have a question about form? Need a substitution? Chat instantly with our expert bot or book a human trainer.",
            link: "/contact"
        },
        {
            title: "Sleep Analysis",
            description: "Optimize recovery for maximum gains.",
            icon: <Moon className="w-6 h-6 text-teal-400" />,
            color: "from-teal-500/20 to-cyan-500/20",
            border: "group-hover:border-teal-500/50",
            detail: "We analyze your sleep quality to recommend rest days or lighter sessions when your body needs recovery.",
            link: "/sleep"
        }
    ];

    return (
        <section id="features" className="py-32 bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">evolve</span>.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        FitAI isn't just a workout app. It's a complete ecosystem designed to optimize every aspect of your health, from training to nutrition to recovery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-3xl bg-zinc-900/50 border border-gray-800 hover:bg-zinc-900 transition-all duration-500 cursor-pointer overflow-hidden ${feature.border}`}
                            onMouseEnter={() => setActiveFeature(index)}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 border border-gray-800 group-hover:border-gray-700 transition-colors shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                                <div className={`h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100`}>
                                    <p className="text-xs text-gray-500 pt-4 border-t border-gray-800/50 mb-4">
                                        {feature.detail}
                                    </p>
                                    <a href={feature.link} className="inline-block px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
                                        Try it now
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
