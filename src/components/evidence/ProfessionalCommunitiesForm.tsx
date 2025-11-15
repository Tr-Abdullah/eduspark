"use client";

import { useState } from "react";

interface ProfessionalCommunitiesFormProps {
  onBack: () => void;
}

export default function ProfessionalCommunitiesForm({ onBack }: ProfessionalCommunitiesFormProps) {
  const [formData, setFormData] = useState({
    educationDepartment: "الإدارة العامة للتعليم بمحافظة ",
    schoolName: "",
    schoolGender: "boys" as "boys" | "girls",
    signatureName: "مدير المدرسة\nاسم المدير",
    specialization: "",
    sessionTopic: "",
    sessionLocation: "",
    meetingNumber: "",
    attendanceCount: "",
    absenceCount: "",
    sessionDay: "",
    sessionDate: "",
    sessionObjectives: "",
    sessionOutcomes: "",
  });

  const [teachers, setTeachers] = useState<string[]>([]);
  const [newTeacher, setNewTeacher] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTeacher = () => {
    if (newTeacher.trim()) {
      setTeachers([...teachers, newTeacher.trim()]);
      setNewTeacher("");
    }
  };

  const removeTeacher = (index: number) => {
    setTeachers(teachers.filter((_, i) => i !== index));
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
      <div className="mb-6 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🤝</div>
          <div>
            <h2 className="text-2xl font-bold">نموذج المجتمعات المهنية (اجتماع التخصص)</h2>
            <p className="text-orange-100 mt-1">تقارير اجتماعات المجتمعات المهنية التعلمية</p>
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="boys">مدرسة بنين</option>
                <option value="girls">مدرسة بنات</option>
              </select>
            </div>
          </div>

          {/* Teachers List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الأسماء
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeacher())}
                placeholder="أدخل الاسم"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
              />
              <button
                type="button"
                onClick={addTeacher}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                + إضافة
              </button>
            </div>
            {teachers.length > 0 && (
              <div className="space-y-2">
                {teachers.map((teacher, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">{teacher}</span>
                    <button
                      type="button"
                      onClick={() => removeTeacher(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Signature Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اسم المدير/ة
            </label>
            <textarea
              name="signatureName"
              value={formData.signatureName}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التخصص
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="مثلا: الرياضيات"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                موضوع الجلسة
              </label>
              <input
                type="text"
                name="sessionTopic"
                value={formData.sessionTopic}
                onChange={handleInputChange}
                placeholder="أدخل موضوع الجلسة"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                مقر التنفيذ
              </label>
              <input
                type="text"
                name="sessionLocation"
                value={formData.sessionLocation}
                onChange={handleInputChange}
                placeholder="أدخل مقر التنفيذ"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                رقم الاجتماع
              </label>
              <select
                name="meetingNumber"
                value={formData.meetingNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر رقم الاجتماع</option>
                <option value="first">الاجتماع الأول</option>
                <option value="second">الاجتماع الثاني</option>
                <option value="third">الاجتماع الثالث</option>
                <option value="fourth">الاجتماع الرابع</option>
                <option value="fifth">الاجتماع الخامس</option>
                <option value="sixth">الاجتماع السادس</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الحاضرين
              </label>
              <input
                type="number"
                name="attendanceCount"
                value={formData.attendanceCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الغائبين
              </label>
              <input
                type="number"
                name="absenceCount"
                value={formData.absenceCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اليوم
              </label>
              <input
                type="text"
                name="sessionDay"
                value={formData.sessionDay}
                onChange={handleInputChange}
                placeholder="مثلا: الأحد"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التاريخ
              </label>
              <input
                type="text"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleInputChange}
                placeholder="مثلا: ١٤٤٦/١٢/١٢"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              أهداف الجلسة
            </label>
            <textarea
              name="sessionObjectives"
              value={formData.sessionObjectives}
              onChange={handleInputChange}
              rows={4}
              placeholder="اكتب أهداف الجلسة هنا"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Outcomes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نتائج الجلسة
            </label>
            <textarea
              name="sessionOutcomes"
              value={formData.sessionOutcomes}
              onChange={handleInputChange}
              rows={4}
              placeholder="اكتب نتائج الجلسة هنا"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة تقرير المجتمعات المهنية PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
