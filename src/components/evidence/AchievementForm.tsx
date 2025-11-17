"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";
import { sharedPrintStyles, generateHeader, generateSignatureSection } from "./shared/PrintStyles";

interface AchievementFormProps {
  onBack: () => void;
}

export default function AchievementForm({ onBack }: AchievementFormProps) {
  const currentDate = getCurrentHijriDate();
  
  const [formData, setFormData] = useState({
    reportType: "" as "" | "daily" | "weekly",
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    achievementWeek: "",
    schoolName: DEFAULT_SCHOOL_DATA.schoolName,
    schoolGender: "boys" as "boys" | "girls",
    teacherName: "",
    studentUnderstanding: "",
    studentParticipation: "",
    attendanceCount: "",
    absenceCount: "",
    lessonsCount: "",
    homeworkCount: "",
    testsCount: "",
    activitiesCount: "",
    goalsAchieved: "",
    challenges: "",
    interventions: "",
    notes: "",
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
      currentDate.dayName,
      formData.executionYear,
      formData.executionMonth,
      formData.executionDay
    );

    const reportTitle = formData.reportType === 'daily' ? 'تقرير الإنجاز اليومي' : 'تقرير الإنجاز الأسبوعي';

    const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${reportTitle}</title>
        ${sharedPrintStyles}
      </head>
      <body>
        <div class="print-container">
          ${generateHeader(logoImage || '', formData.schoolName)}
          
          <div class="content-section">
            <h2 class="section-title">${reportTitle}</h2>
            
            <div class="info-grid">
              <div class="info-item">
                <span class="label">نوع التقرير:</span>
                <span class="value">${formData.reportType === 'daily' ? 'يومي' : 'أسبوعي'}</span>
              </div>
              <div class="info-item">
                <span class="label">${formData.reportType === 'daily' ? 'التاريخ' : 'الأسبوع'}:</span>
                <span class="value">${formData.reportType === 'daily' ? executionDate : formData.achievementWeek}</span>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="label">فهم ${formData.schoolGender === 'boys' ? 'الطلاب' : 'الطالبات'}:</span>
                <span class="value">${formData.studentUnderstanding}</span>
              </div>
              <div class="info-item">
                <span class="label">مشاركة ${formData.schoolGender === 'boys' ? 'الطلاب' : 'الطالبات'}:</span>
                <span class="value">${formData.studentParticipation}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الحاضرين:</span>
                <span class="value">${formData.attendanceCount}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الغائبين:</span>
                <span class="value">${formData.absenceCount}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الدروس:</span>
                <span class="value">${formData.lessonsCount}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الواجبات:</span>
                <span class="value">${formData.homeworkCount}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الاختبارات:</span>
                <span class="value">${formData.testsCount}</span>
              </div>
              <div class="info-item">
                <span class="label">عدد الأنشطة:</span>
                <span class="value">${formData.activitiesCount}</span>
              </div>
            </div>

            ${formData.goalsAchieved ? `
              <div class="section-box">
                <h3 class="sub-title">الأهداف المحققة:</h3>
                <div class="value">${formData.goalsAchieved}</div>
              </div>
            ` : ''}

            ${formData.challenges ? `
              <div class="section-box">
                <h3 class="sub-title">التحديات:</h3>
                <div class="value">${formData.challenges}</div>
              </div>
            ` : ''}

            ${formData.interventions ? `
              <div class="section-box">
                <h3 class="sub-title">التدخلات:</h3>
                <div class="value">${formData.interventions}</div>
              </div>
            ` : ''}

            ${formData.notes ? `
              <div class="section-box">
                <h3 class="sub-title">ملاحظات:</h3>
                <div class="value">${formData.notes}</div>
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
      <div className="mb-6 p-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">✅</div>
          <div>
            <h2 className="text-2xl font-bold">تقرير الإنجاز اليومي/الأسبوعي</h2>
            <p className="text-teal-100 mt-1">تقارير الإنجاز اليومي والأسبوعي للمعلم</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نوع التقرير
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر نوع التقرير</option>
                <option value="daily">إنجاز يومي</option>
                <option value="weekly">إنجاز أسبوعي</option>
              </select>
            </div>
            
            {formData.reportType === "daily" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  التاريخ
                </label>
                <select
                  name="executionDay"
                  value={formData.executionDay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            )}
            
            {formData.reportType === "weekly" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الأسبوع
                </label>
                <select
                  name="achievementWeek"
                  value={formData.achievementWeek}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">اختر الأسبوع</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map(week => (
                    <option key={week} value={week.toString()}>{week}</option>
                  ))}
                </select>
              </div>
            )}



            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المدرسة
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="boys">مدرسة بنين</option>
                <option value="girls">مدرسة بنات</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "اسم المعلم" : "اسم المعلمة"}
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                placeholder={formData.schoolGender === "boys" ? "أدخل اسم المعلم" : "أدخل اسم المعلمة"}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "مستوى فهم الطلاب" : "مستوى فهم الطالبات"}
              </label>
              <select
                name="studentUnderstanding"
                value={formData.studentUnderstanding}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر المستوى</option>
                <option value="excellent">ممتاز</option>
                <option value="good">جيد</option>
                <option value="weak">ضعيف</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.schoolGender === "boys" ? "مستوى مشاركة الطلاب" : "مستوى مشاركة الطالبات"}
              </label>
              <select
                name="studentParticipation"
                value={formData.studentParticipation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر المستوى</option>
                <option value="high">عالي</option>
                <option value="medium">متوسط</option>
                <option value="low">منخفض</option>
              </select>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الحضور
              </label>
              <input
                type="number"
                name="attendanceCount"
                value={formData.attendanceCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الدروس
              </label>
              <input
                type="number"
                name="lessonsCount"
                value={formData.lessonsCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الواجبات
              </label>
              <input
                type="number"
                name="homeworkCount"
                value={formData.homeworkCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الاختبارات
              </label>
              <input
                type="number"
                name="testsCount"
                value={formData.testsCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                عدد الأنشطة
              </label>
              <input
                type="number"
                name="activitiesCount"
                value={formData.activitiesCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تحقق الأهداف
              </label>
              <select
                name="goalsAchieved"
                value={formData.goalsAchieved}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">اختر الحالة</option>
                <option value="achieved">تحققت</option>
                <option value="not_achieved">لم تتحقق</option>
              </select>
            </div>
          </div>

          {/* Text Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الصعوبات والتحديات
            </label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المعالجات والتدخلات
            </label>
            <textarea
              name="interventions"
              value={formData.interventions}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ملاحظات
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white resize-none"
            />
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة تقرير الإنجاز PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
