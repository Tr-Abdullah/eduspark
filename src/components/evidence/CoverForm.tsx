"use client";

import { useState } from "react";

interface CoverFormProps {
  onBack: () => void;
}

export default function CoverForm({ onBack }: CoverFormProps) {
  const [formData, setFormData] = useState({
    coverTitle: "سجل شواهد الأداء",
    teacherDetails: "المعلم\nاسم المعلم",
    coverYear: "١٤٤٧ هـ",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print,
            button,
            input,
            textarea,
            label,
            form > div:not(.print-preview) {
              display: none !important;
            }

            body {
              background: white !important;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .print-preview {
              display: block !important;
              page-break-inside: avoid;
              margin: 0 auto;
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
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
      <div className="mb-6 p-6 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl text-white no-print">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📔</div>
          <div>
            <h2 className="text-2xl font-bold">غلاف السجل</h2>
            <p className="text-cyan-100 mt-1">تصميم أغلفة السجلات والملفات</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 no-print">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              العنوان
            </label>
            <input
              type="text"
              name="coverTitle"
              value={formData.coverTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المعلم/المعلمة
            </label>
            <textarea
              name="teacherDetails"
              value={formData.teacherDetails}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              العام
            </label>
            <input
              type="text"
              name="coverYear"
              value={formData.coverYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Preview */}
          <div className="mt-8 p-12 border-4 border-cyan-500 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 print-preview">
            <div className="text-center space-y-8">
              <h1 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
                {formData.coverTitle}
              </h1>
              <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {formData.teacherDetails}
              </div>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {formData.coverYear}
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة غلاف السجل PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
