'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Activity, Utensils, Calendar, TrendingUp, CheckCircle2, Circle, Target } from 'lucide-react';
import MuscleMap from '@/components/MuscleMap';
import WorkoutTimer from '@/components/WorkoutTimer';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [plan, setPlan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [completedExercises, setCompletedExercises] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const userRes = await api.get('/user/profile');
                setUser(userRes.data);

                const planRes = await api.get('/plan');
                setPlan(planRes.data);

                // Calculate progress for today
                if (planRes.data.progress) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const todayProgress = planRes.data.progress.find((p: any) => {
                        const pDate = new Date(p.date);
                        pDate.setHours(0, 0, 0, 0);
                        return pDate.getTime() === today.getTime();
                    });
                    if (todayProgress) {
                        setCompletedExercises(todayProgress.completed_exercises);
                    }
                }
            } catch (err) {
                console.error(err);
                // If no plan, redirect to generate? Or just show empty state
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    useEffect(() => {
        if (plan && plan.workout_plan && plan.workout_plan.exercises) {
            const total = plan.workout_plan.exercises.length;
            const completed = completedExercises.length;
            setProgress(Math.round((completed / total) * 100));
        }
    }, [completedExercises, plan]);

    const toggleExercise = async (exerciseName: string) => {
        const isCompleted = completedExercises.includes(exerciseName);
        let newCompleted;
        if (isCompleted) {
            newCompleted = completedExercises.filter(e => e !== exerciseName);
        } else {
            newCompleted = [...completedExercises, exerciseName];
        }
        setCompletedExercises(newCompleted);

        try {
            console.log(`Exercise ${exerciseName} marked as ${!isCompleted ? 'completed' : 'incomplete'}`);
            await api.post('/plan/progress', {
                exerciseName,
                completed: !isCompleted
            });
        } catch (err) {
            console.error('Failed to update progress', err);
            // Revert on error
            setCompletedExercises(completedExercises);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-blue-500">{user?.name}</span></h1>
                        <p className="text-gray-400">Here's your personalized plan for today.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => router.push('/')} className="px-6 py-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
                            Home
                        </button>
                        <button onClick={() => {
                            localStorage.removeItem('token');
                            router.push('/login');
                        }} className="px-6 py-2 bg-red-600/20 text-red-500 rounded-full hover:bg-red-600/30 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>

                {plan ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Stats & Workout */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Activity className="text-blue-500" size={20} />
                                        <span className="text-gray-400 text-sm">Daily Goal</span>
                                    </div>
                                    <div className="text-2xl font-bold">{plan.daily_calories} <span className="text-sm text-gray-500 font-normal">kcal</span></div>
                                </div>
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Utensils className="text-green-500" size={20} />
                                        <span className="text-gray-400 text-sm">Diet Type</span>
                                    </div>
                                    <div className="text-lg font-bold truncate" title={plan.diet_plan?.type}>
                                        {plan.diet_plan?.type?.split(' ')[0] || 'N/A'}...
                                    </div>
                                </div>
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-3 mb-2 relative z-10">
                                        <TrendingUp className="text-orange-500" size={20} />
                                        <span className="text-gray-400 text-sm">Level {Math.floor((completedExercises.length * 10) / 100) + 1}</span>
                                    </div>
                                    <div className="text-2xl font-bold relative z-10">{completedExercises.length * 10} <span className="text-sm text-gray-500 font-normal">XP</span></div>
                                    <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 relative z-10">
                                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(completedExercises.length * 10) % 100}%` }} />
                                    </div>
                                </div>
                                <div className="bg-zinc-900 p-6 rounded-2xl border border-gray-800">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="text-purple-500" size={20} />
                                        <span className="text-gray-400 text-sm">Plan</span>
                                    </div>
                                    <div className="text-lg font-bold">{plan.workout_plan?.frequency?.split(' ')[0] || '0'} Days</div>
                                </div>
                            </div>

                            {/* 3D Muscle Map */}
                            <div className="mb-8">
                                <MuscleMap />
                            </div>

                            {/* Workout Timer */}
                            <div className="mb-8">
                                <WorkoutTimer />
                            </div>

                            {/* Workout Section */}
                            <div className="bg-zinc-900 rounded-3xl border border-gray-800 overflow-hidden">
                                <div className="p-8 border-b border-gray-800 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">{plan.workout_plan.type}</h2>
                                        <p className="text-gray-400 text-sm">{plan.workout_plan.duration} • {plan.workout_plan.frequency}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold transition-colors">
                                        Start Session
                                    </button>
                                </div>
                                <div className="p-8">
                                    <div className="space-y-4">
                                        {plan.workout_plan?.exercises?.map((ex: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-black rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors group cursor-pointer" onClick={() => toggleExercise(ex.name)}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`transition-colors ${completedExercises.includes(ex.name) ? 'text-green-500' : 'text-gray-600 group-hover:text-blue-500'}`}>
                                                        {completedExercises.includes(ex.name) ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold text-lg ${completedExercises.includes(ex.name) ? 'text-gray-500 line-through' : 'text-white'}`}>{ex.name}</h4>
                                                        <p className="text-gray-400 text-sm">{ex.sets}</p>
                                                    </div>
                                                </div>
                                                {ex.video && (
                                                    <a
                                                        href={ex.video}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs bg-gray-800 hover:bg-red-600 hover:text-white px-3 py-1 rounded transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Watch Video
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Diet & Schedule */}
                        <div className="space-y-8">
                            {/* Nutrition Section */}
                            <div className="bg-zinc-900 rounded-3xl border border-gray-800 p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Utensils className="text-green-500" size={20} />
                                    Nutrition Plan
                                </h3>
                                <div className="space-y-6">
                                    {Array.isArray(plan.diet_plan?.meals) ? (
                                        plan.diet_plan.meals.map((meal: any, idx: number) => (
                                            <div key={idx} className="relative pl-6 border-l-2 border-gray-800">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-green-500" />
                                                <div className="mb-1 flex justify-between items-center">
                                                    <h4 className="font-bold text-white">{meal.name}</h4>
                                                    <span className="text-xs text-green-500 font-mono">{meal.calories} kcal</span>
                                                </div>
                                                <ul className="text-sm text-gray-400 space-y-1">
                                                    {meal.items?.map((item: string, i: number) => (
                                                        <li key={i}>• {item}</li>
                                                    ))}
                                                </ul>
                                                <div className="mt-2 text-xs text-blue-400 font-mono">Protein: {meal.protein}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">{plan.diet_plan?.description || 'No diet plan available.'}</p>
                                    )}
                                    {plan.diet_plan?.estimated_cost && (
                                        <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-400">
                                            <span className="font-bold text-white">Estimated Cost:</span> {plan.diet_plan.estimated_cost}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Weekly Schedule */}
                            <div className="bg-zinc-900 rounded-3xl border border-gray-800 p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Calendar className="text-purple-500" size={20} />
                                    Weekly Schedule
                                </h3>
                                {Array.isArray(plan.weekly_plan) ? (
                                    <div className="space-y-6">
                                        {plan.weekly_plan?.map((day: any, idx: number) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-12 font-bold text-gray-500 text-sm pt-1">{day.day?.substring(0, 3)}</div>
                                                <div>
                                                    <h4 className="font-bold text-white text-sm">{day.focus}</h4>
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{day.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">{typeof plan.weekly_plan === 'string' ? plan.weekly_plan : JSON.stringify(plan.weekly_plan)}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold mb-4">No plan found</h2>
                        <button onClick={() => router.push('/#generate')} className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700">
                            Generate Your First Plan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
