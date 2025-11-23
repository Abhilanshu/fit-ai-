'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Utensils, ChevronRight, Check } from 'lucide-react';
import api from '@/lib/api';

export default function Nutrition() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        bodyType: '',
        height: '',
        weight: '',
        allergies: [] as string[],
        preferences: [] as string[],
    });

    const bodyTypes = [
        { id: 'ectomorph', name: 'Ectomorph', desc: 'Lean and long, difficulty building muscle.' },
        { id: 'mesomorph', name: 'Mesomorph', desc: 'Muscular and well-built, high metabolism.' },
        { id: 'endomorph', name: 'Endomorph', desc: 'Big, high body fat, often pear-shaped.' },
    ];

    const allergiesList = ['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs', 'Soy'];
    const preferencesList = ['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'High Protein', 'Low Carb'];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const toggleSelection = (field: 'allergies' | 'preferences', item: string) => {
        setFormData(prev => {
            const list = prev[field];
            if (list.includes(item)) {
                return { ...prev, [field]: list.filter(i => i !== item) };
            } else {
                return { ...prev, [field]: [...list, item] };
            }
        });
    };

    const calculateBMI = () => {
        if (formData.height && formData.weight) {
            const h = parseFloat(formData.height) / 100;
            const w = parseFloat(formData.weight);
            return (w / (h * h)).toFixed(1);
        }
        return '--';
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // In a real app, we would send this specific nutrition data
            // For now, we'll trigger the generic plan generation which uses the core profile
            // But we can simulate "saving" these preferences
            console.log('Generating nutrition plan with:', formData);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Call the generate endpoint (re-using existing logic for now)
            await api.post('/plan/generate');

            router.push('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <Utensils className="text-green-500" size={40} />
                        Smart Nutrition
                    </h1>
                    <p className="text-gray-400">Let's build a meal plan that fits your biology.</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 h-2 rounded-full mb-12">
                    <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800 min-h-[400px] flex flex-col justify-between">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                            <h2 className="text-2xl font-bold">Basic Metrics</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Age</label>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-green-500 outline-none"
                                        placeholder="25"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">BMI (Auto)</label>
                                    <div className="w-full bg-gray-800 rounded-lg px-4 py-3 text-gray-400">
                                        {calculateBMI()}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-green-500 outline-none"
                                        placeholder="175"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-green-500 outline-none"
                                        placeholder="70"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
                            <h2 className="text-2xl font-bold">Body Type</h2>
                            <div className="space-y-4">
                                {bodyTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        onClick={() => setFormData({ ...formData, bodyType: type.id })}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.bodyType === type.id
                                                ? 'bg-green-500/10 border-green-500'
                                                : 'bg-black border-gray-800 hover:border-gray-600'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">{type.name}</h3>
                                            {formData.bodyType === type.id && <Check className="text-green-500" />}
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1">{type.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Dietary Preferences</h2>
                                <div className="flex flex-wrap gap-3">
                                    {preferencesList.map((pref) => (
                                        <button
                                            key={pref}
                                            onClick={() => toggleSelection('preferences', pref)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.preferences.includes(pref)
                                                    ? 'bg-green-500 text-black'
                                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                }`}
                                        >
                                            {pref}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">Allergies / Restrictions</h2>
                                <div className="flex flex-wrap gap-3">
                                    {allergiesList.map((allergy) => (
                                        <button
                                            key={allergy}
                                            onClick={() => toggleSelection('allergies', allergy)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.allergies.includes(allergy)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                }`}
                                        >
                                            {allergy}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                        <button
                            onClick={handleBack}
                            disabled={step === 1}
                            className={`px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-800'
                                }`}
                        >
                            Back
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-8 py-3 bg-green-500 text-black rounded-xl font-bold hover:bg-green-400 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'Generating...' : 'Generate Plan'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
