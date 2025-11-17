"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";
import { sharedPrintStyles, generateHeader, generateSignatureSection } from "./shared/PrintStyles";

interface RemedialPlanFormProps {
  onBack: () => void;
}

export default function RemedialPlanForm({ onBack }: RemedialPlanFormProps) {
  const currentDate = getCurrentHijriDate();
  
  const [formData, setFormData] = useState({
    schoolName: DEFAULT_SCHOOL_DATA.schoolName,
    studentName: "",
    subject: "",
    grade: "",
    semester: "",
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    teacherName: "",
    schoolGender: "boys" as "boys" | "girls",
    weaknesses: [] as string[],
    weaknessesOther: "",
    communicationMethods: [] as string[],
    treatmentActions: [] as string[],
    treatmentActionsOther: "",
    result: "",
  });

  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [principalSignatureImage, setPrincipalSignatureImage] = useState<string | null>(null);
  const [barcodeImage, setBarcodeImage] = useState<string | null>(null);

  // تحميل الصور الافتراضية
  useEffect(() => {
    setLogoImage(DEFAULT_IMAGES.logo);
    setSignatureImage(DEFAULT_IMAGES.signature);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleCheckboxChange = (field: 'weaknesses' | 'communicationMethods' | 'treatmentActions', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handlePrint = () => {
    const executionDate = formatHijriDate(
      currentDate.dayName,
      formData.executionYear,
      formData.executionMonth,
      formData.executionDay
    );

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>خطة علاجية - ${formData.studentName}</title>
        ${sharedPrintStyles}
      </head>
      <body>
        <div class="print-container">
          ${generateHeader(logoImage || '', formData.schoolName)}
          
          <div class="content-section">
            <h2 class="section-title">خطة علاجية لطالب ذي تحصيل منخفض</h2>
            
            <div class="info-grid">
              <div class="info-item">
                <span class="label">اسم الطالب:</span>
                <span class="value">${formData.studentName}</span>
              </div>
              <div class="info-item">
                <span class="label">المادة:</span>
                <span class="value">${formData.subject}</span>
              </div>
              <div class="info-item">
                <span class="label">الصف:</span>
                <span class="value">${formData.grade}</span>
              </div>
              <div class="info-item">
                <span class="label">الفصل:</span>
                <span class="value">${formData.semester}</span>
              </div>
              <div class="info-item">
                <span class="label">التاريخ:</span>
                <span class="value">${executionDate}</span>
              </div>
            </div>

            <div class="section-box">
              <h3 class="sub-title">نقاط الضعف:</h3>
              <div class="list-content">
                ${formData.weaknesses.map(w => `<div>• ${w}</div>`).join('')}
                ${formData.weaknessesOther ? `<div>• ${formData.weaknessesOther}</div>` : ''}
              </div>
            </div>

            <div class="section-box">
              <h3 class="sub-title">طرق التواصل:</h3>
              <div class="list-content">
                ${formData.communicationMethods.map(m => `<div>• ${m}</div>`).join('')}
              </div>
            </div>

            <div class="section-box">
              <h3 class="sub-title">الإجراءات العلاجية:</h3>
              <div class="list-content">
                ${formData.treatmentActions.map(a => `<div>• ${a}</div>`).join('')}
                ${formData.treatmentActionsOther ? `<div>• ${formData.treatmentActionsOther}</div>` : ''}
              </div>
            </div>

            ${formData.result ? `
              <div class="section-box">
                <h3 class="sub-title">النتيجة:</h3>
                <div class="value">${formData.result}</div>
              </div>
            ` : ''}
          </div>

          ${generateSignatureSection(
            signatureImage || '',
            formData.teacherName || 'المعلم',
            principalSignatureImage || '',
            formData.schoolGender === 'boys' ? 'المدير' : 'المديرة',
            barcodeImage || ''
          )}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
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
        <form className="space-y-8">
          {/* البيانات الأساسية */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
              <span>📋</span>
              <span>البيانات الأساسية</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المدرسة *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="boys">مدرسة بنين</option>
                  <option value="girls">مدرسة بنات</option>
                </select>
              </div>
            </div>
          </div>

          {/* معلومات الطالب */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
              <span>👤</span>
              <span>معلومات الطالب</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم الطالب *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المعلم *
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* معلومات المادة */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>📚</span>
              <span>معلومات المادة</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المادة *
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
                  الصف *
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
                  الفصل الدراسي *
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  placeholder="الأول، الثاني، الثالث"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* تاريخ الخطة */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
              <span>📅</span>
              <span>تاريخ الخطة الهجري</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اليوم
                </label>
                <select
                  name="executionDay"
                  value={formData.executionDay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الشهر
                </label>
                <select
                  name="executionMonth"
                  value={formData.executionMonth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  السنة
                </label>
                <select
                  name="executionYear"
                  value={formData.executionYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
                >
                  {Array.from({ length: 5 }, (_, i) => 1446 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* نقاط الضعف */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center gap-2">
              <span>⚠️</span>
              <span>نقاط الضعف</span>
            </h3>
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

          {/* طرق التواصل */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>📞</span>
              <span>طرق التواصل</span>
            </h3>
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

          {/* الإجراءات العلاجية */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-pink-800 dark:text-pink-300 mb-4 flex items-center gap-2">
              <span>💊</span>
              <span>الإجراءات العلاجية</span>
            </h3>
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

          {/* النتيجة */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-teal-800 dark:text-teal-300 mb-4 flex items-center gap-2">
              <span>✅</span>
              <span>النتيجة</span>
            </h3>
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
