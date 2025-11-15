"use client";

import { useState } from "react";

interface ExchangeVisitFormProps {
  onBack: () => void;
}

export default function ExchangeVisitForm({ onBack }: ExchangeVisitFormProps) {
  const [formData, setFormData] = useState({
    educationDepartment: "الإدارة العامة للتعليم بمحافظة ",
    schoolName: "",
    schoolGender: "boys" as "boys" | "girls",
    teacherName: "",
    visitors: "",
    directorName: "",
    programName: "الزيارات التبادلية",
    period: "",
    hijriDate: "",
    programObjectives: "",
    recommendations: "",
  });

  const [evidence1, setEvidence1] = useState<string | null>(null);
  const [evidence2, setEvidence2] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (img: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
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
      <div className="mb-6 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">👥</div>
          <div>
            <h2 className="text-2xl font-bold">نموذج الزيارات التبادلية</h2>
            <p className="text-green-100 mt-1">تقارير وشواهد الزيارات التبادلية بين المعلمين</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم الإدارة التعليمية
              </label>
              <input
                type="text"
                name="educationDepartment"
                value={formData.educationDepartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المدرسة
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع المدرسة
              </label>
              <select
                name="schoolGender"
                value={formData.schoolGender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="boys">مدرسة بنين</option>
                <option value="girls">مدرسة بنات</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "اسم المعلم المزار" : "اسم المعلمة المزارة"}
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "الزائرون" : "الزائرات"}
              </label>
              <textarea
                name="visitors"
                value={formData.visitors}
                onChange={handleInputChange}
                rows={1}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "اسم المدير" : "اسم المديرة"}
              </label>
              <input
                type="text"
                name="directorName"
                value={formData.directorName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم البرنامج
              </label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحصة
              </label>
              <select
                name="period"
                value={formData.period}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر الحصة</option>
                <option value="1">١</option>
                <option value="2">٢</option>
                <option value="3">٣</option>
                <option value="4">٤</option>
                <option value="5">٥</option>
                <option value="6">٦</option>
                <option value="7">٧</option>
                <option value="8">٨</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التاريخ
              </label>
              <input
                type="text"
                name="hijriDate"
                value={formData.hijriDate}
                onChange={handleInputChange}
                placeholder="مثلا ١٤٤٦/١٢/١٢"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Program Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              أهداف البرنامج
            </label>
            <textarea
              name="programObjectives"
              value={formData.programObjectives}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Recommendations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التوصيات
            </label>
            <textarea
              name="recommendations"
              value={formData.recommendations}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Evidence Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">الشواهد والصور</h3>
            <p className="text-red-600 font-bold text-center mb-4">
              لا يتم الاحتفاظ بأي صور أو معلومات في الموقع
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Evidence 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الشاهد الأول
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence1)}
                    className="hidden"
                    id="evidence1"
                  />
                  <label htmlFor="evidence1" className="cursor-pointer">
                    {evidence1 ? (
                      <img src={evidence1} alt="الشاهد الأول" className="max-h-48 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">اضغط لرفع الصورة الأولى</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Evidence 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الشاهد الثاني
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence2)}
                    className="hidden"
                    id="evidence2"
                  />
                  <label htmlFor="evidence2" className="cursor-pointer">
                    {evidence2 ? (
                      <img src={evidence2} alt="الشاهد الثاني" className="max-h-48 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">اضغط لرفع الصورة الثانية</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة نموذج الزيارة التبادلية
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
