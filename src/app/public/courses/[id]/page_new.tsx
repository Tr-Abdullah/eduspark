"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const learningGoals = [
  {
    icon: "💬",
    title: "وصف الروتين اليومي باحترافية",
    description: "إتقان استخدام زمن المضارع البسيط لوصف عادات وأنشطة يومية بثقة ودقة لغوية عالية."
  },
  {
    icon: "⏰",
    title: "استخدام ظروف التكرار والتعابير الزمنية",
    description: "دمج ظروف التكرار (always, usually, sometimes) والتعابير الزمنية لمناقشة العادات الصحية وغير الصحية بطلاقة."
  },
  {
    icon: "❓",
    title: "صياغة أسئلة استقصائية فعّالة",
    description: "طرح أسئلة احترافية باستخدام How often / How long / How much للحصول على معلومات دقيقة ومفصلة."
  },
  {
    icon: "📚",
    title: "تحليل النصوص والمحتوى السمعي",
    description: "تحليل نصوص واستماع متنوعة حول أنماط الحياة واستخلاص الأفكار الرئيسية والتفاصيل الداعمة."
  },
  {
    icon: "🎯",
    title: "تطوير مشروع شخصي متكامل",
    description: "إنشاء مشروع نهائي احترافي يوثّق قصة أسلوب حياتك مع أدلة لغوية قوية وخطة تطوير ذاتية واضحة."
  }
];

