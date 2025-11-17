"use client";

import { useState, useRef, useEffect } from "react";
import { getCurrentHijriDate, formatHijriDate, DEFAULT_SCHOOL_DATA, DEFAULT_IMAGES } from "./shared/utils";

interface StrategiesFormProps {
  onBack: () => void;
}

export default function StrategiesForm({ onBack }: StrategiesFormProps) {
  const [formData, setFormData] = useState({
    educationDepartment: "الإدارة العامة للتعليم بمحافظة ",
    schoolName: "",
    schoolGender: "boys" as "boys" | "girls",
    studentsCount: "",
    teacherName: "",
    directorName: "",
    strategy: "",
    implementationDate: "",
    subject: "",
    grade: "",
    classroom: "",
    lesson: "",
    objectives: "",
    tools: [] as string[],
  });

  const [evidence1, setEvidence1] = useState<string | null>(null);
  const [evidence2, setEvidence2] = useState<string | null>(null);
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

  const handleToolChange = (tool: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tools: checked 
        ? [...prev.tools, tool]
        : prev.tools.filter(t => t !== tool)
    }));
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
    // Generate objectives list HTML
    const generateObjectivesList = (objectives: string) => {
      const lines = objectives.split('\n').filter(line => line.trim());
      return lines.map(line => `<div class="objective-item">${line}</div>`).join('');
    };

    // Get period text
    const getPeriodText = (period: string) => {
      return period || "غير محدد";
    };

    // Convert to Arabic numbers
    const toArabicNumbers = (str: string) => {
      const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return str.replace(/\d/g, d => arabicNums[parseInt(d)]);
    };

    const teacherGender = formData.schoolGender === "girls" ? "معلمة" : "معلم";
    const directorGender = formData.schoolGender === "girls" ? "مديرة" : "مدير";
    const studentsLabel = formData.schoolGender === "girls" ? "عدد الطالبات" : "عدد الطلاب";

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
          <meta charset="UTF-8">
          <title>تقرير تطبيق استراتيجية تدريسية</title>
          <style>
              * { 
                  print-color-adjust: exact !important; 
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important; 
                  margin: 0; 
                  padding: 0; 
                  box-sizing: border-box;
              }
              body { 
                  font-family: 'Segoe UI', Tahoma, Arial, sans-serif; 
                  margin: 10px; 
                  direction: rtl; 
                  line-height: 1.6;
                  color: #333;
                  font-size: 14px;
                  background: white !important;
              }
              .header { 
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.6rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-bottom: 1rem;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 1rem;
              }
              .ministry-logo { 
                  width: 200px;
                  height: 150px;
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
                  flex-shrink: 0;
              }
              .ministry-logo img {
                  width: 180px;
                  height: 130px;
                  object-fit: contain;
              }
              .header-text { 
                  text-align: center;
                  flex: 1;
              }
              .header-text h3 { margin: 0 0 0.2rem 0; font-size: 1.2rem; }
              .header-text h4 { margin: 0 0 0.2rem 0; font-size: 1rem; }
              .header-text h5 { margin: 0; font-size: 0.8rem; }
              .info-grid { 
                  display: grid; 
                  grid-template-columns: repeat(3, 1fr); 
                  gap: 0.6rem;
                  margin-bottom: 1rem;
                  background: white !important;
              }
              .info-item { 
                  background: white !important; 
                  padding: 0.3rem;
                  display: flex; 
                  align-items: center;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .info-label { 
                  color: #3D7EB9 !important; 
                  font-weight: bold; 
                  font-size: 1rem;
                  border-right: 2px solid #3D7EB9 !important;
                  padding-right: 0.3rem;
                  margin-right: 0.3rem;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .info-value { 
                  flex: 1; 
                  font-size: 1rem; 
                  font-weight: bold;
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
                  font-size: 0.5rem !important;
                  padding: 0.15rem !important;
                }
                .info-value {
                  font-size: 0.5rem !important;
                  padding: 0.15rem !important;
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
              .lesson-section {
                  background: white !important;
                  padding: 0.3rem;
                  margin-bottom: 1rem;
                  display: flex;
                  align-items: center;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .objectives-section { 
                  margin: 1rem 0; 
              }
              .section-title { 
                  background: white !important;
                  color: #15445A !important; 
                  padding: 0.3rem;
                  border-radius: 4px;
                  text-align: center; 
                  font-weight: bold; 
                  margin-bottom: 0.8rem;
                  font-size: 1.2rem;
                  border: 2px solid #0DA9A6 !important;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .objectives-grid { 
                  display: grid; 
                  grid-template-columns: 1fr 1fr; 
                  gap: 0.6rem; 
              }
              .objectives-list { 
                  background: white !important; 
                  padding: 0.6rem; 
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .objective-item { 
                  margin-bottom: 0.5rem; 
                  font-size: 0.9rem; 
                  line-height: 1.5; 
                  padding: 0.2rem 0;
                  font-weight: bold;
              }
              .objective-item:last-child {
                  margin-bottom: 0;
              }
              .tools-section { 
                  background: white !important; 
                  padding: 0.6rem; 
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .tools-title { 
                  background: white !important;
                  color: #15445A !important; 
                  font-weight: bold; 
                  margin-bottom: 0.5rem; 
                  text-align: center; 
                  font-size: 1.1rem;
                  padding: 0.2rem;
                  border-radius: 4px;
                  border: 2px solid #0DA9A6 !important;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .tools-list { 
                  display: grid; 
                  grid-template-columns: repeat(2, 1fr); 
                  gap: 0.3rem; 
              }
              .tool-item { 
                  font-size: 1rem; 
                  padding: 0.2rem 0; 
                  font-weight: bold;
              }
              .evidence-section {
                  margin-top: 1rem;
                  padding: 0.6rem;
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .evidence-title {
                  background: white !important;
                  color: #15445A !important;
                  font-weight: bold;
                  font-size: 1.1rem;
                  margin-bottom: 0.5rem;
                  text-align: center;
                  padding: 0.2rem;
                  border-radius: 4px;
                  border: 2px solid #0DA9A6 !important;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .evidence-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 0.6rem;
              }
              .evidence-item {
                  text-align: center;
              }
              .evidence-item img {
                  width: 100%;
                  height: 250px;
                  object-fit: fill;
                  border-radius: 4px;
                  border: 2px solid #3D7EB9 !important;
                  display: block;
              }
              .signature-section { 
                  display: grid; 
                  grid-template-columns: 1fr 1fr; 
                  gap: 0.6rem; 
                  margin-top: 1rem; 
                  padding-top: 0.6rem; 
              }
              .signature-item { 
                  text-align: center; 
                  padding: 0.3rem; 
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 4px;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .signature-title { 
                  background: white !important;
                  color: #15445A !important; 
                  margin-bottom: 0.3rem; 
                  font-size: 1.2rem;
                  padding: 0.2rem;
                  border-radius: 4px;
                  border: 2px solid #0DA9A6 !important;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              .signature-name { 
                  font-size: 1.2rem; 
                  font-weight: bold; 
                  color: #333; 
              }
              .footer {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.4rem;
                  text-align: center;
                  font-size: 0.8rem;
                  border-radius: 0 0 8px 8px;
                  margin-top: 1rem;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              
              /* طباعة من الموبايل */
              @media print and (max-width: 640px) {
                  * { 
                      print-color-adjust: exact !important; 
                      -webkit-print-color-adjust: exact !important;
                  }
                  body { 
                      margin: 0; 
                      font-size: 9px !important; 
                      background: white !important; 
                  }
                  @page { 
                      margin: 0.3cm; 
                      size: A4 landscape; 
                  }
                  .strategies-table th,
                  .strategies-table td {
                      font-size: 0.5rem !important;
                      padding: 0.15rem !important;
                  }
                  .footer {
                      padding: 0.2rem !important;
                      font-size: 0.5rem !important;
                  }
              }
              
              /* طباعة من الديسكتوب */
              @media print {
                  * { 
                      print-color-adjust: exact !important; 
                      -webkit-print-color-adjust: exact !important;
                  }
                  body { margin: 0; font-size: 12px; background: white !important; }
                  @page { margin: 0.5cm; size: A4; }
              }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="ministry-logo">
                  <img src="/images/ministry-logo-white.png" alt="وزارة التعليم">
              </div>
              <div class="header-text">
                  <h4>${formData.educationDepartment}</h4>
                  <h4>${formData.schoolName}</h4>
                  <h4>تقرير تطبيق استراتيجية تدريسية</h4>
              </div>
          </div>
          
          <div class="info-grid">
              <div class="info-item"><div class="info-label">الاستراتيجية:</div><div class="info-value">${formData.strategy}</div></div>
              <div class="info-item"><div class="info-label">المادة:</div><div class="info-value">${formData.subject}</div></div>
              <div class="info-item"><div class="info-label">تاريخ التنفيذ:</div><div class="info-value">${toArabicNumbers(formData.implementationDate)}</div></div>
              <div class="info-item"><div class="info-label">${studentsLabel}:</div><div class="info-value">${toArabicNumbers(formData.studentsCount)}</div></div>
              <div class="info-item"><div class="info-label">الصف:</div><div class="info-value">${formData.grade}</div></div>
              <div class="info-item"><div class="info-label">الفصل:</div><div class="info-value">${getPeriodText(formData.classroom)}</div></div>
          </div>
          
          <div class="lesson-section">
              <div class="info-label">الدرس:</div>
              <div class="info-value">${formData.lesson}</div>
          </div>
          
          <div class="objectives-section">
              <div class="section-title">الأهداف والأدوات والوسائل التعليمية</div>
              <div class="objectives-grid">
                  <div class="objectives-list">
                      ${generateObjectivesList(formData.objectives)}
                  </div>
                  <div class="tools-section">
                      <div class="tools-title">الأدوات والوسائل التعليمية</div>
                      <div class="tools-list">
                          ${formData.tools.length > 0
                            ? formData.tools.map(tool => `<div class="tool-item">✓ ${tool}</div>`).join('')
                            : '<div class="tool-item">لا توجد أدوات محددة</div>'
                          }
                      </div>
                  </div>
              </div>
          </div>
          
          ${evidence1 || evidence2 ? `
          <div class="evidence-section">
              <div class="evidence-title">الشواهد</div>
              <div class="evidence-grid">
                  ${evidence1 ? `<div class="evidence-item"><img src="${evidence1}" alt="الشاهد الأول"></div>` : ''}
                  ${evidence2 ? `<div class="evidence-item"><img src="${evidence2}" alt="الشاهد الثاني"></div>` : ''}
              </div>
          </div>
          ` : ''}
          
          <div class="signature-section">
              <div class="signature-item">
                  <div class="signature-title">اسم ${teacherGender}</div>
                  <div class="signature-name">${formData.teacherName}</div>
              </div>
              <div class="signature-item">
                  <div class="signature-title">${directorGender} المدرسة</div>
                  <div class="signature-name">${formData.directorName}</div>
              </div>
          </div>
          <div class="footer"></div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const toolsList = [
    { id: "projector", label: "جهاز عرض" },
    { id: "smartBoard", label: "سبورة تفاعلية" },
    { id: "computer", label: "جهاز الحاسب" },
    { id: "explanatoryCards", label: "بطاقات تعليمية" },
    { id: "mathTools", label: "أدوات رياضية" },
    { id: "worksheets", label: "أوراق عمل" },
    { id: "presentation", label: "عرض تقديمي" },
    { id: "books", label: "كتب" },
    { id: "sampleMachines", label: "نماذج" },
  ];

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
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎯</div>
          <div>
            <h2 className="text-2xl font-bold">نموذج استخدام الاستراتيجيات والوسائل</h2>
            <p className="text-blue-100 mt-1">شواهد استخدام الاستراتيجيات التعليمية والوسائل المساعدة</p>
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
                {formData.schoolGender === "boys" ? "عدد الطلاب" : "عدد الطالبات"}
              </label>
              <input
                type="text"
                name="studentsCount"
                value={formData.studentsCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الاستراتيجية
              </label>
              <input
                type="text"
                name="strategy"
                value={formData.strategy}
                onChange={handleInputChange}
                placeholder="اكتب اسم الاستراتيجية"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تاريخ التنفيذ الهجري
              </label>
              <input
                type="text"
                name="implementationDate"
                value={formData.implementationDate}
                onChange={handleInputChange}
                placeholder="مثلا ١٤٤٦/١٢/١٢"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                المادة
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="اسم المادة"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
                placeholder="مثال: الأول ثانوي"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الفصل
              </label>
              <input
                type="text"
                name="classroom"
                value={formData.classroom}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الدرس
              </label>
              <input
                type="text"
                name="lesson"
                value={formData.lesson}
                onChange={handleInputChange}
                placeholder="اكتب اسم الدرس"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Objectives and Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Objectives */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الأهداف
              </label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleInputChange}
                rows={10}
                placeholder="اكتب الأهداف هنا ويفضل خمس أهداف تحت بعض:
1. الهدف الأول
2. الهدف الثاني
3. الهدف الثالث
4. الهدف الرابع
5. الهدف الخامس"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white resize-none"
                required
              />
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                الأدوات والوسائل التعليمية
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-3">
                {toolsList.map((tool) => (
                  <div key={tool.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tool.id}
                      checked={formData.tools.includes(tool.label)}
                      onChange={(e) => handleToolChange(tool.label, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={tool.id} className="mr-3 text-gray-700 dark:text-gray-300">
                      {tool.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
                  صورة الشاهد الأول
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">اضغط لرفع الصورة</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Evidence 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  صورة الشاهد الثاني
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">اضغط لرفع الصورة</p>
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
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              طباعة تقرير الاستراتيجيات PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
