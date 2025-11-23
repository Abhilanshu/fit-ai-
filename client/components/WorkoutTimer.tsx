'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Watch } from 'lucide-react';

export default function WorkoutTimer() {
    const [mode, setMode] = useState<'stopwatch' | 'timer'>('stopwatch');
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState(60); // Default 60s for timer
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (mode === 'timer') {
                        if (prevTime <= 0) {
                            setIsRunning(false);
                            return 0;
                        }
                        return prevTime - 1;
                    } else {
                        return prevTime + 1;
                    }
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, mode]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(mode === 'timer' ? initialTime : 0);
    };

    const toggleMode = () => {
        setIsRunning(false);
        const newMode = mode === 'stopwatch' ? 'timer' : 'stopwatch';
        setMode(newMode);
        setTime(newMode === 'timer' ? initialTime : 0);
    };

    const adjustTimer = (amount: number) => {
        if (mode === 'timer' && !isRunning) {
            const newTime = Math.max(0, initialTime + amount);
            setInitialTime(newTime);
            setTime(newTime);
        }
    };

    return (
        <div className="bg-zinc-900 rounded-2xl border border-gray-800 p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {mode === 'stopwatch' ? <Watch className="text-blue-500" /> : <Timer className="text-orange-500" />}
                    {mode === 'stopwatch' ? 'Stopwatch' : 'Timer'}
                </h3>
                <button
                    onClick={toggleMode}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors"
                >
                    Switch to {mode === 'stopwatch' ? 'Timer' : 'Stopwatch'}
                </button>
            </div>

            <div className="text-center mb-8">
                <div className={`text-6xl font-mono font-bold tracking-wider ${isRunning ? 'text-white' : 'text-gray-400'}`}>
                    {formatTime(time)}
                </div>
                {mode === 'timer' && !isRunning && (
                    <div className="flex justify-center gap-4 mt-4">
                        <button onClick={() => adjustTimer(-10)} className="text-gray-500 hover:text-white">-10s</button>
                        <button onClick={() => adjustTimer(10)} className="text-gray-500 hover:text-white">+10s</button>
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleReset}
                    className="p-4 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                >
                    <RotateCcw size={24} />
                </button>
                <button
                    onClick={handleStartPause}
                    className={`p-4 rounded-full text-white transition-all ${isRunning
                        ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                        }`}
                >
                    {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>
        </div>
    );
}
