"use client";

import { useState } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA } from "./shared/utils";
import { sharedPrintStyles, generateHeader, generateSignatureSection } from "./shared/PrintStyles";

interface ProgramExecutionFormProps {
  onBack: () => void;
}

export default function ProgramExecutionForm({ onBack }: ProgramExecutionFormProps) {
  const currentDate = getCurrentHijriDate();
  
  const [formData, setFormData] = useState({
    schoolName: DEFAULT_SCHOOL_DATA.schoolName,
    teacherName: "",
    schoolGender: "boys" as "boys" | "girls",
    beneficiariesCount: "",
    executorName: "",
    programName: "",
    location: "",
    beneficiaries: "",
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    objectives: "",
  });

  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [principalSignatureImage, setPrincipalSignatureImage] = useState<string | null>(null);
  const [barcodeImage, setBarcodeImage] = useState<string | null>(null);
  const [evidence1, setEvidence1] = useState<string | null>(null);
  const [evidence2, setEvidence2] = useState<string | null>(null);

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
        <title>تقرير تنفيذ برنامج - ${formData.programName}</title>
        ${sharedPrintStyles}
      </head>
      <body>
        <div class="print-container">
          ${generateHeader(logoImage || '', formData.schoolName)}
          
          <div class="content-section">
            <h2 class="section-title">تقرير تنفيذ برنامج / مبادرة</h2>
            
            <div class="info-grid">
              <div class="info-item">
                <span class="label">اسم البرنامج:</span>
                <span class="value">${formData.programName}</span>
              </div>
              <div class="info-item">
                <span class="label">مكان التنفيذ:</span>
                <span class="value">${formData.location}</span>
              </div>
              <div class="info-item">
                <span class="label">المستفيدون:</span>
                <span class="value">${formData.beneficiaries === 'students' ? 'طلاب' : formData.beneficiaries === 'teachers' ? 'معلمين' : formData.beneficiaries === 'girls' ? 'طالبات' : formData.beneficiaries === 'girlsteachers' ? 'معلمات' : 'آخرون'}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد المستفيدين:</span>
                <span class="value">${formData.beneficiariesCount}</span>
              </div>
              <div class="info-item">
                <span class="label">تاريخ التنفيذ:</span>
                <span class="value">${executionDate}</span>
              </div>
              <div class="info-item">
                <span class="label">اسم المنفذ:</span>
                <span class="value">${formData.executorName}</span>
              </div>
            </div>

            <div class="objectives-section">
              <h3 class="sub-title">أهداف البرنامج:</h3>
              <div class="objectives-content">${formData.objectives}</div>
            </div>

            ${evidence1 || evidence2 ? `
              <div class="evidence-section">
                <h3 class="sub-title">الشواهد والصور:</h3>
                <div class="evidence-grid">
                  ${evidence1 ? `<img src="${evidence1}" alt="الشاهد الأول" class="evidence-image" />` : ''}
                  ${evidence2 ? `<img src="${evidence2}" alt="الشاهد الثاني" class="evidence-image" />` : ''}
                </div>
              </div>
            ` : ''}
          </div>

          ${generateSignatureSection(
            signatureImage || '',
            formData.executorName || 'المعلم',
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
        <form className="space-y-8">
          {/* البيانات الأساسية */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
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
          </div>

          {/* معلومات البرنامج */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
              <span>📚</span>
              <span>معلومات البرنامج</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  اسم المنفذ *
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
            </div>
          </div>

          {/* معلومات المستفيدين */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span>👥</span>
              <span>معلومات المستفيدين</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  عدد المستفيدين *
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
            </div>
          </div>

          {/* تاريخ التنفيذ */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
              <span>📅</span>
              <span>تاريخ التنفيذ الهجري</span>
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white"
                >
                  {Array.from({ length: 5 }, (_, i) => 1446 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* الأهداف */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span>🎯</span>
              <span>الأهداف</span>
            </h3>
            <div>
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
          </div>

          {/* الشواهد والصور */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-4 flex items-center gap-2">
              <span>📸</span>
              <span>الشواهد والصور</span>
            </h3>
            <p className="text-red-600 dark:text-red-400 font-bold text-center mb-4">
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

          {/* الشعار والتوقيعات */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-slate-700 dark:to-slate-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-violet-800 dark:text-violet-300 mb-4 flex items-center gap-2">
              <span>🖼️</span>
              <span>الشعار والتوقيعات</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  شعار المدرسة
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setLogoImage)}
                    className="hidden"
                    id="logoImageProgram"
                  />
                  <label htmlFor="logoImageProgram" className="cursor-pointer">
                    {logoImage ? (
                      <img src={logoImage} alt="الشعار" className="max-h-32 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">الشعار</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Teacher Signature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توقيع المنفذ
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setSignatureImage)}
                    className="hidden"
                    id="signatureImageProgram"
                  />
                  <label htmlFor="signatureImageProgram" className="cursor-pointer">
                    {signatureImage ? (
                      <img src={signatureImage} alt="التوقيع" className="max-h-32 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">التوقيع</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Principal Signature */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توقيع {formData.schoolGender === 'boys' ? 'المدير' : 'المديرة'}
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setPrincipalSignatureImage)}
                    className="hidden"
                    id="principalSignatureImageProgram"
                  />
                  <label htmlFor="principalSignatureImageProgram" className="cursor-pointer">
                    {principalSignatureImage ? (
                      <img src={principalSignatureImage} alt="توقيع المدير" className="max-h-32 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">التوقيع</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Barcode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الباركود
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setBarcodeImage)}
                    className="hidden"
                    id="barcodeImageProgram"
                  />
                  <label htmlFor="barcodeImageProgram" className="cursor-pointer">
                    {barcodeImage ? (
                      <img src={barcodeImage} alt="الباركود" className="max-h-32 mx-auto rounded" />
                    ) : (
                      <div>
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">الباركود</p>
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
