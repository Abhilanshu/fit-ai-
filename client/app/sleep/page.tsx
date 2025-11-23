'use client';

import { useState, useEffect } from 'react';
import { Moon, Clock, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Sleep() {
    const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const device = localStorage.getItem('connectedDevice');
        setConnectedDevice(device);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const sleepData = {
        totalSleep: '7h 42m',
        score: 85,
        stages: [
            { name: 'Deep', duration: '1h 30m', percent: 20, color: 'bg-indigo-600' },
            { name: 'Light', duration: '4h 15m', percent: 55, color: 'bg-blue-500' },
            { name: 'REM', duration: '1h 57m', percent: 25, color: 'bg-purple-500' },
        ],
        heartRateDip: '15%',
        restlessness: 'Low',
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                            <Moon className="text-teal-500" size={40} />
                            Sleep Analysis
                        </h1>
                        <p className="text-gray-400">Recovery is where the growth happens.</p>
                    </div>
                    {connectedDevice ? (
                        <div className="bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-500 text-sm font-bold">Synced with {connectedDevice}</span>
                        </div>
                    ) : (
                        <Link href="/wearables" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-bold transition-colors">
                            Connect Device
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-zinc-900 p-6 rounded-3xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="text-blue-500" size={20} />
                            <span className="text-gray-400 text-sm">Total Sleep</span>
                        </div>
                        <div className="text-3xl font-bold">{sleepData.totalSleep}</div>
                        <div className="text-sm text-green-500 mt-1">Within target range</div>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-3xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="text-yellow-500" size={20} />
                            <span className="text-gray-400 text-sm">Sleep Score</span>
                        </div>
                        <div className="text-3xl font-bold">{sleepData.score}</div>
                        <div className="text-sm text-gray-400 mt-1">Optimal recovery</div>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-3xl border border-gray-800">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="text-red-500" size={20} />
                            <span className="text-gray-400 text-sm">HR Dip</span>
                        </div>
                        <div className="text-3xl font-bold">{sleepData.heartRateDip}</div>
                        <div className="text-sm text-gray-400 mt-1">Good cardiovascular rest</div>
                    </div>
                </div>

                {/* Sleep Stages Chart */}
                <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800 mb-8">
                    <h3 className="text-xl font-bold mb-6">Sleep Stages</h3>
                    <div className="flex h-12 rounded-full overflow-hidden mb-4">
                        {sleepData.stages.map((stage, idx) => (
                            <div
                                key={idx}
                                className={`${stage.color} h-full flex items-center justify-center text-xs font-bold transition-all hover:opacity-90 cursor-pointer`}
                                style={{ width: `${stage.percent}%` }}
                                title={`${stage.name}: ${stage.duration}`}
                            >
                                {stage.percent}%
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between gap-4">
                        {sleepData.stages.map((stage, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                                <div>
                                    <div className="font-bold text-sm">{stage.name}</div>
                                    <div className="text-xs text-gray-400">{stage.duration}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights */}
                <div className="bg-gradient-to-br from-teal-900/20 to-blue-900/20 p-8 rounded-3xl border border-teal-500/30">
                    <h3 className="text-xl font-bold mb-4 text-teal-400">AI Recovery Insight</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Based on your deep sleep duration ({sleepData.stages[0].duration}), your physical recovery is excellent.
                        However, your REM sleep is slightly lower than average. Consider reducing screen time 1 hour before bed
                        to improve cognitive recovery. You are ready for a <span className="text-white font-bold">High Intensity</span> workout today.
                    </p>
                </div>
            </div>
        </div>
    );
}
