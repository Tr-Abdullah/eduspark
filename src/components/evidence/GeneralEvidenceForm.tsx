"use client";

import { useState } from "react";

interface GeneralFormProps {
  onBack: () => void;
}

const performanceItemsWithElements = {
  "أداء الواجبات الوظيفية": [
    "الالتزام بمواعيد الحضور والانصراف",
    "تنفيذ المهام الإشرافية والإدارية",
    "المشاركة في الأنشطة المدرسية",
    "الالتزام بالأنظمة واللوائح"
  ],
  "التفاعل مع المجتمع المهني": [
    "المشاركة في المجتمعات المهنية",
    "تبادل الخبرات مع الزملاء",
    "المساهمة في تطوير البيئة المدرسية",
    "بناء علاقات مهنية فعالة"
  ],
  "التفاعل مع أولياء الأمور": [
    "التواصل الفعال مع أولياء الأمور",
    "عقد اجتماعات دورية مع أولياء الأمور",
    "إشراك أولياء الأمور في العملية التعليمية",
    "معالجة القضايا الطلابية بالتعاون مع الأسر"
  ],
  "التنويع في استراتيجيات التدريس": [
    "استخدام استراتيجيات متنوعة للتدريس",
    "تطبيق استراتيجيات تدريس إبداعية وجذابة",
    "توظيف التعلم النشط في الدروس",
    "مراعاة أنماط التعلم المختلفة"
  ],
  "تحسين نتائج التعلم": [
    "رفع مستوى التحصيل الدراسي للطلاب",
    "معالجة الفاقد التعليمي",
    "تطوير مهارات التفكير العليا",
    "تحقيق نواتج التعلم المستهدفة"
  ],
  "إعداد وتنفيذ خطة التعلم": [
    "إعداد خطط دراسية متكاملة",
    "تنفيذ الدروس وفق الخطة الزمنية",
    "تنويع الأنشطة التعليمية",
    "متابعة تنفيذ الخطة وتقويمها"
  ],
  "توظيف تقنيات ووسائل التعلم المناسبة": [
    "استخدام التقنيات الحديثة في التدريس",
    "توظيف الوسائل التعليمية المتنوعة",
    "تفعيل منصات التعلم الإلكتروني",
    "دمج التقنية في الأنشطة الصفية"
  ],
  "تهيئة بيئة تعليمية": [
    "توفير بيئة تعليمية محفزة",
    "مراعاة الفروق الفردية",
    "تنظيم الفصل الدراسي بشكل فعال",
    "خلق جو من الاحترام المتبادل"
  ],
  "الإدارة الصفية": [
    "ضبط سلوك الطلاب بطرق إيجابية",
    "تنظيم وقت الحصة بكفاءة",
    "إدارة الأنشطة الصفية بفعالية",
    "وضع قواعد صفية واضحة"
  ],
  "تحليل نتائج المتعلمين وتشخيص مستوياتهم": [
    "تحليل نتائج الطلاب بدقة",
    "تشخيص مستويات الطلاب التحصيلية",
    "تصنيف الطلاب حسب الأداء",
    "استخدام البيانات في التخطيط"
  ],
  "تنوع أساليب التقويم": [
    "استخدام أساليب تقويم متنوعة",
    "تطبيق التقويم التكويني والختامي",
    "توظيف التقويم الإلكتروني",
    "تقديم تغذية راجعة فعالة"
  ]
};

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني", 
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