const rewards = [
  {
    title: "🥇 وسام محترف أسلوب الحياة",
    description: "أكمل المشروع النهائي بتقديم عرض احترافي لأسلوب حياتك باستخدام لغة دقيقة وأدلة مقنعة.",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    emoji: "🏆"
  },
  {
    title: "🧠 خبير القواعد والتكرار",
    description: "أتمم جميع تمارين القواعد والمحادثة بدقة 90% أو أكثر، وأظهر إتقاناً متميزاً للمضارع البسيط.",
    gradient: "from-blue-400 via-purple-400 to-pink-400",
    emoji: "⭐"
  },
  {
    title: "🎓 شهادة إتمام الوحدة الأولى",
    description: "أنجز الدروس الأربعة بنجاح واحصل على شهادة معتمدة تثبت إكمالك لوحدة أنماط الحياة.",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    emoji: "📜"
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
      titleAr: "الدرس الأول: الاستماع والمحادثة",
      titleEn: "Listen & Discuss",
      topic: "استكشف أنماط حياة متنوعة وقارن عاداتك اليومية مع الآخرين",
      duration: "25 دقيقة",
      activities: ["👥 ملفات شخصية", "🪞 تأمل ذاتي", "🎭 محاكاة حوار", "✅ اختبار"],
      icon: "🌅",
      color: "from-blue-500 via-cyan-500 to-teal-600",
      skills: ["المفردات", "الاستماع", "المحادثة"]
    },
    {
      id: 2,
      titleAr: "الدرس الثاني: القواعد وظروف التكرار",
      titleEn: "Grammar & Frequency",
      topic: "أتقن استخدام المضارع البسيط وظروف التكرار في سياقات واقعية",
      duration: "30 دقيقة",
      activities: ["🧠 شرح قواعدي", "📊 سلم التكرار", "📝 تمارين موجهة", "🗣️ استوديو محادثة"],
      icon: "⏰",
      color: "from-purple-500 via-pink-500 to-rose-600",
      skills: ["القواعد", "التراكيب", "الطلاقة"]
    },
    {
      id: 3,
      titleAr: "الدرس الثالث: القراءة والتحليل النقدي",
      titleEn: "Reading & Analysis",
      topic: "قيّم الخيارات الصحية وغير الصحية من خلال نصوص علمية وسردية",
      duration: "35 دقيقة",
      activities: ["📖 قراءة تحليلية", "🎧 استماع مركّز", "💬 نقاش جماعي", "✍️ كتابة متماسكة"],
      icon: "🥗",
      color: "from-green-500 via-emerald-500 to-teal-600",
      skills: ["القراءة", "الاستماع", "الكتابة", "التفكير النقدي"]
    },
    {
      id: 4,
      titleAr: "الدرس الرابع: المشروع الختامي",
      titleEn: "Capstone Project",
      topic: "صمّم وقدّم قصة أسلوب حياتك بطريقة احترافية ومبتكرة",
      duration: "40 دقيقة",
      activities: ["🧭 مخطط المشروع", "📏 معايير التقييم", "🎨 إنتاج إبداعي", "📤 تسليم"],
      icon: "🏆",
      color: "from-orange-500 via-red-500 to-pink-600",
      skills: ["التخطيط", "الإبداع", "العرض", "التقييم الذاتي"]
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
      <div className="max-w-5xl mx-auto space-y-8 text-right">
        {/* زر العودة */}
        <div className="flex justify-end">
          <button
            onClick={() => router.push("/public/courses")}
            className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-emerald-700 shadow-md transition hover:bg-white hover:shadow-lg"
          >
            <span className="text-lg">↩️</span>
            <span>العودة إلى الدورات</span>
          </button>
        </div>

        {/* ترويسة الدورة */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 right-10 text-9xl">🌟</div>
            <div className="absolute bottom-10 left-10 text-9xl">📚</div>
          </div>
          <div className="relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              الوحدة الأولى • Unit 1
            </div>
            <h1 className="text-5xl font-bold mb-4">
              أسلوبي في الحياة
              <span dir="ltr" className="ltr-text mt-2 block text-xl font-light opacity-95">
                My Lifestyle in English
              </span>
            </h1>
            <p className="text-xl opacity-95 leading-relaxed max-w-3xl">
              رحلة تعليمية تفاعلية تنتقل بك من تحليل قصص الآخرين إلى بناء قصة احترافية عن أسلوب حياتك
              بلغة إنجليزية واضحة ودقيقة ومقنعة.
            </p>
          </div>
        </div>

        {/* مقدمة الوحدة */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          <div className="flex items-start gap-4 mb-5">
            <div className="text-5xl">👋</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك في رحلة التعلّم</h2>
              <p className="text-gray-500 text-sm">خطوتك الأولى نحو الطلاقة والثقة اللغوية</p>
            </div>
          </div>
          <div className="text-lg text-gray-700 space-y-4 leading-relaxed">
            <p>
              صُمّمت هذه الوحدة بعناية فائقة لتقودك تدريجياً من مرحلة <strong>الملاحظة والتحليل</strong> إلى مرحلة <strong>العرض الاحترافي</strong>. 
              ستمزج التجربة التعليمية بين الأنشطة التفاعلية، والتفكير النقدي العميق، والتمارين الموجّهة بدقة.
            </p>
            <p>
              بنهاية هذه الوحدة، ستتمكن من تقديم قصتك الشخصية بلغة إنجليزية دقيقة، ومدعومة بأدلة لغوية قوية،
              ومصاغة بأسلوب يعكس شخصيتك وطموحاتك.
            </p>
          </div>
        </div>

        {/* أهداف التعلّم */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🎯</div>
            <h2 className="text-3xl font-bold text-gray-800">أهداف التعلّم الأساسية</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">بنهاية هذه الوحدة، ستكون قادراً على:</p>
          <div className="grid gap-4 md:grid-cols-2">
            {learningGoals.map((goal, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{goal.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{goal.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* مؤشر التقدم */}
        <div className="bg-white rounded-2xl shadow-xl p-7 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📊</div>
              <h3 className="text-2xl font-bold text-gray-800">مسار تقدّمك</h3>
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {totalPoints} نقطة
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {completedLessons.length} من {lessons.length} دروس مكتملة
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 h-full rounded-full transition-all duration-700 flex items-center justify-end px-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 10 && (
                <span className="text-white text-xs font-bold">{Math.round(progress)}%</span>
              )}
            </div>
          </div>
        </div>

        {/* قائمة الدروس */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">📚</div>
            <h2 className="text-3xl font-bold text-gray-800">محتوى الدورة التدريبية</h2>
          </div>
          {lessons.map((lesson) => {
            const unlocked = isLessonUnlocked(lesson.id);
            const completed = completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => goToLesson(lesson.id)}
                className={`bg-white rounded-2xl shadow-lg border-2 p-7 transition-all duration-300 ${
                  unlocked 
                    ? "cursor-pointer hover:shadow-2xl hover:scale-[1.01] border-transparent hover:border-emerald-300" 
                    : "opacity-60 cursor-not-allowed border-gray-200"
                } ${completed ? "border-green-400 bg-green-50/30" : ""}`}
              >
                <div className="flex flex-row-reverse items-start gap-5">
                  {/* أيقونة الدرس */}
                  <div className={`text-6xl w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${lesson.color} shadow-lg flex-shrink-0`}>
                    {lesson.icon}
                  </div>
                  
                  {/* محتوى الدرس */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {lesson.titleAr}
                          <span dir="ltr" className="ltr-text mt-1 block text-base font-semibold text-emerald-600">
                            {lesson.titleEn}
                          </span>
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">{lesson.topic}</p>
                      </div>
                      
                      {/* حالة الدرس */}
                      <div className="flex gap-2">
                        {completed && (
                          <div className="flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-white shadow-md">
                            <span>✓</span>
                            <span>مكتمل</span>
                          </div>
                        )}
                        {!unlocked && (
                          <div className="flex items-center gap-2 rounded-full bg-gray-400 px-5 py-2.5 text-sm font-bold text-white shadow-md">
                            <span>🔒</span>
                            <span>مغلق</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* تفاصيل الدرس */}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium">
                        <span>⏱️</span>
                        <span>{lesson.duration}</span>
                      </span>
                      
                      {lesson.skills && lesson.skills.map((skill, i) => (
                        <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* الأنشطة */}
                    <div className="flex flex-wrap items-center gap-2">
                      {lesson.activities.map((activity, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 px-3 py-1.5 rounded-full text-gray-700"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* المكافآت */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🏅</div>
            <h2 className="text-3xl font-bold text-gray-800">المكافآت والشهادات</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">احصل على هذه الجوائز عند إتمام الوحدة بتميّز:</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`group rounded-2xl bg-gradient-to-br ${reward.gradient} p-7 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{reward.emoji}</div>
                <h3 className="font-bold text-white text-lg mb-3 drop-shadow-md">{reward.title}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* رسالة تحفيزية */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-5 right-5 text-7xl">✨</div>
            <div className="absolute bottom-5 left-5 text-7xl">💪</div>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-bold mb-4">"العادات الصغيرة اليومية تصنع فرقاً كبيراً"</p>
            <p className="text-xl opacity-95 leading-relaxed max-w-2xl mx-auto">
              استخدم اللغة الإنجليزية لتوثيق إنجازاتك وتطوير ذاتك، وابدأ رحلتك نحو أسلوب حياة متوازن وملهم ومؤثر.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
