"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const lessonId = parseInt(params.lessonId as string);

  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Lesson 1 Content
  const lesson1Content = {
    title: "Lesson 1 – Listen & Discuss",
    topic: "Explore lifestyle habits and describe daily routines with confidence",
    steps: [
      {
        type: "intro",
        title: "🎯 Welcome to Lifestyles",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-10 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-4xl">
                  🌟
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-2">Discover Different Lifestyles</h2>
                  <p className="text-xl opacity-90">Meet 6 unique people and explore their daily habits</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <p className="font-semibold">Fitness</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🎮</div>
                  <p className="font-semibold">Gaming</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🥗</div>
                  <p className="font-semibold">Healthy Eating</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <p className="font-semibold">Tech Life</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <p className="font-semibold">Creative Arts</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <p className="font-semibold">Career Focus</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        type: "profiles",
        title: "👥 Meet The Characters",
        content: (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Arthur",
                  emoji: "💪",
                  tagline: "The Fitness Enthusiast",
                  gradient: "from-orange-400 to-red-500",
                  habits: [
                    { icon: "🏋️", text: "Works out regularly at the gym" },
                    { icon: "🏃", text: "Runs frequently to build stamina" },
                    { icon: "🎾", text: "Plays tennis twice a week" },
                    { icon: "🧗", text: "Goes rock climbing from time to time" }
                  ]
                },
                {
                  name: "John",
                  emoji: "🎮",
                  tagline: "The Puzzle Master",
                  gradient: "from-purple-400 to-indigo-500",
                  habits: [
                    { icon: "🚫", text: "Avoids most physical exercise" },
                    { icon: "🧩", text: "Enjoys challenging sudoku puzzles" },
                    { icon: "🎮", text: "Spends free time gaming" },
                    { icon: "📰", text: "Solves logic problems in magazines" }
                  ]
                },
                {
                  name: "Refaa",
                  emoji: "🥗",
                  tagline: "The Health Food Fanatic",
                  gradient: "from-green-400 to-emerald-500",
                  habits: [
                    { icon: "🥬", text: "Normally eats vegetarian meals" },
                    { icon: "🥩", text: "Hardly ever includes meat" },
                    { icon: "☕", text: "Never drinks coffee" },
                    { icon: "🍵", text: "Loves herbal tea - up to 6 cups daily" }
                  ]
                },
                {
                  name: "Josh",
                  emoji: "💻",
                  tagline: "The Internet Addict",
                  gradient: "from-blue-400 to-cyan-500",
                  habits: [
                    { icon: "⏱️", text: "Seldom spends less than 3 hours online" },
                    { icon: "💬", text: "Chats while checking messages" },
                    { icon: "📱", text: "Keeps multiple conversations going" },
                    { icon: "🌐", text: "Balances gaming, browsing & social media" }
                  ]
                },
                {
                  name: "Noura",
                  emoji: "🎨",
                  tagline: "The Artist in Training",
                  gradient: "from-pink-400 to-rose-500",
                  habits: [
                    { icon: "📚", text: "Completes homework after school" },
                    { icon: "🧹", text: "Helps with chores before art time" },
                    { icon: "🖌️", text: "Paints for at least 2 hours daily" },
                    { icon: "😊", text: "Says painting makes her happy" }
                  ]
                },
                {
                  name: "Martin",
                  emoji: "💼",
                  tagline: "The Career Focused",
                  gradient: "from-slate-400 to-gray-600",
                  habits: [
                    { icon: "💼", text: "Takes work home almost every night" },
                    { icon: "🏖️", text: "Rarely schedules vacation time" },
                    { icon: "⏰", text: "Committed to deadlines & clients" },
                    { icon: "📈", text: "Believes productivity is success" }
                  ]
                }
              ].map((profile) => (
                <div 
                  key={profile.name} 
                  className="group relative bg-white rounded-3xl p-6 shadow-xl border-2 border-transparent hover:border-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${profile.gradient} rounded-2xl text-3xl mb-4 shadow-lg`}>
                      {profile.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h3>
                    <p className="text-sm text-purple-600 font-semibold mb-4">{profile.tagline}</p>
                    <div className="space-y-3">
                      {profile.habits.map((habit, index) => (
                        <div key={index} className="flex items-start gap-3 group/item">
                          <span className="text-2xl flex-shrink-0 group-hover/item:scale-125 transition-transform">{habit.icon}</span>
                          <p className="text-gray-700 text-sm leading-relaxed">{habit.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "matching",
        title: "🎯 Interactive Matching Game",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
              <h4 className="text-xl font-bold text-gray-800 mb-2">🎮 Match the Person to Their Lifestyle!</h4>
              <p className="text-gray-700">Drag and drop each person to their correct description.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 mb-4">👤 People:</h4>
                {["Arthur", "John", "Refaa", "Josh", "Noura", "Martin"].map((name, index) => (
                  <div 
                    key={name}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 cursor-move hover:shadow-lg transition-all font-bold text-center"
                    draggable
                  >
                    {name}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 mb-4">📝 Descriptions:</h4>
                {[
                  "Works out at the gym regularly",
                  "Hates physical exercise, loves puzzles",
                  "Eats vegetarian meals, drinks herbal tea",
                  "Spends 3+ hours online daily",
                  "Paints for 2 hours every evening",
                  "Takes work home, rarely vacations"
                ].map((desc, index) => (
                  <div 
                    key={index}
                    className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[60px] flex items-center justify-center text-gray-700 hover:border-purple-400 transition-all"
                  >
                    {desc}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
              ✓ Check My Answers
            </button>
          </div>
        )
      },
      {
        type: "frequency_scale",
        title: "⏰ Frequency Ladder Challenge",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
              <h4 className="text-xl font-bold text-gray-800 mb-2">📊 Arrange Adverbs on the Frequency Scale</h4>
              <p className="text-gray-700">Drag each adverb to its correct position from 100% to 0%</p>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
              
              <div className="ml-12 space-y-4">
                {[
                  { percent: "100%", label: "Drop 'always' here", color: "from-green-400 to-green-600" },
                  { percent: "80%", label: "Drop 'usually' here", color: "from-lime-400 to-lime-600" },
                  { percent: "60%", label: "Drop 'often' here", color: "from-yellow-400 to-yellow-600" },
                  { percent: "40%", label: "Drop 'sometimes' here", color: "from-orange-400 to-orange-600" },
                  { percent: "20%", label: "Drop 'rarely' here", color: "from-red-400 to-red-600" },
                  { percent: "0%", label: "Drop 'never' here", color: "from-gray-400 to-gray-600" }
                ].map((slot, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-20 h-12 bg-gradient-to-r ${slot.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {slot.percent}
                    </div>
                    <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[60px] flex items-center justify-center text-gray-500 hover:border-purple-400 transition-all bg-white">
                      {slot.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
              {["always", "usually", "often", "sometimes", "rarely", "never"].map((adverb) => (
                <div 
                  key={adverb}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 cursor-move hover:shadow-xl transition-all font-bold text-center text-lg"
                  draggable
                >
                  {adverb}
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "quiz",
        title: "🎯 Quick Knowledge Check",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 border-2 border-indigo-200">
              <h4 className="text-xl font-bold text-gray-800 mb-2">🧠 Test Your Understanding</h4>
              <p className="text-gray-700">Choose the correct answer for each question</p>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "How often does Arthur go rock climbing?",
                  options: ["Twice a week", "From time to time", "Never"],
                  correct: "From time to time"
                },
                {
                  id: 2,
                  question: "How frequently does John exercise?",
                  options: ["He goes jogging every morning.", "He hates exercise and rarely does it.", "He lifts weights twice a week."],
                  correct: "He hates exercise and rarely does it."
                },
                {
                  id: 3,
                  question: "How often does Refaa eat meat?",
                  options: ["She eats meat every day.", "She hardly ever eats meat.", "She eats meat on weekends."],
                  correct: "She hardly ever eats meat."
                },
                {
                  id: 4,
                  question: "How long does Josh spend on the Internet each day?",
                  options: ["About one hour", "At least three hours", "Less than thirty minutes"],
                  correct: "At least three hours"
                },
                {
                  id: 5,
                  question: "How much time does Noura spend painting each evening?",
                  options: ["At least two hours", "About thirty minutes", "She only paints on weekends"],
                  correct: "At least two hours"
                },
                {
                  id: 6,
                  question: "How often does Martin take a vacation?",
                  options: ["He takes long vacations every month.", "He rarely takes a vacation.", "He never works on weekends."],
                  correct: "He rarely takes a vacation."
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "video_practice",
        title: "🎥 Audio Practice Studio",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-3xl">
                  🎤
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Practice Your Speaking</h3>
                  <p className="text-lg opacity-90">Listen and repeat to improve your pronunciation</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  character: "Arthur",
                  emoji: "💪",
                  color: "from-orange-400 to-red-500",
                  text: "I work out at the gym regularly. I run frequently, and I play tennis twice a week."
                },
                {
                  character: "Refaa",
                  emoji: "🥗",
                  color: "from-green-400 to-emerald-500",
                  text: "I normally eat vegetarian meals. I hardly ever eat meat. I never drink coffee."
                },
                {
                  character: "Josh",
                  emoji: "💻",
                  color: "from-blue-400 to-cyan-500",
                  text: "I seldom spend less than three hours a day on the computer. I often check my phone."
                },
                {
                  character: "Noura",
                  emoji: "🎨",
                  color: "from-pink-400 to-rose-500",
                  text: "After school, I always do my homework. Then I paint for at least two hours."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-purple-300 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {item.emoji}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{item.character}</h4>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <span>🔊</span>
                      <span>Listen</span>
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <span>🎤</span>
                      <span>Record</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-100 rounded-2xl p-6 border-2 border-yellow-300">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Pro Tip</span>
              </h4>
              <p className="text-gray-700">
                Pay attention to where the adverbs appear in each sentence. Notice the pronunciation of frequency words!
              </p>
            </div>
          </div>
        )
      }
    ]
  };

  // Lesson 2 Content
  const lesson2Content = {
    title: "Lesson 2 – Grammar & Frequency",
    topic: "Use the simple present and adverbs of frequency accurately",
    steps: [
      {
        type: "grammar",
        title: "🧠 Grammar Focus: Simple Present",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              We use the Simple Present to describe habits, routines, and facts. Review the core
              patterns before you practice.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                    <th className="p-4 text-left text-lg">Form</th>
                    <th className="p-4 text-left text-lg">Structure</th>
                    <th className="p-4 text-left text-lg">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b hover:bg-slate-50">
                    <td className="p-4 font-semibold">Affirmative</td>
                    <td className="p-4">Subject + base verb (+s/es for he/she/it)</td>
                    <td className="p-4">She <strong>drinks</strong> green tea every evening.</td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="p-4 font-semibold">Negative</td>
                    <td className="p-4">Subject + do/does not + base verb</td>
                    <td className="p-4">They <strong>do not</strong> skip breakfast.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-semibold">Question</td>
                    <td className="p-4">Do/Does + subject + base verb?</td>
                    <td className="p-4">Does he <strong>exercise</strong> before work?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>💡</span>Expert tip</h4>
              <p className="text-gray-700">
                Add <strong>s</strong> or <strong>es</strong> for he/she/it (<span className="font-semibold">she goes</span>,
                <span className="font-semibold">he watches</span>). Verbs ending in consonant + y change to <strong>ies</strong>
                (<span className="font-semibold">study → studies</span>).
              </p>
            </div>
          </div>
        )
      },
      {
        type: "table",
        title: "📊 Frequency Ladder",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Adverbs and expressions of frequency show how often something happens. Connect each one to
              a percentage range and sentence position.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <th className="p-4 text-left">Adverb / Expression</th>
                    <th className="p-4 text-left">Approximate Frequency</th>
                    <th className="p-4 text-left">Preferred Position</th>
                    <th className="p-4 text-left">Model Sentence</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    {
                      adverb: "always / all the time",
                      frequency: "100%",
                      position: "Before the main verb; after the verb be",
                      example: "Arthur is always ready for a new workout."
                    },
                    {
                      adverb: "usually / generally / normally / frequently",
                      frequency: "50% – 99%",
                      position: "Before the main verb",
                      example: "Refaa usually drinks herbal tea in the evening."
                    },
                    {
                      adverb: "sometimes / occasionally / from time to time",
                      frequency: "20% – 49%",
                      position: "Before the main verb or at the end",
                      example: "Arthur plays tennis twice a week and sometimes on Fridays."
                    },
                    {
                      adverb: "once in a while / now and then / hardly ever / seldom / rarely",
                      frequency: "1% – 19%",
                      position: "Before the main verb",
                      example: "John rarely chooses exercise over puzzles."
                    },
                    {
                      adverb: "never",
                      frequency: "0%",
                      position: "Before the main verb; after the verb be",
                      example: "Martin is never away from work for long."
                    }
                  ].map((row, index) => (
                    <tr key={row.adverb} className={`border-b hover:bg-slate-50 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-4 font-semibold text-purple-600">{row.adverb}</td>
                      <td className="p-4">{row.frequency}</td>
                      <td className="p-4">{row.position}</td>
                      <td className="p-4">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Connector tip</h4>
              <p className="text-gray-700">
                Time expressions such as <em>twice a week</em>, <em>every two months</em>, and <em>once in a while</em>
                usually come at the end of the sentence. They can also open a sentence for emphasis:
                <strong> "Sometimes, Hameed works late."</strong>
              </p>
            </div>
          </div>
        )
      },
      {
        type: "quiz",
        title: "🛠️ Guided Practice",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Rewrite each sentence using the cue in parentheses. Choose the best option.
            </p>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Jamal frequently exercises. (seldom)",
                  options: [
                    "Jamal seldom exercises.",
                    "Jamal seldom exercise.",
                    "Jamal is seldom exercising."
                  ],
                  correct: "Jamal seldom exercises."
                },
                {
                  id: 2,
                  question: "Ibrahim constantly talks on the phone. (rarely)",
                  options: [
                    "Ibrahim rarely talk on the phone.",
                    "Ibrahim rarely talks on the phone.",
                    "Ibrahim rarely talking on the phone."
                  ],
                  correct: "Ibrahim rarely talks on the phone."
                },
                {
                  id: 3,
                  question: "My brother occasionally checks his email. (often)",
                  options: [
                    "My brother often checks his email.",
                    "My brother often check his email.",
                    "My brother is often checking his email."
                  ],
                  correct: "My brother often checks his email."
                },
                {
                  id: 4,
                  question: "I sometimes surf on the Internet. (once in a while)",
                  options: [
                    "I once in a while surf on the Internet.",
                    "I surf on the Internet once in a while.",
                    "I am once in a while surfing on the Internet."
                  ],
                  correct: "I surf on the Internet once in a while."
                },
                {
                  id: 5,
                  question: "Qassim always arrives at work on time. (hardly ever)",
                  options: [
                    "Qassim hardly ever arrives at work on time.",
                    "Qassim hardly ever arrive at work on time.",
                    "Qassim hardly ever arriving at work on time."
                  ],
                  correct: "Qassim hardly ever arrives at work on time."
                },
                {
                  id: 6,
                  question: "Maha usually drinks tea instead of coffee. (from time to time)",
                  options: [
                    "Maha from time to time drinks tea instead of coffee.",
                    "Maha drinks tea instead of coffee from time to time.",
                    "Maha is from time to time drinking tea instead of coffee."
                  ],
                  correct: "Maha drinks tea instead of coffee from time to time."
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "questioning",
        title: "❓ Build Smart Questions",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use <strong>How often</strong>, <strong>How much</strong>, and <strong>How long</strong> to form questions
              about routines. Adapt the prompts, then ask a partner or record yourself answering.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { prompt: "use your cell phone", starter: "How often do you..." },
                { prompt: "spend time in the shower", starter: "How long do you..." },
                { prompt: "work on homework", starter: "How much time do you..." },
                { prompt: "exercise each week", starter: "How often do you..." },
                { prompt: "drink coffee or tea", starter: "How much do you..." },
                { prompt: "meet with friends", starter: "How often do you..." }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                  <p className="text-sm uppercase tracking-wide text-purple-500 font-semibold mb-2">Prompt {index + 1}</p>
                  <p className="text-gray-700 mb-3">{item.starter} {item.prompt}?</p>
                  <textarea
                    className="w-full h-24 rounded-xl border-2 border-purple-100 focus:border-purple-400 focus:outline-none p-3 text-sm"
                    placeholder="Example: How often do you use your cell phone? I use it about 20 times a day."
                  />
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "conversation",
        title: "🗣️ Conversation Studio",
        content: (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Majid &amp; Omar</h4>
              <div className="space-y-3 text-gray-700">
                <p><strong>Majid:</strong> How often do you go to the gym?</p>
                <p><strong>Omar:</strong> I work out every day, except weekends. I&apos;m a bit of an exercise freak.</p>
                <p><strong>Majid:</strong> Exercise turns me off.</p>
                <p><strong>Omar:</strong> Anyway, what are you doing now?</p>
                <p><strong>Majid:</strong> I&apos;m checking my email.</p>
                <p><strong>Omar:</strong> How much time do you spend on the Internet?</p>
                <p><strong>Majid:</strong> A lot. I take my smartphone with me wherever I go. My friends say my smartphone is really my best friend. You see, I can access the Internet almost everywhere.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-2xl p-6">
                <h5 className="font-bold text-gray-800 mb-3">Real Talk</h5>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>exercise freak</strong> = someone who exercises a lot</li>
                  <li><strong>turn (someone) off</strong> = does not interest at all</li>
                  <li><strong>anyway</strong> = used to change the topic</li>
                  <li><strong>you see</strong> = introduces an explanation</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6">
                <h5 className="font-bold text-gray-800 mb-3">Your Ending</h5>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {["I prefer to exercise my body, not my thumb.", "I only use my computer to send and receive email.", "I don’t have a cell phone. I don’t want people calling me all the time."]
                  .map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                  <li>Write your own creative ending.</li>
                </ul>
              </div>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "How often does Omar go to the gym?",
                  options: [
                    "He works out every day except weekends.",
                    "He only goes once a week.",
                    "He never goes because he is busy."
                  ],
                  correct: "He works out every day except weekends."
                },
                {
                  id: 2,
                  question: "Does exercise appeal to Majid?",
                  options: ["Yes, he loves it.", "No, it turns him off.", "He is unsure."],
                  correct: "No, it turns him off."
                },
                {
                  id: 3,
                  question: "How much time does Majid spend on the Internet?",
                  options: ["Very little", "A lot", "Only on weekends"],
                  correct: "A lot"
                },
                {
                  id: 4,
                  question: "Why can Majid check his email frequently?",
                  options: [
                    "Because he carries his smartphone everywhere.",
                    "Because he works at an Internet café.",
                    "Because he has a strict schedule."
                  ],
                  correct: "Because he carries his smartphone everywhere."
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      }
    ]
  };

  // Lesson 3 Content
  const lesson3Content = {
    title: "Lesson 3 – Reading & Analysis",
    topic: "Evaluate healthy and unhealthy lifestyle choices",
    steps: [
      {
        type: "reading",
        title: "📖 Reading: Do College Students Have a Healthy Lifestyle?",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Read the research summary and explore how diet, sleep, and exercise shape student health.
            </p>

            <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Diet Check</h3>
                <p className="text-gray-700 leading-relaxed">
                  The average student diet looks very different from a balanced diet. While a healthy plan includes
                  fresh produce, moderate protein, and whole grains, most students rely on rice, noodles, and fried
                  food. The findings suggest that they eat too much fast food and need more fruit and vegetables on
                  their plates.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Sleep &amp; Focus</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sleep is a powerful tool. When students in the study slept well, their exam scores climbed. On
                  average, though, many only slept about six hours a night, which hurt their concentration and memory.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Exercise &amp; Energy</h3>
                <p className="text-gray-700 leading-relaxed">
                  The exercise data was more positive. Most students worked out for at least thirty minutes a day.
                  Those who moved regularly reported feeling happier, more energetic, and better able to pay
                  attention in class.
                </p>
              </section>

              <section className="bg-emerald-50 rounded-2xl p-6">
                <h4 className="font-semibold text-emerald-600 mb-2">Key insight</h4>
                <p className="text-gray-700">
                  Busy schedules make it easy to ignore healthy habits, but smart time management helps students eat
                  well, sleep enough, and stay active—three ingredients for academic success.
                </p>
              </section>
            </div>
          </div>
        )
      },
      {
        type: "quiz",
        title: "✅ Reading Comprehension",
        content: (
          <div className="space-y-4">
            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "The writer thinks most college students already have perfect habits.",
                  options: ["True", "False"],
                  correct: "False"
                },
                {
                  id: 2,
                  question: "Most student diets lack enough fruit and vegetables.",
                  options: ["True", "False"],
                  correct: "True"
                },
                {
                  id: 3,
                  question: "Staying up late before an exam usually helps students score higher.",
                  options: ["True", "False"],
                  correct: "False"
                },
                {
                  id: 4,
                  question: "Most students in the study worked out for at least half an hour a day.",
                  options: ["True", "False"],
                  correct: "True"
                },
                {
                  id: 5,
                  question: "Better time management can support a healthier lifestyle.",
                  options: ["True", "False"],
                  correct: "True"
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "listening",
        title: "🎧 Listening Spotlight: Musa’s Story",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Imagine listening to Musa, a professional football player, talk about his lifestyle. Predict whether the
              following statements would be true or false based on the description.
            </p>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Musa comes from a modest background and is proud to represent his country.</li>
                <li>He spends quality time with family and supports people in need.</li>
                <li>He prefers comfortable clothing over fashionable outfits.</li>
                <li>He sometimes dislikes the constant attention from the media.</li>
              </ul>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Musa comes from a poor background.",
                  options: ["True", "False"],
                  correct: "True"
                },
                {
                  id: 2,
                  question: "He spends very little time with his family.",
                  options: ["True", "False"],
                  correct: "False"
                },
                {
                  id: 3,
                  question: "Musa is proud to play for his country.",
                  options: ["True", "False"],
                  correct: "True"
                },
                {
                  id: 4,
                  question: "He enjoys wearing fashionable clothes.",
                  options: ["True", "False"],
                  correct: "False"
                },
                {
                  id: 5,
                  question: "Musa supports people in need.",
                  options: ["True", "False"],
                  correct: "True"
                },
                {
                  id: 6,
                  question: "Musa loves the media following him everywhere.",
                  options: ["True", "False"],
                  correct: "False"
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "discussion",
        title: "💬 Discussion & Brainstorming",
        content: (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-800 mb-3">Discussion Prompts</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>What do you think of the study on college students’ habits?</li>
                  <li>How does your diet compare to the healthy and average diets described?</li>
                  <li>Does the amount of sleep you get affect your test scores?</li>
                  <li>Do you feel you exercise enough each week?</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-3">Brain Food</h4>
                <p className="text-gray-700 mb-3">
                  Studies show that certain foods boost memory: oily fish, leafy greens, berries, and dark chocolate.
                  What foods do you add to the list? Explain the benefits you know about.
                </p>
                <textarea
                  className="w-full h-32 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:outline-none p-3 text-sm"
                  placeholder="Write your ideas here..."
                />
              </div>
            </div>
          </div>
        )
      },
      {
        type: "writing",
        title: "✍️ Writing Corner: Cohesive Paragraphs",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Cohesion keeps writing smooth. Use pronouns and possessive adjectives to link ideas instead of repeating
              nouns.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3 text-gray-700">
              <p><strong>Example:</strong> Teenagers who play a sport say they often become friends with their teammates. <em>They</em> stay active together.</p>
              <p><strong>Example:</strong> Football is popular because it is fun. It has simple rules, so it is easy to learn.</p>
              <p><strong>Example:</strong> Playing a team sport is beneficial because it keeps young people in shape and teaches <em>them</em> about cooperation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-800 mb-3">Pronoun Practice</h4>
                <p className="text-gray-700 mb-3">Complete the sentences with appropriate pronouns.</p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Refaa loves herbal tea because ___ keeps her calm.</li>
                  <li>Arthur and Martin are busy, but ___ both schedule time for work.</li>
                  <li>Musa talks about his teammates because ___ inspire him.</li>
                </ol>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-3">Write Your Report</h4>
                <p className="text-gray-700 mb-3">
                  Write a short report about common habits among young people in your community. Use adverbs of frequency
                  and cohesive devices.
                </p>
                <textarea
                  className="w-full h-40 rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:outline-none p-3 text-sm"
                  placeholder="Example: Most students in my city usually..."
                />
              </div>
            </div>
          </div>
        )
      },
      {
        type: "quantifiers",
        title: "🔢 Quantifiers in Action",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use <strong>all</strong>, <strong>both</strong>, <strong>neither</strong>, and <strong>none</strong> to
              describe survey results accurately.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <th className="p-4 text-left">Lifestyle Survey</th>
                    <th className="p-4 text-left">Noura</th>
                    <th className="p-4 text-left">Maha</th>
                    <th className="p-4 text-left">Badria</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    { question: "Are you a vegetarian?", answers: ["no", "no", "no"] },
                    { question: "Do you often eat junk food?", answers: ["no", "no", "yes"] },
                    { question: "Can you cook?", answers: ["yes", "yes", "yes"] },
                    { question: "Do you work out regularly?", answers: ["yes", "yes", "no"] },
                    { question: "Do you drink a lot of coffee?", answers: ["no", "no", "no"] }
                  ].map((row) => (
                    <tr key={row.question} className="border-b hover:bg-slate-50">
                      <td className="p-4 font-semibold">{row.question}</td>
                      {row.answers.map((answer, index) => (
                        <td key={index} className="p-4 capitalize">{answer}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Noura and Maha are vegetarians.",
                  options: [
                    "Both of them are vegetarians.",
                    "Neither of them is a vegetarian.",
                    "All of them are vegetarians."
                  ],
                  correct: "Neither of them is a vegetarian."
                },
                {
                  id: 2,
                  question: "Noura, Maha, and Badria can cook.",
                  options: [
                    "None of them can cook.",
                    "All of them can cook.",
                    "Both of them can cook."
                  ],
                  correct: "All of them can cook."
                },
                {
                  id: 3,
                  question: "Badria doesn’t work out regularly.",
                  options: [
                    "Both of them work out regularly.",
                    "All of them work out regularly.",
                    "Not all of them work out regularly."
                  ],
                  correct: "Not all of them work out regularly."
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      }
    ]
  };

  // Lesson 4 Content
  const lesson4Content = {
    title: "Lesson 4 – Capstone Project",
    topic: "Design and present your lifestyle story",
    steps: [
      {
        type: "overview",
        title: "� Capstone Brief",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-3">"My Lifestyle Story" Showcase</h3>
              <p className="text-lg opacity-90">
                Synthesize everything you have learned about routines, frequency, and healthy habits. Present a polished
                English narrative that sounds authentic and engaging.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg space-y-4 text-gray-700">
              <h4 className="text-xl font-bold text-gray-800">Project goals</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demonstrate control of the simple present and adverbs of frequency.</li>
                <li>Describe daily, weekly, and monthly habits with concrete evidence.</li>
                <li>Reflect on healthy choices and explain areas you want to improve.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        type: "planning",
        title: "🧭 Project Planner",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Choose one format: a one-page digital poster, a narrated slide deck (5 slides), or a 60-second video. Use
              the planner to organize your ideas.
            </p>

            <div className="bg-white rounded-3xl p-6 shadow-lg overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-orange-100 text-gray-800">
                    <th className="p-4">Section</th>
                    <th className="p-4">Checklist</th>
                    <th className="p-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    {
                      section: "Profile intro",
                      checklist: "Name, age/role, signature quote",
                      placeholder: "Example: I&apos;m Noura, a student who paints to recharge."
                    },
                    {
                      section: "Daily routine",
                      checklist: "Morning, afternoon, evening habits",
                      placeholder: "Use always/usually/sometimes to highlight routines."
                    },
                    {
                      section: "Healthy choices",
                      checklist: "Diet + sleep + exercise details",
                      placeholder: "Mention how often, how long, or how much for each habit."
                    },
                    {
                      section: "Areas to improve",
                      checklist: "Two habits you seldom/never do but want to add",
                      placeholder: "Explain why these habits matter to you."
                    },
                    {
                      section: "Conclusion",
                      checklist: "Motivational takeaway or personal motto",
                      placeholder: "Example: Small daily choices build a strong future."
                    }
                  ].map((row) => (
                    <tr key={row.section} className="border-b">
                      <td className="p-4 font-semibold text-gray-800">{row.section}</td>
                      <td className="p-4">{row.checklist}</td>
                      <td className="p-4 text-sm text-gray-600">{row.placeholder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        type: "criteria",
        title: "📏 Quality Checklist",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Evaluate your work against the rubric before you submit. Tick each box when complete.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-3">Language &amp; Content</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Uses at least six adverbs or expressions of frequency accurately.</li>
                  <li>Includes three statistics or time expressions (e.g., twice a week, six hours).</li>
                  <li>Shows variety in sentence structures (statements, negatives, questions).</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6">
                <h4 className="font-bold text-gray-800 mb-3">Presentation &amp; Reflection</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Visuals or narration support the message clearly.</li>
                  <li>Explains why habits are healthy or need improvement.</li>
                  <li>Ends with a memorable statement or future action.</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        type: "submission",
        title: "📤 Submit Your Project",
        content: (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">📤</div>
                <p className="text-xl font-bold text-gray-800 mb-2">Upload Your Project</p>
                <p className="text-gray-600 mb-6">Image, PDF, or Video (Max 10MB)</p>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all">
                  Choose File
                </button>
              </div>
            </div>

            <div className="bg-orange-100 rounded-2xl p-6 text-gray-800">
              <h4 className="font-bold mb-2">After you submit</h4>
              <p>Reflect in one or two sentences: What habit are you most proud of and why? What is the next lifestyle goal you will tackle?</p>
            </div>
          </div>
        )
      }
    ]
  };

  // Lesson 5 Content - Writing Workshop
  const lesson5Content = {
    title: "Lesson 5 – Writing Workshop",
    topic: "Write a lifestyle report using pronouns and cohesive devices",
    steps: [
      {
        type: "writing_intro",
        title: "✍️ My Lifestyle Report",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              In this writing workshop, you will create a short report (80-100 words) about your lifestyle or
              common habits in your community. Focus on using pronouns and connectors to make your writing flow smoothly.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Learning Objectives</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Write a short report about habits and pastimes</li>
                <li>Use pronouns and possessive adjectives for cohesion</li>
                <li>Connect ideas using: and, because, so, but</li>
                <li>Create smooth, readable paragraphs</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        type: "pronouns",
        title: "🔗 Pronouns & Possessive Adjectives",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use pronouns to avoid repeating nouns and to create cohesive writing.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    <th className="p-4 text-left">Subject Pronouns</th>
                    <th className="p-4 text-left">Object Pronouns</th>
                    <th className="p-4 text-left">Possessive Adjectives</th>
                    <th className="p-4 text-left">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    { subject: "I", object: "me", possessive: "my", example: "I drink tea. It helps me relax." },
                    { subject: "you", object: "you", possessive: "your", example: "You exercise daily. It's good for your health." },
                    { subject: "he", object: "him", possessive: "his", example: "Arthur works out. His routine is strict." },
                    { subject: "she", object: "her", possessive: "her", example: "Refaa drinks tea. Her favorite is herbal." },
                    { subject: "it", object: "it", possessive: "its", example: "Exercise is important. Its benefits are many." },
                    { subject: "we", object: "us", possessive: "our", example: "We eat healthy food. Our diet is balanced." },
                    { subject: "they", object: "them", possessive: "their", example: "Students exercise. Their energy improves." }
                  ].map((row, index) => (
                    <tr key={index} className={`border-b hover:bg-slate-50 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-4 font-semibold text-teal-600">{row.subject}</td>
                      <td className="p-4">{row.object}</td>
                      <td className="p-4">{row.possessive}</td>
                      <td className="p-4">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-400 rounded-r-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>💡</span>Cohesion Tip</h4>
              <p className="text-gray-700">
                Instead of repeating <strong>"Noura"</strong> → use <strong>"she"</strong> or <strong>"her"</strong><br/>
                <em>Example: Noura paints every evening. She says it makes her happy.</em>
              </p>
            </div>
          </div>
        )
      },
      {
        type: "quiz",
        title: "🧩 Pronoun Practice",
        content: (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Complete each sentence with the correct pronoun or possessive adjective.
            </p>
            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Refaa loves herbal tea because ___ keeps her calm.",
                  options: ["it", "she", "they"],
                  correct: "it"
                },
                {
                  id: 2,
                  question: "Arthur and Martin are busy, but ___ both schedule time for exercise.",
                  options: ["he", "they", "them"],
                  correct: "they"
                },
                {
                  id: 3,
                  question: "Musa talks about ___ teammates because they inspire him.",
                  options: ["his", "their", "her"],
                  correct: "his"
                },
                {
                  id: 4,
                  question: "Students should take care of ___ health.",
                  options: ["its", "their", "our"],
                  correct: "their"
                },
                {
                  id: 5,
                  question: "Exercise is important. ___ helps you stay healthy.",
                  options: ["It", "They", "She"],
                  correct: "It"
                },
                {
                  id: 6,
                  question: "Josh spends hours online. The Internet fascinates ___.",
                  options: ["he", "him", "his"],
                  correct: "him"
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "connectors",
        title: "🔗 Linking Words",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use connectors to link ideas and create smooth paragraphs: <strong>and, because, so, but</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  connector: "and",
                  use: "Add information",
                  example: "I exercise regularly and eat healthy food."
                },
                {
                  connector: "because",
                  use: "Give a reason",
                  example: "I drink water because it keeps me hydrated."
                },
                {
                  connector: "so",
                  use: "Show result",
                  example: "I sleep 8 hours, so I feel energetic."
                },
                {
                  connector: "but",
                  use: "Show contrast",
                  example: "I like sports, but I don't play tennis."
                }
              ].map((item) => (
                <div key={item.connector} className="bg-white rounded-2xl p-5 shadow-lg">
                  <h4 className="text-lg font-bold text-teal-600 mb-2">{item.connector}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.use}</p>
                  <p className="text-gray-700 italic">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "writing_template",
        title: "📝 Writing Template",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use this template to organize your lifestyle report (80-100 words).
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">1. Opening sentence</h4>
                <textarea
                  className="w-full h-20 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none p-3"
                  placeholder="Example: Most students in my city have busy lifestyles."
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">2. Describe habits (use frequency adverbs)</h4>
                <textarea
                  className="w-full h-32 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none p-3"
                  placeholder="Example: They usually wake up early and go to school. After school, they often do homework..."
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">3. Healthy habits</h4>
                <textarea
                  className="w-full h-24 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none p-3"
                  placeholder="Example: Many students exercise because it keeps them healthy..."
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">4. Areas to improve</h4>
                <textarea
                  className="w-full h-24 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none p-3"
                  placeholder="Example: However, they rarely get enough sleep..."
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">5. Conclusion</h4>
                <textarea
                  className="w-full h-20 rounded-xl border-2 border-teal-100 focus:border-teal-400 focus:outline-none p-3"
                  placeholder="Example: With better time management, students can improve their lifestyle."
                />
              </div>
            </div>

            <div className="bg-teal-100 rounded-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-2">Checklist ✓</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Used 3+ frequency adverbs (always, usually, often, sometimes, rarely, never)</li>
                <li>Used pronouns to avoid repetition</li>
                <li>Used connectors (and, because, so, but)</li>
                <li>80-100 words total</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  };

  // Lesson 6 Content - Form, Meaning & Function
  const lesson6Content = {
    title: "Lesson 6 – Form, Meaning & Function",
    topic: "Using All / Both / Neither / None accurately",
    steps: [
      {
        type: "quantifiers_intro",
        title: "⚖️ Quantity & Agreement",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Use <strong>All / Both / Neither / None</strong> to talk about quantity and agreement between people or things.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Learning Objectives</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Identify and use quantity expressions correctly</li>
                <li>Compare habits between people or groups</li>
                <li>Understand subject-verb agreement with quantifiers</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        type: "grammar_table",
        title: "📊 Grammar Reference",
        content: (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <th className="p-4 text-left">Expression</th>
                    <th className="p-4 text-left">Meaning</th>
                    <th className="p-4 text-left">Verb Form</th>
                    <th className="p-4 text-left">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    {
                      expression: "Both of them",
                      meaning: "Two people/things (100%)",
                      verb: "plural verb",
                      example: "Both of them are teachers."
                    },
                    {
                      expression: "Neither of them",
                      meaning: "Not one or the other (0%)",
                      verb: "singular verb",
                      example: "Neither of them is a vegetarian."
                    },
                    {
                      expression: "All of them",
                      meaning: "Three or more (100%)",
                      verb: "plural verb",
                      example: "All of them work out regularly."
                    },
                    {
                      expression: "None of them",
                      meaning: "Not any (0%)",
                      verb: "singular/plural",
                      example: "None of them drinks coffee."
                    },
                    {
                      expression: "Not all of them",
                      meaning: "Some do, some don't",
                      verb: "plural verb",
                      example: "Not all of them exercise daily."
                    }
                  ].map((row, index) => (
                    <tr key={index} className={`border-b hover:bg-slate-50 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-4 font-semibold text-indigo-600">{row.expression}</td>
                      <td className="p-4">{row.meaning}</td>
                      <td className="p-4">{row.verb}</td>
                      <td className="p-4">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-2xl p-6">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>⚠️</span>Important Note</h4>
              <p className="text-gray-700">
                <strong>Neither</strong> takes a singular verb: "Neither of them <u>is</u> ready."<br/>
                <strong>None</strong> can take singular or plural, but singular is more formal: "None of them <u>drinks</u> coffee."
              </p>
            </div>
          </div>
        )
      },
      {
        type: "survey_practice",
        title: "📊 Survey Simulation",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Look at the survey results and choose the correct sentence for each question.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <th className="p-4 text-left">Survey Question</th>
                    <th className="p-4 text-left">Noura</th>
                    <th className="p-4 text-left">Maha</th>
                    <th className="p-4 text-left">Badria</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    { question: "Are you a vegetarian?", answers: ["no", "no", "no"] },
                    { question: "Do you often eat junk food?", answers: ["no", "no", "yes"] },
                    { question: "Can you cook?", answers: ["yes", "yes", "yes"] },
                    { question: "Do you work out regularly?", answers: ["yes", "yes", "no"] },
                    { question: "Do you drink a lot of coffee?", answers: ["no", "no", "no"] }
                  ].map((row, index) => (
                    <tr key={index} className={`border-b hover:bg-slate-50 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-4 font-semibold">{row.question}</td>
                      {row.answers.map((answer, i) => (
                        <td key={i} className="p-4 capitalize">{answer}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Statement about being vegetarian:",
                  options: [
                    "Both of them are vegetarians.",
                    "Neither of them is a vegetarian.",
                    "All of them are vegetarians.",
                    "None of them are vegetarians."
                  ],
                  correct: "None of them are vegetarians."
                },
                {
                  id: 2,
                  question: "Statement about cooking:",
                  options: [
                    "None of them can cook.",
                    "All of them can cook.",
                    "Both of them can cook.",
                    "Neither of them can cook."
                  ],
                  correct: "All of them can cook."
                },
                {
                  id: 3,
                  question: "Statement about working out:",
                  options: [
                    "Both of them work out regularly.",
                    "All of them work out regularly.",
                    "Not all of them work out regularly.",
                    "None of them work out regularly."
                  ],
                  correct: "Not all of them work out regularly."
                },
                {
                  id: 4,
                  question: "Statement about drinking coffee:",
                  options: [
                    "All of them drink coffee.",
                    "Both of them drink coffee.",
                    "None of them drinks coffee.",
                    "Not all of them drink coffee."
                  ],
                  correct: "None of them drinks coffee."
                },
                {
                  id: 5,
                  question: "Statement about junk food:",
                  options: [
                    "All of them eat junk food often.",
                    "Not all of them eat junk food often.",
                    "None of them eats junk food.",
                    "Both of them eat junk food."
                  ],
                  correct: "Not all of them eat junk food often."
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "sentence_completion",
        title: "🧩 Fill in the Blanks",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Complete each sentence with <strong>all / both / neither / none</strong>.
            </p>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "___ of my friends love sports, but ___ of them play tennis.",
                  options: [
                    "Both / none",
                    "All / neither",
                    "Neither / all"
                  ],
                  correct: "Both / none"
                },
                {
                  id: 2,
                  question: "I have two brothers. ___ of them exercise regularly.",
                  options: [
                    "All",
                    "Both",
                    "None"
                  ],
                  correct: "Both"
                },
                {
                  id: 3,
                  question: "___ of the students in my class eat healthy food every day.",
                  options: [
                    "Neither",
                    "Both",
                    "Not all"
                  ],
                  correct: "Not all"
                },
                {
                  id: 4,
                  question: "I asked three friends about coffee. ___ of them drinks it.",
                  options: [
                    "None",
                    "Both",
                    "Neither"
                  ],
                  correct: "None"
                },
                {
                  id: 5,
                  question: "___ of my parents work out. My father does, but my mother doesn't.",
                  options: [
                    "Both",
                    "Neither",
                    "Not both"
                  ],
                  correct: "Not both"
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "speaking_practice",
        title: "🗣️ Mini Speaking Practice",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Record yourself or practice with a partner using quantifiers to compare habits.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Both of my friends love sports, but none of them play tennis.",
                "Neither of my parents is a vegetarian.",
                "All of my classmates use smartphones.",
                "Not all of them exercise regularly.",
                "None of my friends drinks coffee.",
                "Both of them work out every day."
              ].map((sentence, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-lg">
                  <p className="text-sm uppercase tracking-wide text-indigo-500 font-semibold mb-2">Example {index + 1}</p>
                  <p className="text-gray-700 mb-3">{sentence}</p>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    🎤 Record your version
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      }
    ]
  };

  // Lesson 7 Content - Unit Review & Assessment
  const lesson7Content = {
    title: "Unit Review & Assessment",
    topic: "Summative test and self-evaluation",
    steps: [
      {
        type: "review_intro",
        title: "🏆 Unit 1 Review",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-3">Ready for the Final Challenge?</h3>
              <p className="text-lg opacity-90">
                Test your knowledge from all 6 lessons. Pass with 70% or more to earn your certificate!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">What you'll be tested on:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Vocabulary about lifestyles and habits</li>
                  <li>Simple present tense usage</li>
                  <li>Adverbs and expressions of frequency</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Reading comprehension</li>
                  <li>Pronouns and connectors</li>
                  <li>All / Both / Neither / None</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        type: "final_quiz",
        title: "📝 Final Assessment",
        content: (
          <div className="space-y-6">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-r-2xl p-6">
              <p className="text-gray-800 font-semibold">
                ⏱️ Take your time. You need to answer all questions correctly to pass.
              </p>
            </div>

            <QuizComponent
              questions={[
                {
                  id: 1,
                  question: "Arthur ___ to the gym regularly.",
                  options: ["go", "goes", "going"],
                  correct: "goes"
                },
                {
                  id: 2,
                  question: "How often ___ Refaa eat meat?",
                  options: ["do", "does", "is"],
                  correct: "does"
                },
                {
                  id: 3,
                  question: "Josh ___ spends less than 3 hours online.",
                  options: ["always", "seldom", "usually"],
                  correct: "seldom"
                },
                {
                  id: 4,
                  question: "Noura paints every evening. ___ says it makes her happy.",
                  options: ["She", "Her", "Hers"],
                  correct: "She"
                },
                {
                  id: 5,
                  question: "I exercise regularly ___ it keeps me healthy.",
                  options: ["and", "because", "but"],
                  correct: "because"
                },
                {
                  id: 6,
                  question: "___ of my friends are vegetarians. (referring to 2 friends, both vegetarians)",
                  options: ["Both", "Neither", "All"],
                  correct: "Both"
                },
                {
                  id: 7,
                  question: "Most college students ___ enough sleep.",
                  options: ["don't get", "doesn't get", "not get"],
                  correct: "don't get"
                },
                {
                  id: 8,
                  question: "Martin ___ takes a vacation.",
                  options: ["always", "rarely", "usually"],
                  correct: "rarely"
                },
                {
                  id: 9,
                  question: "___ of the three students drinks coffee.",
                  options: ["Both", "None", "Neither"],
                  correct: "None"
                },
                {
                  id: 10,
                  question: "Students who exercise feel happier ___ more energetic.",
                  options: ["but", "and", "because"],
                  correct: "and"
                }
              ]}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              score={score}
              setScore={setScore}
            />
          </div>
        )
      },
      {
        type: "writing_task",
        title: "✍️ Writing Task",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Write a short report (80-100 words) describing your lifestyle. Include:
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your daily routine (use simple present)</li>
                <li>How often you do activities (use frequency adverbs)</li>
                <li>Your healthy habits</li>
                <li>One habit you want to improve</li>
                <li>Use pronouns and connectors for cohesion</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-3">Write Your Report Here:</h4>
              <textarea
                className="w-full h-64 rounded-xl border-2 border-orange-100 focus:border-orange-400 focus:outline-none p-4 text-base"
                placeholder="I usually wake up at 7 AM every morning. After breakfast, I..."
              />
              <div className="mt-3 text-sm text-gray-500 text-right">
                Target: 80-100 words
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
              📤 Submit Writing Task
            </button>
          </div>
        )
      },
      {
        type: "self_reflection",
        title: "🌱 Self-Reflection",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Reflect on your learning journey through Unit 1.
            </p>

            <div className="space-y-4">
              {[
                "Which adverbs of frequency do you use most often to describe your life?",
                "How can you make your lifestyle healthier?",
                "What habits would you like to change this month?",
                "What was the most useful thing you learned in this unit?",
                "How confident do you feel using the simple present tense now?"
              ].map((question, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-lg">
                  <p className="font-semibold text-gray-800 mb-3">{index + 1}. {question}</p>
                  <textarea
                    className="w-full h-24 rounded-xl border-2 border-yellow-100 focus:border-yellow-400 focus:outline-none p-3 text-sm"
                    placeholder="Write your reflection..."
                  />
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "self_check",
        title: "✅ Self-Check List",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Check off what you can do confidently:
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3">
              {[
                "☑ I can talk about my routines using simple present tense.",
                "☑ I can use frequency adverbs correctly (always, usually, sometimes, rarely, never).",
                "☑ I can ask questions with How often / How long / How much.",
                "☑ I can read and understand lifestyle articles.",
                "☑ I can write a lifestyle report using pronouns and connectors.",
                "☑ I can use All / Both / Neither / None accurately."
              ].map((item, index) => (
                <label key={index} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-lg">{item}</span>
                </label>
              ))}
            </div>
          </div>
        )
      },
      {
        type: "certificate",
        title: "🎓 Earn Your Certificate",
        content: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl p-8 text-white text-center">
              <div className="text-7xl mb-4">🏆</div>
              <h3 className="text-3xl font-bold mb-3">Certificate of Achievement</h3>
              <p className="text-xl mb-6">Lifestyle Communicator - Super Goal 3 Unit 1</p>
              <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-2xl font-bold mb-4">Completion Criteria:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Complete all 6 lessons</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Achieve 70%+ in Unit Test</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Submit Writing Report</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">✅</span>
                    <span>Complete Self-Reflection</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 bg-white text-emerald-600 px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all">
                🎓 Download Certificate
              </button>
            </div>

            <div className="bg-yellow-100 rounded-2xl p-6 text-gray-800 text-center">
              <p className="text-lg font-semibold">🎉 Congratulations on completing Unit 1: Lifestyles!</p>
              <p className="mt-2">You're now ready for Unit 2. Keep up the great work!</p>
            </div>
          </div>
        )
      }
    ]
  };

  const lessons = [lesson1Content, lesson2Content, lesson3Content, lesson4Content, lesson5Content, lesson6Content, lesson7Content];
  const currentLesson = lessons[lessonId - 1] || lesson1Content;
  const totalSteps = currentLesson.steps.length;

  const completeLesson = () => {
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
    const defaultProgress = { completedLessons: [] as number[], totalPoints: 0 };

    let progress = defaultProgress;
    if (savedProgress) {
      try {
        // Merge persisted progress with defaults to avoid missing keys
        const parsed = JSON.parse(savedProgress);
        progress = {
          completedLessons: Array.isArray(parsed?.completedLessons) ? parsed.completedLessons : [],
          totalPoints: typeof parsed?.totalPoints === "number" ? parsed.totalPoints : 0
        };
      } catch (error) {
        console.warn("Failed to parse course progress, resetting progress.", error);
      }
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.totalPoints = (progress.totalPoints || 0) + 100;
      localStorage.setItem(`course-${courseId}-progress`, JSON.stringify(progress));
      setShowCelebration(true);
      setTimeout(() => {
        router.push(`/public/courses/${courseId}`);
      }, 3000);
    } else {
      router.push(`/public/courses/${courseId}`);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setQuizAnswers({});
      setScore(null);
    } else {
      completeLesson();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setQuizAnswers({});
      setScore(null);
    }
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900 py-8 px-4 text-left"
    >
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 text-center max-w-md animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Congratulations!</h2>
            <p className="text-xl text-gray-600 mb-2">You completed {currentLesson.title}!</p>
            <p className="text-3xl font-bold text-purple-600">+100 Points</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/public/courses/${courseId}`)}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          ← Back to Course
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{currentLesson.title}</h1>
              <p className="text-lg text-gray-600 mt-1">🔹 {currentLesson.topic}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Step {currentStep + 1} of {totalSteps}</p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentLesson.steps[currentStep].title}
            </h2>
            {currentLesson.steps[currentStep].content}
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              ← Previous
            </button>
            
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              {currentStep === totalSteps - 1 ? '🎉 Complete Lesson' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quiz Component
function QuizComponent({ 
  questions, 
  quizAnswers, 
  setQuizAnswers, 
  score, 
  setScore 
}: {
  questions: Array<{id: number, question: string, options: string[], correct: string}>,
  quizAnswers: {[key: number]: string},
  setQuizAnswers: (answers: {[key: number]: string}) => void,
  score: number | null,
  setScore: (score: number) => void
}) {
  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correctCount++;
    });
    setScore(correctCount);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div key={q.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border-2 border-gray-200">
          <p className="text-xl font-bold text-gray-900 mb-5 flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </span>
            <span className="flex-1">{q.question}</span>
          </p>
          <div className="space-y-3">
            {q.options.map((option, i) => {
              const isSelected = quizAnswers[q.id] === option;
              const isCorrect = option === q.correct;
              const showResult = score !== null;
              
              return (
                <button
                  key={i}
                  onClick={() => !showResult && setQuizAnswers({...quizAnswers, [q.id]: option})}
                  disabled={showResult}
                  className={`w-full text-left p-5 rounded-xl border-3 transition-all duration-300 font-medium text-base ${
                    showResult
                      ? isCorrect
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-900 shadow-lg'
                        : isSelected
                        ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-500 text-red-900'
                        : 'bg-gray-100 border-gray-300 text-gray-500 opacity-60'
                      : isSelected
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-500 text-purple-900 shadow-lg scale-105'
                      : 'bg-white border-gray-300 text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-400 hover:shadow-md hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 border-green-600 text-white'
                            : isSelected
                            ? 'bg-red-500 border-red-600 text-white'
                            : 'bg-gray-300 border-gray-400 text-gray-600'
                          : isSelected
                          ? 'bg-purple-500 border-purple-600 text-white'
                          : 'bg-gray-200 border-gray-400 text-gray-700'
                      }`}>
                        {String.fromCharCode(97 + i)}
                      </span>
                      <span>{option}</span>
                    </span>
                    {showResult && isCorrect && <span className="text-2xl">✅</span>}
                    {showResult && isSelected && !isCorrect && <span className="text-2xl">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {score === null ? (
        <button
          onClick={checkAnswers}
          disabled={Object.keys(quizAnswers).length !== questions.length}
          className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
            Object.keys(quizAnswers).length === questions.length
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {Object.keys(quizAnswers).length === questions.length ? '✅ Check My Answers' : `📝 Answer All Questions (${Object.keys(quizAnswers).length}/${questions.length})`}
        </button>
      ) : (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl p-8 text-white text-center shadow-2xl">
          <div className="text-6xl mb-4">
            {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👏' : '💪'}
          </div>
          <p className="text-3xl font-bold mb-3">
            Your Score: {score} / {questions.length}
          </p>
          <p className="text-xl opacity-90">
            {score === questions.length ? 'Perfect! You are amazing!' : score >= questions.length / 2 ? 'Good job! Keep practicing!' : 'Keep trying! You can do it!'}
          </p>
          <div className="mt-6 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-lg font-semibold">
              Percentage: {Math.round((score / questions.length) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
