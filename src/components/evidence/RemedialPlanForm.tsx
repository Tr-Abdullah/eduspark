"use client";

import { useState } from "react";

interface RemedialPlanFormProps {
  onBack: () => void;
}

export default function RemedialPlanForm({ onBack }: RemedialPlanFormProps) {
  const [formData, setFormData] = useState({
    administration: "الإدارة العامة للتعليم بمحافظة ",
    school: "",
    studentName: "الطالب\nاسم الطالب",
    subject: "",
    grade: "",
    semester: "",
    date: "",
    teacherName: "المعلم\nاسم المعلم",
    principalName: "مدير المدرسة\nاسم المدير",
    weaknesses: [] as string[],
    weaknessesOther: "",
    communicationMethods: [] as string[],
    treatmentActions: [] as string[],
    treatmentActionsOther: "",
    result: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'weaknesses' | 'communicationMethods' | 'treatmentActions', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
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
      <div className="mb-6 p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📈</div>
          <div>
            <h2 className="text-2xl font-bold">خطة علاجية</h2>
            <p className="text-red-100 mt-1">خطط علاجية للطلاب ذوي التحصيل المنخفض</p>
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
                الإدارة
              </label>
              <input
                type="text"
                name="administration"
                value={formData.administration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المدرسة
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                placeholder="اسم المدرسة"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الاسم
              </label>
              <textarea
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المادة
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="اسم المادة"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الصف
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="الصف"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الفصل
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                />
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
                  placeholder="مثلا ١٤٤٦/١٢/١٢"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المعلم
              </label>
              <textarea
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المدير
              </label>
              <textarea
                name="principalName"
                value={formData.principalName}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              نقاط الضعف
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "ضعف التحصيل الدراسي",
                "إهمال الواجبات",
                "قلة المشاركة",
                "أسباب صحية",
                "أسباب أسرية",
                "النوم بالفصل"
              ].map((weakness) => (
                <div key={weakness} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`weakness-${weakness}`}
                    checked={formData.weaknesses.includes(weakness)}
                    onChange={(e) => handleCheckboxChange('weaknesses', weakness, e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor={`weakness-${weakness}`} className="mr-3 text-gray-700 dark:text-gray-300">
                    {weakness}
                  </label>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">أخرى:</span>
                <input
                  type="text"
                  name="weaknessesOther"
                  value={formData.weaknessesOther}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Communication Methods */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              طرق التواصل
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["لقاء فردي", "ولي الأمر", "التوجيه الطلابي"].map((method) => (
                <div key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`method-${method}`}
                    checked={formData.communicationMethods.includes(method)}
                    onChange={(e) => handleCheckboxChange('communicationMethods', method, e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor={`method-${method}`} className="mr-3 text-gray-700 dark:text-gray-300">
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              الإجراءات العلاجية
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "التشجيع والتحفيز",
                "استخدام استراتيجيات جديدة",
                "أوراق عمل",
                "حصص علاجية"
              ].map((action) => (
                <div key={action} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`action-${action}`}
                    checked={formData.treatmentActions.includes(action)}
                    onChange={(e) => handleCheckboxChange('treatmentActions', action, e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor={`action-${action}`} className="mr-3 text-gray-700 dark:text-gray-300">
                    {action}
                  </label>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">أخرى:</span>
                <input
                  type="text"
                  name="treatmentActionsOther"
                  value={formData.treatmentActionsOther}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Result */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              النتيجة
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "تحسن واضح", label: "تحسن واضح" },
                { value: "تحسن متوسط", label: "تحسن متوسط" },
                { value: "يجب اتخاذ إجراءات أخرى", label: "يجب اتخاذ إجراءات أخرى" }
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`result-${option.value}`}
                    name="result"
                    value={option.value}
                    checked={formData.result === option.value}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                  />
                  <label htmlFor={`result-${option.value}`} className="mr-3 text-gray-700 dark:text-gray-300">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة تقرير خطة علاجية PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
