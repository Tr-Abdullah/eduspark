"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";
import { sharedPrintStyles, generateHeader, generateSignatureSection } from "./shared/PrintStyles";

interface ProfessionalCommunitiesFormProps {
  onBack: () => void;
}

export default function ProfessionalCommunitiesForm({ onBack }: ProfessionalCommunitiesFormProps) {
  const currentDate = getCurrentHijriDate();

  const [formData, setFormData] = useState({
    schoolName: DEFAULT_SCHOOL_DATA.schoolName,
    teacherName: DEFAULT_SCHOOL_DATA.teacherName,
    principalName: DEFAULT_SCHOOL_DATA.principalName,
    schoolGender: "boys" as "boys" | "girls",
    specialization: "",
    sessionTopic: "",
    sessionLocation: "",
    meetingNumber: "",
    attendanceCount: "",
    absenceCount: "",
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    executionDayName: currentDate.dayName,
    sessionObjectives: "",
    sessionOutcomes: "",
  });

  const [teachers, setTeachers] = useState<string[]>([]);
  const [newTeacher, setNewTeacher] = useState("");
  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [principalSignatureImage, setPrincipalSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");

  // تحميل الصور الافتراضية
  useEffect(() => {
    setLogoImage(DEFAULT_IMAGES.logo);
    setSignatureImage(DEFAULT_IMAGES.signature);
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
          <title>نموذج المجتمعات المهنية</title>
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
              .teachers-list {
                border: 2px solid #15445A;
                border-radius: 6px;
                padding: 1rem;
                margin-bottom: 1rem;
              }
              .teachers-list .title {
                background: #15445A !important;
                color: white !important;
                padding: 0.4rem 0.8rem;
                border-radius: 4px;
                font-weight: bold;
                margin-bottom: 0.8rem;
                text-align: center;
              }
              .teachers-list .content {
                padding: 0.5rem;
                line-height: 1.8;
              }
              .teachers-list .teacher-item {
                padding: 0.3rem 0.5rem;
                border-bottom: 1px dashed #ccc;
              }
              .teachers-list .teacher-item:last-child {
                border-bottom: none;
              }
              .objectives-section, .outcomes-section {
                border: 2px solid #15445A;
                border-radius: 6px;
                padding: 1rem;
                margin-bottom: 1rem;
              }
              .objectives-section .title, .outcomes-section .title {
                background: #15445A !important;
                color: white !important;
                padding: 0.4rem 0.8rem;
                border-radius: 4px;
                font-weight: bold;
                margin-bottom: 0.8rem;
                text-align: center;
              }
              .outcomes-section .content, .session-outcomes-section .content {
                padding: 0.5rem;
                line-height: 1.8;
                white-space: normal;
              }
          </style>
      </head>
      <body>
          ${generateHeader(logoImage, formData.schoolName)}

          <div class="info-section">
              <div class="section-title">نموذج المجتمعات المهنية (اجتماع التخصص)</div>
              <div class="info-grid">
                  <div class="info-item" style="grid-column: 1 / span 2;">
                      <div class="info-label">التخصص</div>
                      <div class="info-value">${formData.specialization || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 3 / span 2;">
                      <div class="info-label">موضوع الجلسة</div>
                      <div class="info-value">${formData.sessionTopic || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 5 / span 2;">
                      <div class="info-label">مكان الجلسة</div>
                      <div class="info-value">${formData.sessionLocation || 'غير محدد'}</div>
                  </div>
                  
                  <div class="info-item" style="grid-column: 1 / span 2;">
                      <div class="info-label">رقم الاجتماع</div>
                      <div class="info-value">${formData.meetingNumber || 'غير محدد'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 3 / span 2;">
                      <div class="info-label">عدد الحضور</div>
                      <div class="info-value">${formData.attendanceCount || '0'}</div>
                  </div>
                  <div class="info-item" style="grid-column: 5 / span 2;">
                      <div class="info-label">عدد الغياب</div>
                      <div class="info-value">${formData.absenceCount || '0'}</div>
                  </div>
                  
                  <div class="info-item" style="grid-column: 1 / span 6;">
                      <div class="info-label">التاريخ</div>
                      <div class="info-value">${executionDate}</div>
                  </div>
              </div>
          </div>

          ${teachers.length > 0 ? `
          <div class="teachers-list">
              <div class="title">أسماء ${formData.schoolGender === "boys" ? "المعلمين" : "المعلمات"} الحاضرين</div>
              <div class="content">
                  ${teachers.map((teacher, index) => `
                      <div class="teacher-item">${index + 1}. ${teacher}</div>
                  `).join('')}
              </div>
          </div>
          ` : ''}

          <div class="objectives-section">
              <div class="title">أهداف الجلسة</div>
              <div class="content">${formData.sessionObjectives || 'لا توجد أهداف محددة'}</div>
          </div>

          <div class="outcomes-section">
              <div class="title">مخرجات الجلسة</div>
              <div class="content">${formData.sessionOutcomes || 'لا توجد مخرجات'}</div>
          </div>

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
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="boys">مدرسة بنين</option>
                  <option value="girls">مدرسة بنات</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.schoolGender === "boys" ? "اسم المعلم" : "اسم المعلمة"}
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
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
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المدرسة
                </label>
                <textarea
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* معلومات الجلسة */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              معلومات الجلسة
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  التخصص
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="مثلاً: الرياضيات"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
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
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  مكان الجلسة
                </label>
                <input
                  type="text"
                  name="sessionLocation"
                  value={formData.sessionLocation}
                  onChange={handleInputChange}
                  placeholder="مقر التنفيذ"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  رقم الاجتماع
                </label>
                <input
                  type="text"
                  name="meetingNumber"
                  value={formData.meetingNumber}
                  onChange={handleInputChange}
                  placeholder="مثلاً: الأول"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عدد الحضور
                </label>
                <input
                  type="number"
                  name="attendanceCount"
                  value={formData.attendanceCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عدد الغياب
                </label>
                <input
                  type="number"
                  name="absenceCount"
                  value={formData.absenceCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* تاريخ التنفيذ */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              تاريخ الجلسة
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

          {/* الأسماء */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-700">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              أسماء {formData.schoolGender === "boys" ? "المعلمين" : "المعلمات"} الحاضرين
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeacher())}
                placeholder="أدخل الاسم"
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
              />
              <button
                type="button"
                onClick={addTeacher}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                + إضافة
              </button>
            </div>
            {teachers.length > 0 && (
              <div className="space-y-2">
                {teachers.map((teacher, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600">
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

          {/* الأهداف والمخرجات */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                أهداف الجلسة
              </label>
              <textarea
                name="sessionObjectives"
                value={formData.sessionObjectives}
                onChange={handleInputChange}
                rows={5}
                placeholder="اكتب أهداف الجلسة..."
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                مخرجات الجلسة
              </label>
              <textarea
                name="sessionOutcomes"
                value={formData.sessionOutcomes}
                onChange={handleInputChange}
                rows={5}
                placeholder="اكتب مخرجات الجلسة..."
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>
          </div>

          {/* الشعار والتوقيعات */}
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
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة نموذج المجتمعات المهنية
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
