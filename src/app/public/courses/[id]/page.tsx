"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const learningGoals = [
  {
    icon: "💬",
    title: "وصف الروتين اليومي وأسلوب حياة الآخرين",
    description: "إتقان وصف أنشطتك اليومية وعادات الآخرين باستخدام زمن المضارع البسيط بدقة وثقة."
  },
  {
    icon: "⏰",
    title: "استخدام ظروف وتعابير التكرار بدقة",
    description: "توظيف الظروف (always, usually, often, sometimes, rarely, never) والتعابير الزمنية لوصف العادات والأنماط اليومية."
  },
  {
    icon: "❓",
    title: "طرح أسئلة حول التكرار والروتين",
    description: "صياغة أسئلة فعّالة باستخدام How often / How long / How much والإجابة عليها باحترافية."
  },
  {
    icon: "📖",
    title: "قراءة وفهم نصوص حول أنماط الحياة",
    description: "قراءة وتحليل مقاطع عن أسلوب حياة طلاب الجامعات واستخلاص الأفكار الرئيسية والتفاصيل الداعمة."
  },
  {
    icon: "✍️",
    title: "كتابة تقرير قصير عن العادات اليومية",
    description: "إنشاء تقرير واضح ومترابط عن العادات والأنشطة الشائعة مستخدماً الضمائر والروابط اللغوية."
  },
  {
    icon: "🎯",
    title: "استخدام All / Both / Neither / None بدقة",
    description: "توظيف أدوات الكمية والاتفاق في التواصل اليومي لمقارنة العادات بين الأشخاص والمجموعات."
  }
];

const rewards = [
  {
    title: "🏆 شهادة إنجاز: متواصل بأنماط الحياة",
    description: "أكمل جميع الدروس الستة بنجاح واحصل على شهادة رقمية معتمدة - Lifestyle Communicator",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    emoji: "🎓"
  },
  {
    title: "⭐ متقن القواعد والتكرار",
    description: "أتقن استخدام المضارع البسيط وظروف التكرار بنسبة 70% أو أكثر في الاختبار النهائي.",
    gradient: "from-blue-400 via-purple-400 to-pink-400",
    emoji: "✨"
  },
  {
    title: "✍️ كاتب تقرير محترف",
    description: "قدّم تقريراً مكتوباً عن أسلوب حياتك (80-100 كلمة) مستخدماً الضمائر والروابط بإتقان.",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    emoji: "📝"
  }
];

