"use client";

import { useState } from "react";

interface ProgramExecutionFormProps {
  onBack: () => void;
}

export default function ProgramExecutionForm({ onBack }: ProgramExecutionFormProps) {
  const [formData, setFormData] = useState({
    educationDepartment: "الإدارة العامة للتعليم بمحافظة ",
    schoolName: "",
    schoolGender: "boys" as "boys" | "girls",
    beneficiariesCount: "",
    executorName: "",
    directorName: "",
    programName: "",
    location: "",
    beneficiaries: "",
    implementationDate: "",
    objectives: "",
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
      <div className="mb-6 p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📚</div>
          <div>
            <h2 className="text-2xl font-bold">نموذج تنفيذ البرامج والمبادرات</h2>
            <p className="text-purple-100 mt-1">تقارير تنفيذ البرامج التعليمية والمبادرات التربوية</p>
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                عدد المستفيدين
              </label>
              <input
                type="text"
                name="beneficiariesCount"
                value={formData.beneficiariesCount}
                onChange={handleInputChange}
                placeholder="عدد المستفيدين"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المنفذ
              </label>
              <input
                type="text"
                name="executorName"
                value={formData.executorName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم البرنامج *
              </label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                placeholder="أدخل اسم البرنامج"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                مكان التنفيذ *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="أدخل مكان التنفيذ"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المستفيدون *
              </label>
              <select
                name="beneficiaries"
                value={formData.beneficiaries}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر نوع المستفيدين</option>
                <option value="students">طلاب</option>
                <option value="teachers">معلمين</option>
                <option value="girls">طالبات</option>
                <option value="girlsteachers">معلمات</option>
                <option value="other">آخرون</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تاريخ التنفيذ *
              </label>
              <input
                type="text"
                name="implementationDate"
                value={formData.implementationDate}
                onChange={handleInputChange}
                placeholder="مثلا ١٤٤٦/١٢/١٢"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الأهداف *
            </label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              rows={6}
              placeholder="اكتب الأهداف هنا ويفضل خمس أهداف تحت بعض:&#10;1. الهدف الأول&#10;2. الهدف الثاني&#10;3. الهدف الثالث&#10;4. الهدف الرابع&#10;5. الهدف الخامس"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white resize-none"
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence1)}
                    className="hidden"
                    id="evidence1Program"
                  />
                  <label htmlFor="evidence1Program" className="cursor-pointer">
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setEvidence2)}
                    className="hidden"
                    id="evidence2Program"
                  />
                  <label htmlFor="evidence2Program" className="cursor-pointer">
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
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة تقرير تنفيذ البرنامج PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
