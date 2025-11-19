"use client";

import { useState } from "react";

interface DividersFormProps {
  onBack: () => void;
}

export default function DividersForm({ onBack }: DividersFormProps) {
  const [selectedDivider, setSelectedDivider] = useState("");

  const dividers = [
    { value: "performance", label: "أداء الواجبات الوظيفية", color: "from-blue-500 to-blue-600" },
    { value: "lessonPlan", label: "إعداد وتنفيذ خطة التعلم", color: "from-green-500 to-green-600" },
    { value: "professionalInteraction", label: "التفاعل مع المجتمع المهني", color: "from-purple-500 to-purple-600" },
    { value: "techUsage", label: "توظيف التقنيات والوسائل", color: "from-orange-500 to-orange-600" },
    { value: "resultAnalysis", label: "تحليل النتائج والتشخيص", color: "from-red-500 to-red-600" },
    { value: "parentInteraction", label: "التفاعل مع أولياء الأمور", color: "from-pink-500 to-pink-600" },
    { value: "learningEnvironment", label: "تهيئة بيئة تعليمية", color: "from-teal-500 to-teal-600" },
    { value: "strategyDiversification", label: "التنويع في الاستراتيجية", color: "from-indigo-500 to-indigo-600" },
    { value: "classManagement", label: "الإدارة الصفية", color: "from-yellow-500 to-yellow-600" },
    { value: "teacherImprovement", label: "تحسين نتائج المعلمين", color: "from-cyan-500 to-cyan-600" },
    { value: "assessmentMethods", label: "تنويع أساليب التقويم", color: "from-lime-500 to-lime-600" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const selectedDividerData = dividers.find(d => d.value === selectedDivider);

  return (
    <div className="max-w-4xl mx-auto">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print,
            button,
            input,
            select,
            label,
            form > div:not(.print-preview),
            h3 {
              display: none !important;
            }

            body {
              background: white !important;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .print-preview {
              display: flex !important;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100vh;
              page-break-inside: avoid;
            }

            .print-preview > div {
              width: 100%;
              height: 80vh;
            }
          }
        `
      }} />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors no-print"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>العودة للقائمة</span>
      </button>

      {/* Header */}
      <div className="mb-6 p-6 bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl text-white no-print">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📑</div>
          <div>
            <h2 className="text-2xl font-bold">الفواصل</h2>
            <p className="text-lime-100 mt-1">فواصل ملونة لتنظيم السجلات</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 no-print">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الفاصل
            </label>
            <select
              value={selectedDivider}
              onChange={(e) => setSelectedDivider(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 dark:bg-slate-700 dark:text-white"
              required
            >
              <option value="">اختر الفاصل</option>
              {dividers.map((divider) => (
                <option key={divider.value} value={divider.value}>
                  {divider.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          {selectedDividerData && (
            <div className="mt-8 print-preview">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">معاينة الفاصل:</h3>
              <div className={`p-16 rounded-2xl bg-gradient-to-br ${selectedDividerData.color} shadow-2xl`}>
                <div className="text-center">
                  <h2 className="text-5xl font-bold text-white mb-4">
                    {selectedDividerData.label}
                  </h2>
                  <div className="w-32 h-1 bg-white mx-auto"></div>
                </div>
              </div>
            </div>
          )}

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              disabled={!selectedDivider}
              className="px-8 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة الفاصل PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
