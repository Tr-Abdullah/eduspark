"use client";

import { useState } from "react";

interface GeneralFormProps {
  onBack: () => void;
}

export default function GeneralEvidenceForm({ onBack }: GeneralFormProps) {
  const [formData, setFormData] = useState({
    educationDepartment: "الإدارة العامة للتعليم بمحافظة",
    schoolName: "",
    reportName: "",
    teacherName: "المعلم\nاسم المعلم",
    principalName: "مدير المدرسة\nاسم المدير",
    field1: "",
    field2: "",
    field3: "",
    goals: "الأهداف\nأن....\nأن....",
    results: "النتائج\n...\n....",
    field4: "",
    field5: "",
  });

  const [evidence1, setEvidence1] = useState<string | null>(null);
  const [evidence2, setEvidence2] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className="mb-6 p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📄</div>
          <div>
            <h2 className="text-2xl font-bold">النموذج العام</h2>
            <p className="text-indigo-100 mt-1">نموذج عام قابل للتخصيص لأي نوع من الشواهد</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم الإدارة
              </label>
              <input
                type="text"
                name="educationDepartment"
                value={formData.educationDepartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
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
                placeholder="أدخل اسم المدرسة"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم التقرير
              </label>
              <input
                type="text"
                name="reportName"
                value={formData.reportName}
                onChange={handleInputChange}
                placeholder="أدخل اسم التقرير"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                معلم المادة
              </label>
              <textarea
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                مدير المدرسة
              </label>
              <textarea
                name="principalName"
                value={formData.principalName}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Custom Fields */}
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">الحقول القابلة للتخصيص</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل الأول
              </label>
              <textarea
                name="field1"
                value={formData.field1}
                onChange={handleInputChange}
                rows={3}
                placeholder="عنوان الحقل&#10;محتوى الحقل"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل الثاني
              </label>
              <textarea
                name="field2"
                value={formData.field2}
                onChange={handleInputChange}
                rows={3}
                placeholder="عنوان الحقل&#10;محتوى الحقل"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل الثالث
              </label>
              <textarea
                name="field3"
                value={formData.field3}
                onChange={handleInputChange}
                rows={3}
                placeholder="عنوان الحقل&#10;محتوى الحقل"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل الأساسي الأول
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل الأساسي الثاني
              </label>
              <textarea
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Additional Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل السادس
              </label>
              <textarea
                name="field4"
                value={formData.field4}
                onChange={handleInputChange}
                rows={3}
                placeholder="عنوان الحقل&#10;محتوى الحقل"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الحقل السابع
              </label>
              <textarea
                name="field5"
                value={formData.field5}
                onChange={handleInputChange}
                rows={3}
                placeholder="عنوان الحقل&#10;محتوى الحقل"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Evidence Images */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence1)}
                    className="hidden"
                    id="evidence1General"
                  />
                  <label htmlFor="evidence1General" className="cursor-pointer">
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence2)}
                    className="hidden"
                    id="evidence2General"
                  />
                  <label htmlFor="evidence2General" className="cursor-pointer">
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
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة التقرير كـ PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
