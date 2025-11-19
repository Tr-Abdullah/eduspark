"use client";

import { useState, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_IMAGES } from './shared/utils';

interface CertificateFormProps {
  onBack: () => void;
}

export default function CertificateForm({ onBack }: CertificateFormProps) {
  const hijriDate = getCurrentHijriDate();
  
  const [formData, setFormData] = useState({
    studentName: "",
    reason: "",
    teacherName: "",
    principalName: "",
    schoolName: "مدرسة الملك فهد الابتدائية",
    date: formatHijriDate(hijriDate.dayName, hijriDate.year, hijriDate.month, hijriDate.day),
  });

  const [images, setImages] = useState({
    logo: DEFAULT_IMAGES.logo,
    signature: DEFAULT_IMAGES.signature,
  });

  // Auto-load images on component mount
  useEffect(() => {
    setImages({
      logo: DEFAULT_IMAGES.logo,
      signature: DEFAULT_IMAGES.signature,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [e.target.name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const printStyles = `
    @media print {
      .no-print,
      button,
      input[type="file"],
      .bg-gradient-to-r {
        display: none !important;
      }

      body {
        background: white !important;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .certificate-container {
        page-break-inside: avoid;
        margin: 0 auto;
        padding: 40px !important;
        border: 8px double #f59e0b !important;
        background: linear-gradient(to bottom right, #fffbeb, #fef3c7, #fed7aa) !important;
        box-shadow: none !important;
        border-radius: 24px !important;
      }

      .certificate-header {
        border-bottom: 4px solid #f59e0b !important;
        margin-bottom: 30px !important;
        padding-bottom: 20px !important;
      }

      .logo-image {
        width: 80px !important;
        height: 80px !important;
      }

      .ministry-title {
        font-size: 1.1rem !important;
        white-space: nowrap !important;
      }

      .ministry-subtitle {
        font-size: 1rem !important;
        white-space: nowrap !important;
      }

      .school-name-display {
        font-size: 0.9rem !important;
        white-space: nowrap !important;
      }

      .certificate-title {
        font-size: 2.5rem !important;
        color: #d97706 !important;
      }

      .student-name-display {
        font-size: 2rem !important;
        color: #b45309 !important;
      }

      .certificate-text {
        font-size: 1rem !important;
      }

      .reason-text {
        font-size: 0.95rem !important;
      }

      .signature-section {
        margin-top: 40px !important;
        padding-top: 30px !important;
        border-top: 2px solid #f59e0b !important;
      }

      .signature-block {
        text-align: center;
      }

      .signature-label {
        font-size: 0.9rem !important;
        white-space: nowrap !important;
      }

      .signature-value {
        font-size: 1rem !important;
        white-space: nowrap !important;
      }

      .signature-image {
        width: 100px !important;
        height: 60px !important;
      }

      .date-section {
        font-size: 0.9rem !important;
        margin-top: 30px !important;
      }
    }

    @media (max-width: 640px) {
      .certificate-container {
        padding: 20px !important;
      }

      .certificate-header {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .logo-image {
        width: 60px !important;
        height: 60px !important;
      }

      .ministry-title {
        font-size: 0.9rem !important;
      }

      .ministry-subtitle {
        font-size: 0.85rem !important;
      }

      .school-name-display {
        font-size: 0.75rem !important;
      }

      .certificate-title {
        font-size: 1.75rem !important;
      }

      .student-name-display {
        font-size: 1.5rem !important;
      }

      .certificate-text {
        font-size: 0.85rem !important;
      }

      .reason-text {
        font-size: 0.8rem !important;
      }

      .signature-section {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .signature-label {
        font-size: 0.75rem !important;
      }

      .signature-value {
        font-size: 0.85rem !important;
      }

      .signature-image {
        width: 80px !important;
        height: 50px !important;
      }

      .date-section {
        font-size: 0.8rem !important;
      }
    }

    @media print and (max-width: 640px) {
      .certificate-container {
        padding: 30px !important;
      }

      .logo-image {
        width: 70px !important;
        height: 70px !important;
      }

      .ministry-title,
      .ministry-subtitle,
      .school-name-display {
        white-space: nowrap !important;
      }

      .ministry-title {
        font-size: 1rem !important;
      }

      .ministry-subtitle {
        font-size: 0.9rem !important;
      }

      .school-name-display {
        font-size: 0.85rem !important;
      }

      .certificate-title {
        font-size: 2rem !important;
      }

      .student-name-display {
        font-size: 1.75rem !important;
      }

      .certificate-text {
        font-size: 0.9rem !important;
      }

      .reason-text {
        font-size: 0.85rem !important;
      }

      .signature-section {
        grid-template-columns: 1fr 1fr;
      }

      .signature-label {
        font-size: 0.85rem !important;
      }

      .signature-value {
        font-size: 0.9rem !important;
      }

      .signature-image {
        width: 90px !important;
        height: 55px !important;
      }
    }
  `;

  return (
    <div className="max-w-4xl mx-auto">
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

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
      <div className="mb-6 p-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl text-white no-print">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🏆</div>
          <div>
            <h2 className="text-2xl font-bold">الشهادات</h2>
            <p className="text-amber-100 mt-1">شهادات تقدير وشكر للطلاب</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 no-print">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                شعار الوزارة
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                التوقيع
              </label>
              <input
                type="file"
                name="signature"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700 dark:text-white"
              />
            </div>
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
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اسم الطالب/ة
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              سبب التكريم
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المعلم/ة
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                اسم المدير/ة
              </label>
              <input
                type="text"
                name="principalName"
                value={formData.principalName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التاريخ الهجري
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          {/* Certificate Preview */}
          <div className="certificate-container mt-8 p-12 border-8 border-double border-amber-400 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 shadow-2xl">
            {/* Header with Logo and Ministry Info */}
            <div className="certificate-header flex items-start justify-between mb-8 pb-6 border-b-4 border-amber-300">
              <div className="flex items-center gap-4">
                {images.logo && (
                  <img 
                    src={images.logo} 
                    alt="شعار الوزارة" 
                    className="logo-image w-20 h-20 object-contain"
                  />
                )}
              </div>
              
              <div className="text-center flex-1">
                <h3 className="ministry-title text-xl font-bold text-gray-800 dark:text-gray-200 mb-1" style={{letterSpacing: '0.5px', wordSpacing: '2px'}}>
                  المملكة العربية السعودية
                </h3>
                <h4 className="ministry-subtitle text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  وزارة التعليم
                </h4>
                <p className="school-name-display text-base font-medium text-gray-600 dark:text-gray-400">
                  {formData.schoolName}
                </p>
              </div>

              <div className="w-20"></div>
            </div>

            {/* Certificate Content */}
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-8 certificate-title">
                شـهـادة تـقـديـر
              </h1>
              
              <div className="text-2xl text-gray-700 dark:text-gray-300 space-y-4 certificate-text">
                <p className="text-xl">تهديكم</p>
                <p className="text-2xl font-semibold">{formData.schoolName}</p>
                <p className="text-xl">هذه الشهادة إلى</p>
                
                <div className="my-6 py-4 px-8 bg-amber-100 dark:bg-amber-900/30 rounded-2xl border-2 border-amber-400">
                  <p className="student-name-display text-4xl font-bold text-amber-700 dark:text-amber-300">
                    {formData.studentName || "اسم الطالب/ة"}
                  </p>
                </div>
                
                <p className="text-xl mt-6">وذلك لـ</p>
                <div className="reason-text text-lg leading-relaxed px-8 py-4 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  {formData.reason || "سبب التكريم"}
                </div>
                
                <p className="text-lg mt-6 text-gray-600 dark:text-gray-400">
                  نشكر لكم جهودكم المتميزة ونتمنى لكم دوام التفوق والنجاح
                </p>
              </div>

              {/* Signatures Section */}
              <div className="signature-section mt-12 pt-8 border-t-2 border-amber-300 grid grid-cols-2 gap-12">
                <div className="signature-block text-center">
                  <p className="signature-label text-base text-gray-600 dark:text-gray-400 mb-4">المعلم/ة</p>
                  {images.signature && (
                    <img 
                      src={images.signature} 
                      alt="التوقيع" 
                      className="signature-image w-24 h-16 object-contain mx-auto mb-2"
                    />
                  )}
                  <p className="signature-value font-semibold text-lg text-gray-800 dark:text-gray-200 border-t-2 border-gray-400 pt-2 inline-block min-w-[150px]">
                    {formData.teacherName || "___________"}
                  </p>
                </div>
                
                <div className="signature-block text-center">
                  <p className="signature-label text-base text-gray-600 dark:text-gray-400 mb-4">مدير/ة المدرسة</p>
                  {images.signature && (
                    <img 
                      src={images.signature} 
                      alt="التوقيع" 
                      className="signature-image w-24 h-16 object-contain mx-auto mb-2"
                    />
                  )}
                  <p className="signature-value font-semibold text-lg text-gray-800 dark:text-gray-200 border-t-2 border-gray-400 pt-2 inline-block min-w-[150px]">
                    {formData.principalName || "___________"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="date-section mt-8 text-base text-gray-600 dark:text-gray-400">
                التاريخ: {formData.date}
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handlePrint}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة الشهادة PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