export default function GeneralEvidenceForm({ onBack }: GeneralFormProps) {
  const [formData, setFormData] = useState({
    teacherName: "عبدالله حسن الفيفي",
    principalName: "احمد علي كريري",
    schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
    academicYear: "1447",
    performanceItem: "",
    performanceElement: "",
    programName: "",
    programGoals: [""],
    executionDay: "",
    executionMonth: "",
    executionYear: "",
    targetAudience: "",
  });

  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [images, setImages] = useState<{
    img1: string | null;
    img2: string | null;
    img3: string | null;
    img4: string | null;
  }>({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const handleImageUpload = (
    key: 'img1' | 'img2' | 'img3' | 'img4',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages({ ...images, [key]: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignatureImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBarcodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBarcodeImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    const toArabicNumbers = (str: string) => {
      const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return str.replace(/\d/g, d => arabicNums[parseInt(d)]);
    };

    const getMonthName = (monthNum: string) => {
      const num = parseInt(monthNum);
      return num > 0 && num <= 12 ? hijriMonths[num - 1] : "";
    };

    const executionDate = `${toArabicNumbers(formData.executionDay)} ${getMonthName(formData.executionMonth)} ${toArabicNumbers(formData.executionYear)}`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
          <meta charset="UTF-8">
          <title>تقرير ${formData.programName}</title>
          <style>
              * {
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
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
                  padding: 0.8rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-bottom: 1rem;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 1rem;
              }
              .logo-container {
                  width: 150px;
                  height: 150px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              .logo-container img {
                  width: 120px;
                  height: 120px;
                  object-fit: contain;
              }
              .header-text {
                  flex: 1;
                  text-align: center;
              }
              .header-text h3 {
                  margin: 0 0 0.3rem 0;
                  font-size: 1.4rem;
              }
              .header-text h4 {
                  margin: 0 0 0.2rem 0;
                  font-size: 1.1rem;
              }
              .school-name-header {
                  margin-top: 0.5rem;
                  font-size: 1.2rem;
                  font-weight: bold;
              }
              .barcode-container {
                  width: 150px;
                  height: 150px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              .barcode-container img {
                  width: 120px;
                  height: 120px;
                  object-fit: contain;
              }
              .info-section {
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  padding: 0.8rem;
                  margin-bottom: 1rem;
              }
              .section-title {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.4rem;
                  border-radius: 4px;
                  text-align: center;
                  font-weight: bold;
                  margin-bottom: 0.8rem;
                  font-size: 1.1rem;
              }
              .info-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 0.6rem;
              }
              .info-item {
                  display: flex;
                  align-items: center;
                  border: 1px solid #3D7EB9 !important;
                  padding: 0.4rem;
                  border-radius: 4px;
                  background: white !important;
              }
              .info-label {
                  color: #3D7EB9 !important;
                  font-weight: bold;
                  font-size: 0.95rem;
                  min-width: 120px;
                  border-right: 2px solid #3D7EB9 !important;
                  padding-right: 0.4rem;
                  margin-right: 0.4rem;
              }
              .info-value {
                  flex: 1;
                  font-size: 0.95rem;
                  font-weight: bold;
              }
              .full-width {
                  grid-column: 1 / -1;
              }
              .goals-section {
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  padding: 0.8rem;
                  margin-bottom: 1rem;
              }
              .goal-item {
                  padding: 0.4rem 0.6rem;
                  margin-bottom: 0.4rem;
                  border-radius: 4px;
                  background: rgba(61, 126, 185, 0.1);
                  font-weight: bold;
              }
              .evidence-section {
                  margin-top: 1rem;
                  padding: 0.8rem;
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
              }
              .evidence-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 0.8rem;
                  margin-top: 0.6rem;
              }
              .evidence-item img {
                  width: 100%;
                  height: 220px;
                  object-fit: cover;
                  border-radius: 6px;
                  border: 2px solid #3D7EB9 !important;
              }
              .signature-section {
                  margin-top: 1.5rem;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 1rem;
              }
              .signature-box {
                  padding: 0.8rem;
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  text-align: center;
              }
              .signature-box-title {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.4rem;
                  border-radius: 4px;
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                  font-size: 1rem;
              }
              .signature-name {
                  font-size: 1.1rem;
                  font-weight: bold;
                  color: #333;
                  margin: 0.5rem 0;
              }
              .signature-box img {
                  max-width: 200px;
                  height: 80px;
                  object-fit: contain;
                  margin: 0.5rem auto;
              }
              .footer {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.6rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-top: 1.5rem;
                  font-size: 1.1rem;
                  font-weight: bold;
              }
              @media print {
                  * {
                      print-color-adjust: exact !important;
                      -webkit-print-color-adjust: exact !important;
                  }
                  body {
                      margin: 0;
                      font-size: 13px;
                      background: white !important;
                  }
                  @page {
                      margin: 0.5cm;
                      size: A4;
                  }
              }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="logo-container">
                  ${logoImage ? `<img src="${logoImage}" alt="شعار الوزارة">` : '<div style="width:120px;height:120px;"></div>'}
              </div>
              <div class="header-text">
                  <h3>المملكة العربية السعودية</h3>
                  <h3>وزارة التعليم</h3>
                  <h4>الإدارة العامة للتعليم بمنطقة جازان</h4>
                  <div class="school-name-header">${formData.schoolName || 'اسم المدرسة'}</div>
              </div>
              <div class="barcode-container">
                  ${barcodeImage ? `<img src="${barcodeImage}" alt="الباركود">` : '<div style="width:120px;height:120px;"></div>'}
              </div>
          </div>

          <div class="info-section">
              <div class="section-title">بيانات البرنامج</div>
              <div class="info-grid">
                  ${formData.performanceItem ? `
                  <div class="info-item full-width">
                      <div class="info-label">المعيار من معايير الأداء الوظيفي</div>
                      <div class="info-value">${formData.performanceItem}</div>
                  </div>
                  ` : ''}
                  ${formData.performanceElement ? `
                  <div class="info-item full-width">
                      <div class="info-label">المؤشر</div>
                      <div class="info-value">${formData.performanceElement}</div>
                  </div>
                  ` : ''}
                  <div class="info-item full-width">
                      <div class="info-label">اسم البرنامج</div>
                      <div class="info-value">${formData.programName || 'غير محدد'}</div>
                  </div>
                  <div class="info-item">
                      <div class="info-label">تاريخ التنفيذ</div>
                      <div class="info-value">${executionDate || 'غير محدد'}</div>
                  </div>
                  <div class="info-item">
                      <div class="info-label">المستهدفون</div>
                      <div class="info-value">${formData.targetAudience || 'غير محدد'}</div>
                  </div>
              </div>
          </div>

          ${formData.programGoals.filter(g => g.trim()).length > 0 ? `
          <div class="goals-section">
              <div class="section-title">أهداف البرنامج</div>
              ${formData.programGoals.filter(g => g.trim()).map((goal, index) => 
                `<div class="goal-item">${toArabicNumbers((index + 1).toString())}. ${goal}</div>`
              ).join('')}
          </div>
          ` : ''}

          ${Object.values(images).some(img => img) ? `
          <div class="evidence-section">
              <div class="section-title">الشواهد</div>
              <div class="evidence-grid">
                  ${images.img1 ? `<div class="evidence-item"><img src="${images.img1}" alt="الشاهد 1"></div>` : ''}
                  ${images.img2 ? `<div class="evidence-item"><img src="${images.img2}" alt="الشاهد 2"></div>` : ''}
                  ${images.img3 ? `<div class="evidence-item"><img src="${images.img3}" alt="الشاهد 3"></div>` : ''}
                  ${images.img4 ? `<div class="evidence-item"><img src="${images.img4}" alt="الشاهد 4"></div>` : ''}
              </div>
          </div>
          ` : ''}

          <div class="signature-section">
              <div class="signature-box">
                  <div class="signature-box-title">المعلم</div>
                  <div class="signature-name">${formData.teacherName || 'غير محدد'}</div>
                  ${signatureImage ? `<img src="${signatureImage}" alt="توقيع المعلم">` : '<div style="height:80px;"></div>'}
              </div>
              <div class="signature-box">
                  <div class="signature-box-title">مدير المدرسة</div>
                  <div class="signature-name">${formData.principalName || 'غير محدد'}</div>
              </div>
          </div>

          <div class="footer">
              العام الدراسي ${toArabicNumbers(formData.academicYear)}
          </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
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
      <div className="mb-6 p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📄</div>
          <div>
            <h2 className="text-2xl font-bold">النموذج العام للشواهد</h2>
            <p className="text-indigo-100 mt-1">نموذج شامل لتوثيق البرامج والمبادرات التعليمية</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
        
        {/* البيانات الأساسية */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            البيانات الأساسية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المعلم</label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="أدخل اسم المعلم"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم مدير المدرسة</label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="أدخل اسم مدير المدرسة"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المدرسة</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="أدخل اسم المدرسة الكامل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العام الدراسي</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                placeholder="1447"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* بيانات البرنامج */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">بيانات البرنامج</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المعيار من معايير الأداء الوظيفي</label>
              <select
                value={formData.performanceItem}
                onChange={(e) => {
                  setFormData({...formData, performanceItem: e.target.value, performanceElement: ""});
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="">اختر المعيار</option>
                {Object.keys(performanceItemsWithElements).map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {formData.performanceItem && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المؤشر</label>
                <select
                  value={formData.performanceElement}
                  onChange={(e) => setFormData({...formData, performanceElement: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  <option value="">اختر المؤشر</option>
                  {performanceItemsWithElements[formData.performanceItem as keyof typeof performanceItemsWithElements]?.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم البرنامج</label>
              <input
                type="text"
                value={formData.programName}
                onChange={(e) => setFormData({...formData, programName: e.target.value})}
                placeholder="مثال: برنامج تحفيز التفوق الدراسي"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">أهداف البرنامج</label>
              <div className="space-y-2">
                {formData.programGoals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...formData.programGoals];
                        newGoals[index] = e.target.value;
                        setFormData({...formData, programGoals: newGoals});
                      }}
                      placeholder={`الهدف ${index + 1}`}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                    {formData.programGoals.length > 1 && (
                      <button
                        onClick={() => {
                          const newGoals = formData.programGoals.filter((_, i) => i !== index);
                          setFormData({...formData, programGoals: newGoals});
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setFormData({...formData, programGoals: [...formData.programGoals, ""]})}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة هدف
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاريخ التنفيذ (هجري)</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
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
                  <select
                    value={formData.executionMonth}
                    onChange={(e) => setFormData({...formData, executionMonth: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">الشهر</option>
                    {hijriMonths.map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={formData.executionYear}
                    onChange={(e) => setFormData({...formData, executionYear: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  >
                    <option value="">السنة</option>
                    {Array.from({length: 10}, (_, i) => 1445 + i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المستهدفون</label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="مثال: طلاب الصف الثالث المتوسط"
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* الشعار والتوقيع */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            الشعار والتوقيع
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">شعار وزارة التعليم:</label>
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                {logoImage ? (
                  <div className="relative">
                    <img 
                      src={logoImage} 
                      alt="شعار وزارة التعليم" 
                      className="max-w-full h-auto object-contain mx-auto mb-3"
                      style={{maxHeight: '200px'}}
                    />
                    <button
                      onClick={() => setLogoImage("")}
                      className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      حذف الصورة
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة الشعار</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                  </label>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">توقيع المعلم:</label>
              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center bg-white dark:bg-slate-800">
                {signatureImage ? (
                  <div className="relative">
                    <img 
                      src={signatureImage} 
                      alt="توقيع المعلم" 
                      className="max-h-24 mx-auto object-contain mb-3"
                    />
                    <button
                      onClick={() => setSignatureImage("")}
                      className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      حذف الصورة
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                    <svg className="w-12 h-12 mx-auto text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">انقر لرفع صورة التوقيع</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG أو SVG</p>
                  </label>
                )}
              </div>
            </div>
          </div>
          
          {/* مربع رفع الباركود */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">باركود التقرير (اختياري):</label>
            <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center max-w-xs mx-auto bg-white dark:bg-slate-800">
              {barcodeImage ? (
                <div className="relative">
                  <img src={barcodeImage} alt="الباركود" className="w-32 h-32 mx-auto object-contain" />
                  <button
                    onClick={() => setBarcodeImage("")}
                    className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    حذف الباركود
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBarcodeUpload}
                    className="hidden"
                  />
                  <div className="text-blue-600 dark:text-blue-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="font-semibold">انقر لرفع صورة الباركود</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* رفع الشواهد (4 صور) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">الشواهد (4 صور)</h3>
          <p className="text-red-600 font-bold text-center mb-4">
            لا يتم الاحتفاظ بأي صور أو معلومات في الموقع
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['img1', 'img2', 'img3', 'img4'] as const).map((imgKey, index) => (
              <div key={imgKey} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الشاهد {index + 1}
                </label>
                {images[imgKey] ? (
                  <div className="relative">
                    <img src={images[imgKey]!} alt={`الشاهد ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
                    <button
                      onClick={() => setImages({...images, [imgKey]: null})}
                      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">اضغط لرفع الصورة</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(imgKey, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={handlePrint}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            طباعة التقرير كـ PDF
          </button>
        </div>
      </div>
    </div>
  );
}
