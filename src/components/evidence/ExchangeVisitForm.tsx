"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";
import { sharedPrintStyles, generateHeader, generateSignatureSection } from "./shared/PrintStyles";

interface ExchangeVisitFormProps {
  onBack: () => void;
}

export default function ExchangeVisitForm({ onBack }: ExchangeVisitFormProps) {
  const currentDate = getCurrentHijriDate();

  const [formData, setFormData] = useState({
    schoolName: DEFAULT_SCHOOL_DATA.schoolName,
    teacherName: DEFAULT_SCHOOL_DATA.teacherName,
    principalName: DEFAULT_SCHOOL_DATA.principalName,
    schoolGender: "boys" as "boys" | "girls",
    visitors: "",
    programName: "الزيارات التبادلية",
    period: "",
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    executionDayName: currentDate.dayName,
    programObjectives: "",
    recommendations: "",
  });

  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [principalSignatureImage, setPrincipalSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [evidence1, setEvidence1] = useState<string>("");
  const [evidence2, setEvidence2] = useState<string>("");

  // تحميل الصور الافتراضية عند تحميل المكون
  useEffect(() => {
    const loadDefaultImages = async () => {
      try {
        setLogoImage(DEFAULT_IMAGES.logo);
        setSignatureImage(DEFAULT_IMAGES.signature);
      } catch (error) {
        console.error('Error loading default images:', error);
      }
    };
    loadDefaultImages();
  }, []);

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
    const executionDate = formatHijriDate(
      formData.executionDayName,
      formData.executionYear,
      formData.executionMonth,
      formData.executionDay
    );

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>نموذج الزيارات التبادلية</title>
          <style>
              ${sharedPrintStyles}
              .info-section {
                margin-bottom: 1rem;
              }
              .section-title {
                background: #15445A !important;
                color: white !important;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-weight: bold;
                font-size: 1rem;
                margin-bottom: 0.8rem;
                text-align: center;
              }
              .info-grid {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 0.8rem;
                margin-bottom: 1rem;
              }
              .info-item {
                border: 2px solid #15445A;
                border-radius: 6px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
              }
              .info-label {
                background: #15445A !important;
                color: white !important;
                padding: 0.4rem;
                font-weight: bold;
                font-size: 0.85rem;
                text-align: center;
              }
              .info-value {
                padding: 0.5rem;
                min-height: 2.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                background: white;
                font-size: 0.9rem;
                white-space: normal;
              }
              
              /* تصغير في الشاشات الصغيرة */
              @media (max-width: 640px) {
                .info-label {
                  font-size: 0.65rem;
                }
                .info-value {
                  font-size: 0.65rem;
                }
              }
              
              /* طباعة من الموبايل */
              @media print and (max-width: 640px) {
                .info-label {
                  font-size: 0.45rem !important;
                  padding: 0.1rem !important;
                  white-space: nowrap !important;
                }
                .info-value {
                  font-size: 0.45rem !important;
                  padding: 0.1rem !important;
                  white-space: nowrap !important;
                  overflow: hidden !important;
                  text-overflow: ellipsis !important;
                }
                .objectives-section, .recommendations-section {
                  padding: 0.3rem !important;
                  margin-bottom: 0.3rem !important;
                }
                .objectives-section .title, .recommendations-section .title {
                  padding: 0.15rem 0.3rem !important;
                  margin-bottom: 0.3rem !important;
                  font-size: 0.5rem !important;
                }
                .objectives-section .content, .recommendations-section .content {
                  padding: 0.15rem !important;
                  font-size: 0.45rem !important;
                  line-height: 1.2 !important;
                }
                .info-item {
                  white-space: nowrap !important;
                }
              }
              
              /* طباعة من الديسكتوب */
              @media print {
                .info-label {
                  font-size: 0.75rem !important;
                }
                .info-value {
                  font-size: 0.75rem !important;
                }
              }
              .objectives-section, .recommendations-section {
                border: 2px solid #15445A;
                border-radius: 6px;
                padding: 1rem;
                margin-bottom: 1rem;
              }
              .objectives-section .title, .recommendations-section .title {
                background: #15445A !important;
                color: white !important;
                padding: 0.4rem 0.8rem;
                border-radius: 4px;
                font-weight: bold;
                margin-bottom: 0.8rem;
                text-align: center;
              }
              .objectives-section .content, .recommendations-section .content {
                padding: 0.5rem;
                line-height: 1.8;
                white-space: normal;
              }
              .evidence-section {
                margin-bottom: 1rem;
                page-break-inside: avoid;
              }
              .evidence-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
              }
              .evidence-item {
                border: 2px solid #15445A;
                border-radius: 6px;
                overflow: hidden;
                padding: 0.5rem;
                min-height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .evidence-item img {
                max-width: 100%;
                max-height: 250px;
                object-fit: contain;
                border-radius: 4px;
              }
          </style>
      </head>
      <body>
          ${generateHeader(logoImage, formData.schoolName)}

          <div class="info-section">
              <div class="section-title">نموذج الزيارات التبادلية</div>
              <div class="info-grid">
                  <div class="info-item" style="grid-column: 1 / span 2;">
                      <div class="info-label">${formData.schoolGender === "boys" ? "اسم المعلم المزار" : "اسم المعلمة المزارة"}</div>
                      <div class="info-value">${formData.teacherName || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 3 / span 2;">
                      <div class="info-label">${formData.schoolGender === "boys" ? "الزائرون" : "الزائرات"}</div>
                      <div class="info-value">${formData.visitors || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 5 / span 2;">
                      <div class="info-label">اسم البرنامج</div>
                      <div class="info-value">${formData.programName || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 1 / span 3;">
                      <div class="info-label">الحصة</div>
                      <div class="info-value">${formData.period || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 4 / span 3;">
                      <div class="info-label">التاريخ</div>
                      <div class="info-value">${executionDate}</div>
                  </div>
              </div>
          </div>

          <div class="objectives-section">
              <div class="title">أهداف البرنامج</div>
              <div class="content">${formData.programObjectives || 'لا توجد أهداف محددة'}</div>
          </div>

          <div class="recommendations-section">
              <div class="title">التوصيات</div>
              <div class="content">${formData.recommendations || 'لا توجد توصيات'}</div>
          </div>

          ${(evidence1 || evidence2) ? `
          <div class="evidence-section">
              <div class="section-title">الشواهد</div>
              <div class="evidence-grid">
                  ${evidence1 ? `<div class="evidence-item"><img src="${evidence1}" alt="الشاهد الأول"></div>` : ''}
                  ${evidence2 ? `<div class="evidence-item"><img src="${evidence2}" alt="الشاهد الثاني"></div>` : ''}
              </div>
          </div>
          ` : ''}

          ${generateSignatureSection(
            formData.teacherName,
            formData.principalName,
            signatureImage,
            principalSignatureImage,
            barcodeImage
          )}
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
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
          
          {/* البيانات الأساسية */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              البيانات الأساسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المدرسة
                </label>
                <select
                  name="schoolGender"
                  value={formData.schoolGender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="boys">مدرسة بنين</option>
                  <option value="girls">مدرسة بنات</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.schoolGender === "boys" ? "اسم المعلم المزار" : "اسم المعلمة المزارة"}
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.schoolGender === "boys" ? "اسم المدير" : "اسم المديرة"}
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* معلومات البرنامج */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              معلومات الزيارة
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.schoolGender === "boys" ? "الزائرون" : "الزائرات"}
                </label>
                <textarea
                  name="visitors"
                  value={formData.visitors}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="أسماء المعلمين/المعلمات الزائرين"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
                  required
                />
              </div>
              
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
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
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
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                    required
                  >
                    <option value="">اختر الحصة</option>
                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اسم المدرسة
                  </label>
                  <textarea
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* تاريخ التنفيذ */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              تاريخ التنفيذ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اليوم</label>
                <select
                  value={formData.executionDay}
                  onChange={(e) => setFormData({...formData, executionDay: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">اليوم</option>
                  {Array.from({length: 30}, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الشهر</label>
                <select
                  value={formData.executionMonth}
                  onChange={(e) => setFormData({...formData, executionMonth: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">الشهر</option>
                  {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">السنة</label>
                <select
                  value={formData.executionYear}
                  onChange={(e) => setFormData({...formData, executionYear: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">السنة</option>
                  {[1446, 1447, 1448, 1449, 1450].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* الأهداف والتوصيات */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                أهداف البرنامج
              </label>
              <textarea
                name="programObjectives"
                value={formData.programObjectives}
                onChange={handleInputChange}
                rows={5}
                placeholder="اكتب أهداف برنامج الزيارة التبادلية..."
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التوصيات
              </label>
              <textarea
                name="recommendations"
                value={formData.recommendations}
                onChange={handleInputChange}
                rows={5}
                placeholder="اكتب التوصيات والملاحظات..."
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>
          </div>

          {/* الشواهد والصور */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              الشواهد
            </h3>
            <p className="text-red-600 dark:text-red-400 font-bold text-center mb-4">
              ⚠️ لا يتم الاحتفاظ بأي صور أو معلومات في الموقع
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
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">اضغط لرفع الصورة الأولى</p>
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
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">اضغط لرفع الصورة الثانية</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* الشعار والتوقيع */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              الشعار والتوقيعات
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">شعار الوزارة</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setLogoImage)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {logoImage && <img src={logoImage} alt="Logo" className="mt-2 h-20 object-contain" />}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الباركود</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setBarcodeImage)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {barcodeImage && <img src={barcodeImage} alt="Barcode" className="mt-2 h-20 object-contain" />}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">توقيع المعلم</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setSignatureImage)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {signatureImage && <img src={signatureImage} alt="Signature" className="mt-2 h-16 object-contain" />}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">توقيع المدير</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setPrincipalSignatureImage)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {principalSignatureImage && <img src={principalSignatureImage} alt="Principal Signature" className="mt-2 h-16 object-contain" />}
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
