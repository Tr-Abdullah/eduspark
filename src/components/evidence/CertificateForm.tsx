"use client";

import { useState } from "react";

interface CertificateFormProps {
  onBack: () => void;
}

export default function CertificateForm({ onBack }: CertificateFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    reason: "",
    teacherName: "",
    principalName: "",
    date: new Date().toLocaleDateString("ar-SA"),
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
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>العودة للقائمة</span>
      </button>

      {/* Header */}
      <div className="mb-6 p-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🏆</div>
          <div>
            <h2 className="text-2xl font-bold">الشهادات</h2>
            <p className="text-amber-100 mt-1">شهادات تقدير وشكر للطلاب</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اسم الطالب/ة
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              سبب التكريم
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المعلم/ة
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المدير/ة
              </label>
              <input
                type="text"
                name="principalName"
                value={formData.principalName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التاريخ
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Certificate Preview */}
          <div className="mt-8 p-12 border-8 border-double border-amber-400 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-6">
                شـهـادة تـقـديـر
              </h1>
              
              <div className="text-2xl text-gray-700 dark:text-gray-300 space-y-4">
                <p>يسرنا أن نهدي هذه الشهادة إلى</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 my-4">
                  {formData.studentName || "اسم الطالب/ة"}
                </p>
                <div className="text-xl leading-relaxed whitespace-pre-line">
                  {formData.reason || "سبب التكريم"}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t-2 border-amber-300 grid grid-cols-2 gap-8 text-lg">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">المعلم/ة</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {formData.teacherName || "___________"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">المدير/ة</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {formData.principalName || "___________"}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-gray-600 dark:text-gray-400">
                التاريخ: {formData.date}
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة الشهادة PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
