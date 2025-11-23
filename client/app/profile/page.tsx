'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Save, RefreshCw, User, Activity, Ruler, Weight } from 'lucide-react';

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        fitness_goal: '',
        activity_level: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const res = await api.get('/user/profile');
                setFormData({
                    age: res.data.age || '',
                    gender: res.data.gender || 'male',
                    weight: res.data.weight || '',
                    height: res.data.height || '',
                    fitness_goal: res.data.fitness_goal || 'weight_loss',
                    activity_level: res.data.activity_level || 'sedentary'
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // 1. Update Profile
            await api.put('/user/profile', formData);

            // 2. Regenerate Plan
            await api.post('/plan/generate');

            // 3. Redirect
            router.push('/dashboard');
        } catch (err) {
            console.error('Failed to update profile', err);
            setSaving(false);
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
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
                    <User className="text-blue-500" size={40} />
                    Your Profile
                </h1>

                <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                                    <Weight size={16} /> Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                                    <Ruler size={16} /> Height (cm)
                                </label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                                <Activity size={16} /> Fitness Goal
                            </label>
                            <select
                                name="fitness_goal"
                                value={formData.fitness_goal}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="weight_loss">Weight Loss</option>
                                <option value="muscle_gain">Muscle Gain</option>
                                <option value="general_fitness">General Fitness</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Activity Level</label>
                            <select
                                name="activity_level"
                                value={formData.activity_level}
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="sedentary">Sedentary (Little to no exercise)</option>
                                <option value="lightly_active">Lightly Active (1-3 days/week)</option>
                                <option value="moderately_active">Moderately Active (3-5 days/week)</option>
                                <option value="very_active">Very Active (6-7 days/week)</option>
                                <option value="extra_active">Extra Active (Physical job or 2x training)</option>
                            </select>
                        </div>

                        <div className="pt-6 border-t border-gray-800">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <RefreshCw className="animate-spin" /> Regenerating Plan...
                                    </>
                                ) : (
                                    <>
                                        <Save /> Save & Regenerate Plan
                                    </>
                                )}
                            </button>
                            <p className="text-center text-gray-500 text-xs mt-4">
                                Updating your profile will automatically generate a new workout and diet plan tailored to your new goals.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
