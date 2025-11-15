"use client";

import { useState } from "react";

type EvidenceType = 
  | "strategies" 
  | "visits" 
  | "programs" 
  | "communities" 
  | "remedial" 
  | "achievement" 
  | "general" 
  | "barcode" 
  | "certificate" 
  | "cover"
  | "dividers"
  | null;

export default function EvidenceReportsGenerator() {
  const [selectedType, setSelectedType] = useState<EvidenceType>(null);

  const evidenceTypes = [
    {
      id: "strategies",
      title: "استخدام الاستراتيجيات والوسائل",
      description: "شواهد استخدام الاستراتيجيات التعليمية والوسائل المساعدة",
      icon: "🎯",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "visits",
      title: "الزيارات التبادلية",
      description: "تقارير وشواهد الزيارات التبادلية بين المعلمين",
      icon: "👥",
      color: "from-green-500 to-green-600"
    },
    {
      id: "programs",
      title: "تنفيذ البرامج والمبادرات",
      description: "تقارير تنفيذ البرامج التعليمية والمبادرات التربوية",
      icon: "📚",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "communities",
      title: "نموذج المجتمعات المهنية",
      description: "تقارير اجتماعات المجتمعات المهنية التعلمية",
      icon: "🤝",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: "remedial",
      title: "خطة علاجية",
      description: "خطط علاجية للطلاب ذوي التحصيل المنخفض",
      icon: "📈",
      color: "from-red-500 to-red-600"
    },
    {
      id: "achievement",
      title: "تقرير الإنجاز اليومي/الاسبوعي",
      description: "تقارير الإنجاز اليومي والأسبوعي للمعلم",
      icon: "✅",
      color: "from-teal-500 to-teal-600"
    },
    {
      id: "general",
      title: "النموذج العام",
      description: "نموذج عام قابل للتخصيص لأي نوع من الشواهد",
      icon: "📄",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: "barcode",
      title: "تحويل الملف الي باركود",
      description: "إنشاء باركود QR للملفات والوثائق",
      icon: "📱",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "certificate",
      title: "شهادة",
      description: "إصدار شهادات التقدير والتكريم",
      icon: "🏆",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "cover",
      title: "غلاف السجل",
      description: "تصميم أغلفة السجلات والملفات",
      icon: "📔",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: "dividers",
      title: "الفواصل",
      description: "فواصل ملونة لتنظيم السجلات",
      icon: "📑",
      color: "from-lime-500 to-lime-600"
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            شواهد الأداء التربوية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            اختر نوع الشاهد أو النموذج المطلوب لإنشاء تقرير احترافي
          </p>
        </div>

        {/* Back Button */}
        {selectedType && (
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>العودة للقائمة</span>
          </button>
        )}

        {/* Grid of Evidence Types */}
        {!selectedType && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evidenceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as EvidenceType)}
                className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 text-right"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <div className="text-5xl mb-4">{type.icon}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {type.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {type.description}
                </p>

                {/* Arrow Icon */}
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Form Content - Will be implemented for each type */}
        {selectedType && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center py-20">
              <div className="text-6xl mb-4">
                {evidenceTypes.find(t => t.id === selectedType)?.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                {evidenceTypes.find(t => t.id === selectedType)?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                جاري العمل على هذا النموذج...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
