"use client";

import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

  const courses = [
    {
      id: 1,
      titleAr: "الوحدة الأولى: أسلوبي في الحياة",
      titleEn: "Unit 1: My Lifestyle",
      description: "رحلة تعليمية تفاعلية تنتقل بك من تحليل قصص الآخرين إلى بناء قصة احترافية عن أسلوب حياتك",
      level: "مبتدئ - متوسط",
      duration: "130 دقيقة",
      lessons: 4,
      icon: "",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-800">
            الدورات التدريبية
          </h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/public/courses/${course.id}`)}
              className="cursor-pointer bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className={`h-48 bg-gradient-to-br ${course.color} flex items-center justify-center text-8xl`}>
                {course.icon}
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{course.titleAr}</h2>
                <p className="text-gray-600">{course.description}</p>
                <div className="flex gap-2 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">{course.lessons} دروس</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg">{course.duration}</span>
                </div>
                <button className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-xl font-bold`}>
                  ابدأ الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
