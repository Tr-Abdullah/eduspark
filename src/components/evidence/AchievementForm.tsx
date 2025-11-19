"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";
import { UnifiedPrintTemplate } from "./shared/UnifiedPrintTemplate";

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

  useEffect(() => {
    setLogoImage(DEFAULT_IMAGES.logo);
    setSignatureImage(DEFAULT_IMAGES.signature);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executionDate = formatHijriDate(
    currentDate.dayName,
    formData.executionYear,
    formData.executionMonth,
    formData.executionDay
  );

  const reportTitle = formData.reportType === 'daily' ? 'تقرير الإنجاز اليومي' : 'تقرير الإنجاز الأسبوعي';

  const printableContent = (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .content-section {
          padding: 1rem;
        }
        .section-title {
          text-align: center;
          font-size: 1.3rem;
          font-weight: bold;
          color: #15445A;
          margin-bottom: 1rem;
          padding: 0.5rem;
          background: #f0f4f8;
          border-radius: 8px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        .info-item {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: #f9fafb;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .label {
          font-weight: 600;
          color: #374151;
          min-width: 100px;
        }
        .value {
          color: #1f2937;
          flex: 1;
        }
        .section-box {
          margin: 1rem 0;
          padding: 0.8rem;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        .sub-title {
          font-weight: bold;
          color: #15445A;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
      `}} />
      
      <div className="content-section">
        <h2 className="section-title">{reportTitle}</h2>
        
        <div className="info-grid">
          <div className="info-item">
            <span className="label">نوع التقرير:</span>
            <span className="value">{formData.reportType === 'daily' ? 'يومي' : 'أسبوعي'}</span>
          </div>
          <div className="info-item">
            <span className="label">{formData.reportType === 'daily' ? 'التاريخ' : 'الأسبوع'}:</span>
            <span className="value">{formData.reportType === 'daily' ? executionDate : `الأسبوع ${formData.achievementWeek}`}</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="label">فهم {formData.schoolGender === 'boys' ? 'الطلاب' : 'الطالبات'}:</span>
            <span className="value">{formData.studentUnderstanding === 'excellent' ? 'ممتاز' : formData.studentUnderstanding === 'good' ? 'جيد' : 'ضعيف'}</span>
          </div>
          <div className="info-item">
            <span className="label">مشاركة {formData.schoolGender === 'boys' ? 'الطلاب' : 'الطالبات'}:</span>
            <span className="value">{formData.studentParticipation === 'high' ? 'عالي' : formData.studentParticipation === 'medium' ? 'متوسط' : 'منخفض'}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الحاضرين:</span>
            <span className="value">{formData.attendanceCount}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الغائبين:</span>
            <span className="value">{formData.absenceCount}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الدروس:</span>
            <span className="value">{formData.lessonsCount}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الواجبات:</span>
            <span className="value">{formData.homeworkCount}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الاختبارات:</span>
            <span className="value">{formData.testsCount}</span>
          </div>
          <div className="info-item">
            <span className="label">عدد الأنشطة:</span>
            <span className="value">{formData.activitiesCount}</span>
          </div>
        </div>

        {formData.goalsAchieved && (
          <div className="section-box">
            <h3 className="sub-title">الأهداف المحققة:</h3>
            <div className="value">{formData.goalsAchieved === 'achieved' ? 'تحققت' : 'لم تتحقق'}</div>
          </div>
        )}

        {formData.challenges && (
          <div className="section-box">
            <h3 className="sub-title">الصعوبات والتحديات:</h3>
            <div className="value">{formData.challenges}</div>
          </div>
        )}

        {formData.interventions && (
          <div className="section-box">
            <h3 className="sub-title">المعالجات والتدخلات:</h3>
            <div className="value">{formData.interventions}</div>
          </div>
        )}

        {formData.notes && (
          <div className="section-box">
            <h3 className="sub-title">ملاحظات:</h3>
            <div className="value">{formData.notes}</div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors no-print"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>العودة للقائمة</span>
      </button>

      {/* Header */}
      <div className="mb-6 p-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl text-white no-print">
        <div className="flex items-center gap-3">
          <div className="text-4xl">✅</div>
          <div>
            <h2 className="text-2xl font-bold">تقرير الإنجاز اليومي/الأسبوعي</h2>
            <p className="text-teal-100 mt-1">تقارير الإنجاز اليومي والأسبوعي للمعلم</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 no-print">
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
              onClick={() => {}} 
              disabled
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 opacity-50 cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              استخدم زر الطباعة العائم بالأسفل
            </button>
          </div>
        </form>
      </div>

      {/* Unified Print Template */}
      <UnifiedPrintTemplate
        logoImage={logoImage || DEFAULT_IMAGES.logo}
        schoolName={formData.schoolName}
        teacherName={formData.teacherName || 'المعلم'}
        principalName={formData.schoolGender === 'boys' ? 'المدير' : 'المديرة'}
        signatureImage={signatureImage || DEFAULT_IMAGES.signature}
        principalSignatureImage={principalSignatureImage || ''}
        barcodeImage={barcodeImage || ''}
        academicYear="1446-1447"
      >
        {printableContent}
      </UnifiedPrintTemplate>
    </div>
  );
}
