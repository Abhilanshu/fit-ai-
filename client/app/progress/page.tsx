'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Trophy, Flame } from 'lucide-react';
import api from '@/lib/api';

export default function Progress() {
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalWorkouts: 0,
        streak: 0,
        totalMinutes: 0,
        xp: 0
    });

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get('/plan');
                // Mocking history data processing from the plan structure
                // In a real app, we'd have a dedicated /history endpoint
                if (res.data.progress) {
                    const processedHistory = res.data.progress.map((p: any) => ({
                        date: new Date(p.date).toLocaleDateString(),
                        exercises: p.completed_exercises.length,
                        xp: p.completed_exercises.length * 10
                    }));
                    setHistory(processedHistory);

                    const totalXP = processedHistory.reduce((acc: number, curr: any) => acc + curr.xp, 0);
                    setStats({
                        totalWorkouts: processedHistory.length,
                        streak: 3, // Mock streak
                        totalMinutes: processedHistory.length * 45, // Mock duration
                        xp: totalXP
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                    <TrendingUp className="text-orange-500" size={40} />
                    Progress Tracking
                </h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                            <Trophy size={16} className="text-yellow-500" /> Total XP
                        </div>
                        <div className="text-2xl font-bold">{stats.xp}</div>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                            <Flame size={16} className="text-orange-500" /> Streak
                        </div>
                        <div className="text-2xl font-bold">{stats.streak} Days</div>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                            <Calendar size={16} className="text-blue-500" /> Workouts
                        </div>
                        <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
                    </div>
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                        <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                            <TrendingUp size={16} className="text-green-500" /> Minutes
                        </div>
                        <div className="text-2xl font-bold">{stats.totalMinutes}</div>
                    </div>
                </div>

                {/* History List */}
                <div className="bg-zinc-900 rounded-3xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold">Workout History</h3>
                        <button className="text-sm text-blue-500 hover:text-blue-400">View All</button>
                    </div>
                    <div className="divide-y divide-gray-800">
                        {history.length > 0 ? (
                            history.map((item, idx) => (
                                <div key={idx} className="p-6 flex items-center justify-between hover:bg-black/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-orange-500/10 p-3 rounded-full text-orange-500">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">Workout Completed</div>
                                            <div className="text-sm text-gray-400">{item.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-500">+{item.xp} XP</div>
                                        <div className="text-sm text-gray-400">{item.exercises} Exercises</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                No workout history yet. Start your first workout in the Dashboard!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
