import { NextResponse } from 'next/server';

// Knowledge Base
const knowledgeBase = [
    {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: "Hello! I'm your FitAI assistant. I can help you with workout plans, nutrition advice, or motivation. What's on your mind?"
    },
    {
        keywords: ['indian', 'desi', 'roti', 'dal', 'rice'],
        response: "Indian diets are great for fitness! For weight loss, focus on Dal, Sabzi, and Roti (multigrain). Avoid excessive oil and sugar. For muscle gain, increase protein with Paneer, Soya Chunks, Chicken, and Eggs alongside Rice or Roti."
    },
    {
        keywords: ['vegetarian', 'veg', 'protein veg'],
        response: "Top vegetarian protein sources include Paneer, Soya Chunks, Tofu, Lentils (Dal), Chickpeas (Chana), Greek Yogurt, and Whey Protein. You can easily hit your protein goals with these!"
    },
    {
        keywords: ['weight loss', 'lose weight', 'fat loss', 'burn fat', 'slimming', 'cut'],
        response: "To lose weight, you need a calorie deficit. Try our 'Indian Weight Loss' plan! Eat high-protein meals like Moong Dal and Paneer to stay full. Combine this with HIIT workouts to burn more calories."
    },
    {
        keywords: ['muscle', 'gain', 'build', 'hypertrophy', 'bulk', 'size'],
        response: "Building muscle requires a calorie surplus and progressive overload. Eat protein-rich foods like Chicken, Eggs, or Soya every 3-4 hours. Focus on compound lifts like Squats and Deadlifts."
    },
    {
        keywords: ['belly fat', 'stomach', 'abs'],
        response: "You can't spot-reduce belly fat, but a calorie deficit will reduce overall body fat. Core exercises like Planks and Russian Twists will strengthen your abs, making them visible as you lose fat."
    },
    {
        keywords: ['diet', 'nutrition', 'food', 'eat', 'meal', 'breakfast', 'lunch', 'dinner'],
        response: "Nutrition is key! Focus on whole foods. For breakfast, try Poha with peanuts or Eggs. Lunch can be Roti/Rice with Dal and Sabzi. Dinner should be lighter, like Grilled Paneer or Chicken Salad."
    },
    {
        keywords: ['water', 'hydration', 'drink'],
        response: "Stay hydrated! Aim for 3-4 liters of water daily. It helps with metabolism, muscle recovery, and energy levels. Drink a glass of water before meals to help with portion control."
    },
    {
        keywords: ['supplements', 'creatine', 'whey', 'bcaa'],
        response: "Supplements are helpful but not magic. Whey Protein is great for hitting protein goals. Creatine Monohydrate (3-5g/day) is excellent for strength and muscle performance. Focus on real food first!"
    },
    {
        keywords: ['squat', 'legs', 'quads'],
        response: "Squats are the king of exercises! Keep your back straight, chest up, and drive through your heels. Go deep (thighs parallel to floor) for maximum benefit."
    },
    {
        keywords: ['bench press', 'chest', 'push'],
        response: "For a big chest, focus on Bench Press. Retract your shoulder blades, arch slightly, and control the weight on the way down. Don't bounce the bar off your chest!"
    },
    {
        keywords: ['deadlift', 'back', 'pull'],
        response: "Deadlifts build the whole back chain. Keep the bar close to your legs, keep your spine neutral, and lift with your legs and hips, not just your lower back."
    },
    {
        keywords: ['cardio', 'running', 'treadmill'],
        response: "Cardio is great for heart health and burning calories. For fat loss, try HIIT (sprints). For endurance, steady-state running or cycling is best. Do cardio AFTER weights for muscle preservation."
    },
    {
        keywords: ['rest', 'sleep', 'recovery'],
        response: "Muscles grow while you sleep! Aim for 7-9 hours of quality sleep. Overtraining can stall progress, so take at least 1-2 rest days per week."
    },
    {
        keywords: ['motivation', 'tired', 'give up', 'hard'],
        response: "Consistency > Intensity. Even a bad workout is better than no workout. Remember why you started! You're building a better version of yourself."
    },
    {
        keywords: ['features', 'app', 'website'],
        response: "This app offers AI-generated Indian diet plans, workout schedules, progress tracking, and a 3D muscle map. Check your Dashboard for your personalized plan!"
    }
];

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const lowerMsg = message.toLowerCase();

        // Scoring System
        let bestMatch = { index: -1, score: 0 };

        knowledgeBase.forEach((entry, idx) => {
            let score = 0;
            entry.keywords.forEach(keyword => {
                if (lowerMsg.includes(keyword)) {
                    score += 1;
                }
            });
            if (score > bestMatch.score) {
                bestMatch = { index: idx, score: score };
            }
        });

        let reply = "I'm not sure about that specific topic yet. Try asking about workouts, specific exercises (like squats), nutrition, or weight loss tips!";

        if (bestMatch.score > 0) {
            reply = knowledgeBase[bestMatch.index].response;
        }

        return NextResponse.json({ reply });
    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server Error' }, { status: 500 });
    }
}