export default function CourseWelcomePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`course-${courseId}-progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLessons(progress.completedLessons || []);
      setTotalPoints(progress.totalPoints || 0);
    }
  }, [courseId]);

  const lessons = [
    {
      id: 1,
      titleAr: "الدرس 1: استمع وناقش",
      titleEn: "Listen and Discuss",
      topic: "مفردات وأوصاف أنماط الحياة - تعرف على 6 شخصيات مختلفة",
      duration: "45-60 دقيقة",
      activities: ["🎧 استماع", "💬 محادثة", "📝 مفردات", "🎯 تطبيق"],
      icon: "�",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      titleAr: "الدرس 2: تركيز القواعد",
      titleEn: "Grammar Focus",
      topic: "المضارع البسيط وظروف التكرار - قواعد الترتيب والاستخدام",
      duration: "50-65 دقيقة",
      activities: ["📖 قواعد", "⏰ ظروف التكرار", "✏️ تمارين", "🗣️ محادثة"],
      icon: "📚",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      titleAr: "الدرس 3: تدريب المحادثة",
      titleEn: "Conversation Practice",
      topic: "حوار: التمارين تنفّرني - استماع وتمثيل أدوار",
      duration: "40-55 دقيقة",
      activities: ["🎧 حوار", "💡 تعابير", "� تمثيل", "💬 مناقشة"],
      icon: "💬",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      titleAr: "الدرس 4: القراءة",
      titleEn: "Reading",
      topic: "هل لدى طلاب الجامعات أسلوب حياة صحي؟",
      duration: "50-65 دقيقة",
      activities: ["📖 قراءة", "📊 رسوم بيانية", "🧠 استيعاب", "✍️ تأمل"],
      icon: "📖",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      titleAr: "الدرس 5: ورشة الكتابة",
      titleEn: "Writing Workshop",
      topic: "تقرير أسلوبي في الحياة - استخدام الضمائر والروابط",
      duration: "45-60 دقيقة",
      activities: ["✍️ كتابة", "🔗 ترابط", "📝 تقرير", "👥 مشاركة"],
      icon: "✍️",
      color: "from-teal-500 to-cyan-600"
    },
    {
      id: 6,
      titleAr: "الدرس 6: الشكل والمعنى والوظيفة",
      titleEn: "Form, Meaning & Function",
      topic: "استخدام All / Both / Neither / None في المقارنات",
      duration: "40-50 دقيقة",
      activities: ["🎯 قواعد", "� تمارين", "🗣️ تطبيق", "📊 مقارنات"],
      icon: "⚖️",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 7,
      titleAr: "مراجعة الوحدة والتقييم",
      titleEn: "Unit Review & Assessment",
      topic: "اختبار شامل وتقييم ذاتي - احصل على شهادتك",
      duration: "60-75 دقيقة",
      activities: ["📝 اختبار", "🎯 تقييم", "🏆 شهادة", "🌱 تأمل"],
      icon: "🏆",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const isLessonUnlocked = (lessonId: number) => {
    if (lessonId === 1) return true;
    return completedLessons.includes(lessonId - 1);
  };

  const goToLesson = (lessonId: number) => {
    if (isLessonUnlocked(lessonId)) {
      router.push(`/public/courses/${courseId}/lesson/${lessonId}`);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto space-y-8 text-right">
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/public/courses")}
              className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:bg-white"
            >
              <span className="text-lg">↩️</span>
              <span>العودة إلى الدورات</span>
            </button>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="mb-4">
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                Super Goal 3 • Grade 9 • CEFR A2–B1
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              الوحدة 1: أنماط الحياة
              <span dir="ltr" className="ltr-text mt-1 block text-base font-light opacity-90">
                Unit 1 • Lifestyles
              </span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              وحدة تعليمية تفاعلية مدتها 5-6 ساعات تأخذك في رحلة لإتقان التواصل الحقيقي حول أنماط الحياة والعادات والروتين اليومي.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📘 نظرة عامة على الدورة</h2>
          <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
            <p>
              مرحباً بك في <strong>Super Goal 3 - Unit 1: Lifestyles</strong> 👋
            </p>
            <p>
              هذه الوحدة التفاعلية عبر الإنترنت تقدّم للطلاب مهارات التواصل الواقعي حول أنماط الحياة والعادات والروتين اليومي.
            </p>
            <p>
              من خلال الأنشطة التفاعلية والفيديوهات والدروس المدعومة بالصوت، ستستكشف كيفية وصف الأنشطة اليومية،
              استخدام زمن المضارع البسيط، طرح الأسئلة باستخدام how often / how long / how much، والتعبير عن التكرار
              باستخدام الظروف والتعابير المناسبة.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mt-4">
              <h3 className="text-xl font-bold text-gray-800 mb-3">✅ ماذا ستتعلم؟</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>وصف روتينك اليومي وأسلوب حياة الآخرين</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>استخدام زمن المضارع البسيط بدقة للأعمال الاعتيادية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>توظيف ظروف وتعابير التكرار لوصف العادات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>طرح والإجابة على أسئلة حول التكرار والروتين</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>قراءة وفهم نصوص عن أسلوب حياة طلاب الجامعات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>كتابة تقرير قصير عن العادات والأنشطة اليومية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>استخدام All / Both / Neither / None بدقة في التواصل</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">أهداف التعلّم الأساسية</h2>
          <p className="text-lg text-gray-700 mb-6">بنهاية هذه الوحدة، ستكون قادراً على:</p>
          <div className="grid gap-4 md:grid-cols-2">
            {learningGoals.map((goal, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 transition-all">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-3xl">{goal.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800 flex-1">{goal.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mr-12">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">مدى تقدّمك</h3>
            <div className="text-left">
              <p className="text-2xl font-bold text-purple-600">{totalPoints} نقاط</p>
              <p className="text-sm text-gray-500">
                {completedLessons.length} / {lessons.length} درس
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const unlocked = isLessonUnlocked(lesson.id);
            const completed = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => goToLesson(lesson.id)}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                  unlocked ? "cursor-pointer hover:shadow-2xl hover:scale-[1.02]" : "opacity-50 cursor-not-allowed"
                } ${completed ? "border-2 border-green-500" : ""}`}
              >
                <div className="flex flex-row-reverse items-start gap-4">
                  <div className={`text-5xl w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${lesson.color}`}>
                    {lesson.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {lesson.titleAr}
                          <span dir="ltr" className="ltr-text mt-1 block text-base font-semibold text-emerald-600">
                            {lesson.titleEn}
                          </span>
                        </h3>
                        <p className="text-lg text-gray-600">{lesson.topic}</p>
                      </div>
                      {completed && (
                        <div className="self-start rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white">
                          منجز
                        </div>
                      )}
                      {!unlocked && (
                        <div className="self-start rounded-full bg-gray-400 px-4 py-2 text-sm font-bold text-white">
                          مغلق
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">⏱️ {lesson.duration}</span>
                      <span className="flex flex-wrap items-center gap-2">
                        {lesson.activities.map((activity, i) => (
                          <span key={i} className="rounded-full bg-gray-100 px-3 py-1">
                            {activity}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">المكافآت التي ستحصل عليها</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`rounded-xl bg-gradient-to-br ${reward.gradient} p-6 text-center shadow-md`}
              >
                <div className="text-5xl mb-3">{reward.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center text-white">
          <p className="text-2xl font-bold mb-2">"العادات الصغيرة اليومية تصنع فرقاً كبيراً"</p>
          <p className="text-lg opacity-90">استخدم اللغة لتوثيق إنجازاتك، وابدأ رحلتك نحو أسلوب حياة متوازن ومُلهم.</p>
        </div>
      </div>
    </div>
  );
}
