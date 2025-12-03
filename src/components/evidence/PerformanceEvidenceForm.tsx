"use client";

import { useState, useEffect } from "react";

interface PerformanceFormProps {
  onBack?: () => void;
}

const performanceItemsWithElements = {
  "أداء الواجبات الوظيفية": [
    "الالتزام بالنظام الرسمي",
    "كتابة التحضير وفق الجدول الدراسي",
    "المشاركة في الإشراف والمناوبة وحصص الانتظار",
    "متابعة الواجبات والدروس والاختبارات",
    "المشاركة في الأنشطة اللاصفية في بيئة العمل",
    "المشاركة في برامج النشاط المدرسي"
  ],
  "التفاعل مع المجتمع المهني": [
    "المشاركة الفاعلة في مجتمعات التعلم المهنية",
    "الدروس التطبيقية وتبادل الزيارات",
    "التفاعل في الدورات والورش",
    "برامج الإنتاج المعرفي في التخصص"
  ],
  "التفاعل مع أولياء الأمور": [
    "التواصل الإيجابي مع أولياء الأمور",
    "توظيف وسائل وتطبيقات التقنية الحديثة",
    "إرسال الخطة الأسبوعية في وقت مبكر",
    "استخدام أنماط اتصالية متنوعة"
  ],
  "التنويع في استراتيجيات التدريس": [
    "استخدام استراتيجيات وطرائق التدريس",
    "استخدام أساليب تدريسية إبداعية وجاذبة"
  ],
  "تحسين نتائج المتعلمين": [
    "تشخيص مستوى إتقان الطلبة في المادة",
    "معالجة الفاقد التعليمي",
    "وضع الخطط العلاجية للطلاب الضعاف",
    "وضع الخطط الإثرائية للطلاب المتميزين",
    "تكريم الطلاب المتميزين"
  ],
  "إعداد وتنفيذ خطة التعلم": [
    "اكتمال الواجبات والاختبارات",
    "تنفيذ الدروس وفق الجداول"
  ],
  "توظيف تقنيات ووسائل التعلم": [
    "التنويع في الوسائل التعليمية",
    "توظيف وسائل وتطبيقات تقنية ومعلوماتية",
    "تفعيل التعلم بمصادر التعلم المختلفة"
  ],
  "تهيئة البيئة التعليمية": [
    "مراعاة الفروق الفردية وحاجات الطلاب",
    "تحفيز الطلاب مادياً ومعنوياً",
    "تفعيل أدوات متنوعة في الدرس"
  ],
  "الإدارة الصفية": [
    "ضبط سلوك الطلاب في الحصة",
    "أداء الطلاب في الأنشطة بشكل متعاون أو فردي",
    "إشراك الطلاب في ضبط القواعد الصفية"
  ],
  "تحليل نتائج المتعلمين": [
    "استخدام نتائج التقويم في التخطيط",
    "تحليل نتائج الطلاب وتشخيص مستوياتهم",
    "تقديم التغذية الراجعة"
  ],
  "تنوع أساليب التقويم": [
    "التنويع في أساليب التقويم",
    "استخدام التقويم التكويني والختامي",
    "توظيف التقويم الإلكتروني",
    "الالتزام بتعليمات ولوائح الاختبارات"
  ]
};

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني", 
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

export default function PerformanceEvidenceForm({ onBack }: PerformanceFormProps) {
  const getCurrentHijriDate = () => {
    try {
      const today = new Date();
      const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        numberingSystem: 'latn'
      });
      
      const dayFormatter = new Intl.DateTimeFormat('ar-SA', {
        weekday: 'long'
      });
      const dayName = dayFormatter.format(today);
      
      const parts = formatter.formatToParts(today);
      const day = parts.find(p => p.type === 'day')?.value || '1';
      const month = parts.find(p => p.type === 'month')?.value || '1';
      const year = parts.find(p => p.type === 'year')?.value || '1447';
      
      return {
        day: day,
        month: month,
        year: year,
        dayName: dayName
      };
    } catch (error) {
      return {
        day: '25',
        month: '5',
        year: '1447',
        dayName: 'السبت'
      };
    }
  };
  
  const currentDate = getCurrentHijriDate();
  
  const [formData, setFormData] = useState({
    teacherName: "عبدالله حسن الفيفي",
    principalName: "احمد علي كريري",
    schoolName: "مدرسة ابن سيناء المتوسطة\nوبرنامجي العوق الفكري والتوحد",
    academicYear: "1447",
    performanceItem: "",
    performanceElement: "",
    programName: "",
    programGoals: [""],
    executionDay: currentDate.day,
    executionMonth: currentDate.month,
    executionYear: currentDate.year,
    executionDayName: currentDate.dayName,
    targetAudience: "الصف الثالث المتوسط",
    implementer: "عبدالله حسن الفيفي",
  });

  const [logoImage, setLogoImage] = useState<string>("");
  const [signatureImage, setSignatureImage] = useState<string>("");
  const [principalSignatureImage, setPrincipalSignatureImage] = useState<string>("");
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

  useEffect(() => {
    setLogoImage('/images/moe-logo.WEBP');
    setSignatureImage('/images/signature.png');
  }, []);

  // دالة مساعدة لتحويل HEIC
  const convertHEICtoJPEG = async (file: File): Promise<string> => {
    const heic2any = (await import('heic2any')).default;
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9
    }) as Blob;
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(convertedBlob);
    });
  };

  const handleImageUpload = async (
    key: 'img1' | 'img2' | 'img3' | 'img4',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setImages({ ...images, [key]: dataUrl });
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages({ ...images, [key]: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setLogoImage(dataUrl);
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setLogoImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setSignatureImage(dataUrl);
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSignatureImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePrincipalSignatureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setPrincipalSignatureImage(dataUrl);
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPrincipalSignatureImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleBarcodeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setBarcodeImage(dataUrl);
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setBarcodeImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePrint = () => {
    const toArabicNumbers = (str: string | number) => {
      const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return String(str).replace(/\d/g, d => arabicNums[parseInt(d)]);
    };

    const monthNumber = typeof formData.executionMonth === 'string' 
      ? formData.executionMonth.replace(/[^\d]/g, '') 
      : String(formData.executionMonth);
    
    const executionDate = `${formData.executionDayName || ''} ${toArabicNumbers(formData.executionYear)}/${toArabicNumbers(monthNumber)}/${toArabicNumbers(formData.executionDay)}`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
          <meta charset="UTF-8">
          <title>شاهد الأداء الوظيفي - ${formData.performanceItem}</title>
          <style>
              * {
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              body {
                  font-family: Arial, sans-serif;
                  margin: 10px;
                  direction: rtl;
                  line-height: 1.6;
                  color: #333;
                  font-size: 14px;
                  background: white !important;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
              }
              .header {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.4rem 0.8rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-bottom: 0.8rem;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 1rem;
              }
              .logo-container {
                  width: 120px;
                  height: 120px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              .logo-container img {
                  width: 100px;
                  height: 100px;
                  object-fit: contain;
              }
              .header-text {
                  flex: 1;
                  text-align: center;
              }
              .header-text h3 {
                  margin: 0 0 0.2rem 0;
                  font-size: 1rem;
                  font-weight: 700;
                  text-rendering: optimizeLegibility;
                  letter-spacing: 0.3px;
              }
              .header-text h4 {
                  margin: 0 0 0.15rem 0;
                  font-size: 0.85rem;
              }
              .school-name {
                  margin-top: 0.3rem;
                  font-size: 0.95rem;
                  font-weight: bold;
                  white-space: pre-line;
              }
              .info-section {
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  padding: 0.5rem;
                  margin-bottom: 0.6rem;
              }
              .section-title {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.3rem;
                  border-radius: 4px;
                  text-align: center;
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                  font-size: 0.95rem;
              }
              .info-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 0.4rem;
              }
              .info-item {
                  display: flex;
                  align-items: center;
                  border: 1px solid #3D7EB9 !important;
                  padding: 0.25rem;
                  border-radius: 4px;
                  background: white !important;
              }
              .info-label {
                  color: #3D7EB9 !important;
                  font-weight: bold;
                  font-size: 0.85rem;
                  min-width: 100px;
                  border-right: 2px solid #3D7EB9 !important;
                  padding-right: 0.3rem;
                  margin-right: 0.3rem;
              }
              .info-value {
                  flex: 1;
                  font-size: 0.85rem;
                  font-weight: bold;
              }
              .full-width {
                  grid-column: 1 / -1;
              }
              .evidence-section {
                  margin-top: 0.6rem;
                  padding: 0.5rem;
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
              }
              .evidence-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 0.5rem;
                  margin-top: 0.4rem;
              }
              .evidence-item {
                  page-break-inside: avoid;
              }
              .evidence-item img {
                  width: 100% !important;
                  height: 160px !important;
                  object-fit: cover;
                  border-radius: 6px;
                  border: 2px solid #3D7EB9 !important;
                  display: block !important;
                  max-width: 100% !important;
                  image-rendering: -webkit-optimize-contrast;
              }
              .signature-section {
                  margin-top: 0.8rem;
                  padding: 0.5rem;
                  border-top: 2px solid #e5e7eb;
                  display: grid;
                  grid-template-columns: 1fr auto 1fr;
                  gap: 1.5rem;
                  align-items: end;
              }
              .signature-box {
                  padding: 0.3rem;
                  text-align: center;
                  min-height: 60px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
              }
              .signature-box-title {
                  color: #666 !important;
                  padding: 0.2rem;
                  font-weight: 600;
                  margin-bottom: 0.15rem;
                  font-size: 0.9rem;
              }
              .signature-name {
                  font-size: 1rem;
                  font-weight: bold;
                  color: #333;
                  margin: 0.3rem 0;
              }
              .signature-box img {
                  max-height: 50px;
                  max-width: 120px;
                  object-fit: contain;
                  margin: 0.2rem auto;
                  display: block;
              }
              .barcode-container {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 0.3rem;
              }
              .barcode-container img {
                  max-height: 60px;
                  max-width: 150px;
                  object-fit: contain;
              }
              .footer {
                  margin-top: 0.8rem;
                  text-align: center;
                  font-size: 0.85rem;
                  color: #666;
                  border-top: 1px solid #ddd;
                  padding-top: 0.4rem;
              }
              @media print {
                  @page {
                      size: A4;
                      margin: 10mm;
                  }
                  body {
                      margin: 0;
                      padding: 0;
                  }
              }
          </style>
      </head>
      <body>
          <div class="header">
              <div class="logo-container">
                  ${logoImage ? `<img src="${logoImage}" alt="وزارة التعليم">` : ''}
              </div>
              <div class="header-text">
                  <h3>المملكة العربية السعودية</h3>
                  <h4>وزارة التعليم</h4>
                  <h4>إدارة التعليم بمنطقة جازان</h4>
                  <div class="school-name">${formData.schoolName}</div>
              </div>
              <div class="logo-container">
              </div>
          </div>

          <div class="info-section">
              <div class="section-title">شاهد الأداء الوظيفي</div>
              <div class="info-grid">
                  <div class="info-item">
                      <span class="info-label">اسم المعلم:</span>
                      <span class="info-value">${formData.teacherName}</span>
                  </div>
                  <div class="info-item">
                      <span class="info-label">العام الدراسي:</span>
                      <span class="info-value">${toArabicNumbers(formData.academicYear)} هـ</span>
                  </div>
                  <div class="info-item full-width">
                      <span class="info-label">المعيار:</span>
                      <span class="info-value">${formData.performanceItem || 'غير محدد'}</span>
                  </div>
                  <div class="info-item full-width">
                      <span class="info-label">المؤشر:</span>
                      <span class="info-value">${formData.performanceElement || 'غير محدد'}</span>
                  </div>
              </div>
          </div>

          ${formData.programName ? `
          <div class="info-section">
              <div class="section-title">تفاصيل البرنامج / المبادرة</div>
              <div class="info-grid">
                  <div class="info-item full-width">
                      <span class="info-label">اسم البرنامج:</span>
                      <span class="info-value">${formData.programName}</span>
                  </div>
                  ${formData.programGoals.filter(g => g.trim()).length > 0 ? `
                  <div class="info-item full-width">
                      <span class="info-label">الأهداف:</span>
                      <span class="info-value">
                          ${formData.programGoals.filter(g => g.trim()).map((goal, i) => `${i + 1}. ${goal}`).join('<br>')}
                      </span>
                  </div>
                  ` : ''}
                  <div class="info-item">
                      <span class="info-label">الفئة المستهدفة:</span>
                      <span class="info-value">${formData.targetAudience}</span>
                  </div>
                  <div class="info-item">
                      <span class="info-label">المنفذ:</span>
                      <span class="info-value">${formData.implementer}</span>
                  </div>
                  <div class="info-item full-width">
                      <span class="info-label">تاريخ التنفيذ:</span>
                      <span class="info-value">${executionDate}</span>
                  </div>
              </div>
          </div>
          ` : ''}

          ${Object.values(images).some(img => img) ? `
          <div class="evidence-section">
              <div class="section-title">الشواهد المصورة</div>
              <div class="evidence-grid">
                  ${Object.values(images).map((img, idx) => img ? `
                  <div class="evidence-item">
                      <img src="${img}" alt="شاهد ${idx + 1}" loading="eager" decoding="sync">
                  </div>
                  ` : '').join('')}
              </div>
          </div>
          ` : ''}

          <div class="signature-section">
              <div class="signature-box">
                  <div class="signature-box-title">المعلم:</div>
                  <div class="signature-name">${formData.teacherName}</div>
                  ${signatureImage ? `<img src="${signatureImage}" alt="توقيع المعلم">` : ''}
              </div>
              <div class="barcode-container">
                  ${barcodeImage ? `<img src="${barcodeImage}" alt="باركود">` : ''}
              </div>
              <div class="signature-box">
                  <div class="signature-box-title">قائد المدرسة:</div>
                  <div class="signature-name">${formData.principalName}</div>
                  ${principalSignatureImage ? `<img src="${principalSignatureImage}" alt="توقيع القائد">` : ''}
              </div>
          </div>

          <div class="footer">
              تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA-u-ca-islamic-umalqura')}
          </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // انتظار تحميل جميع الصور قبل الطباعة - مع وقت أطول للصور الكبيرة
    printWindow.onload = () => {
      const allImages = printWindow.document.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = allImages.length;

      if (totalImages === 0) {
        // لا توجد صور، طباعة مباشرة
        setTimeout(() => printWindow.print(), 500);
        return;
      }

      const checkAndPrint = () => {
        if (loadedCount === totalImages) {
          // انتظار إضافي 1 ثانية بعد تحميل كل الصور لضمان العرض
          setTimeout(() => printWindow.print(), 1000);
        }
      };

      allImages.forEach((img) => {
        if (img.complete && img.naturalHeight > 0) {
          loadedCount++;
          checkAndPrint();
        } else {
          img.onload = () => {
            loadedCount++;
            checkAndPrint();
          };
          img.onerror = () => {
            console.error('فشل تحميل صورة:', img.src.substring(0, 50));
            loadedCount++;
            checkAndPrint();
          };
        }
      });

      // Fallback: طباعة بعد 5 ثواني حتى لو لم تكتمل الصور
      setTimeout(() => {
        if (loadedCount < totalImages) {
          console.warn(`تم تحميل ${loadedCount} من ${totalImages} صورة فقط`);
          printWindow.print();
        }
      }, 5000);
    };
  };

  const getElements = () => {
    if (!formData.performanceItem) return [];
    return performanceItemsWithElements[formData.performanceItem as keyof typeof performanceItemsWithElements] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300"
                >
                  <span>←</span>
                  <span>رجوع</span>
                </button>
              )}
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  شاهد الأداء الوظيفي
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  نموذج موحد لتوثيق معايير ومؤشرات الأداء الوظيفي
                </p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl">🖨️</span>
              <span className="font-semibold">طباعة</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-6">
            {/* معلومات أساسية */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  اسم المعلم <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teacherName}
                  onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  اسم قائد المدرسة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.principalName}
                  onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  اسم المدرسة <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.schoolName}
                  onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  العام الدراسي <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                  placeholder="مثال: 1447"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* المعيار والمؤشر */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  المعيار <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.performanceItem}
                  onChange={(e) => {
                    setFormData({...formData, performanceItem: e.target.value, performanceElement: ""});
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                >
                  <option value="">اختر المعيار</option>
                  {Object.keys(performanceItemsWithElements).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  المؤشر <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.performanceElement}
                  onChange={(e) => setFormData({...formData, performanceElement: e.target.value})}
                  disabled={!formData.performanceItem}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">اختر المؤشر</option>
                  {getElements().map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* تفاصيل البرنامج */}
            <div className="space-y-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  اسم البرنامج / المبادرة
                </label>
                <input
                  type="text"
                  value={formData.programName}
                  onChange={(e) => setFormData({...formData, programName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                  placeholder="مثال: ورشة استراتيجيات التدريس الحديثة"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    الأهداف
                  </label>
                  <button
                    onClick={() => setFormData({...formData, programGoals: [...formData.programGoals, ""]})}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm"
                  >
                    <span>+</span>
                    <span>إضافة هدف</span>
                  </button>
                </div>
                <div className="space-y-3">
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
                        className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                        placeholder={`الهدف ${index + 1}`}
                      />
                      {formData.programGoals.length > 1 && (
                        <button
                          onClick={() => {
                            const newGoals = formData.programGoals.filter((_, i) => i !== index);
                            setFormData({...formData, programGoals: newGoals});
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    الفئة المستهدفة
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    المنفذ
                  </label>
                  <input
                    type="text"
                    value={formData.implementer}
                    onChange={(e) => setFormData({...formData, implementer: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* تاريخ التنفيذ */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  تاريخ التنفيذ (هجري)
                </label>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">اليوم</label>
                    <select
                      value={formData.executionDayName}
                      onChange={(e) => setFormData({...formData, executionDayName: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all text-sm"
                    >
                      <option value="الأحد">الأحد</option>
                      <option value="الإثنين">الإثنين</option>
                      <option value="الثلاثاء">الثلاثاء</option>
                      <option value="الأربعاء">الأربعاء</option>
                      <option value="الخميس">الخميس</option>
                      <option value="الجمعة">الجمعة</option>
                      <option value="السبت">السبت</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">التاريخ</label>
                    <input
                      type="text"
                      value={formData.executionDay}
                      onChange={(e) => setFormData({...formData, executionDay: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all text-sm"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">الشهر</label>
                    <select
                      value={formData.executionMonth}
                      onChange={(e) => setFormData({...formData, executionMonth: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all text-sm"
                    >
                      {hijriMonths.map((month, index) => (
                        <option key={month} value={String(index + 1)}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">السنة</label>
                    <input
                      type="text"
                      value={formData.executionYear}
                      onChange={(e) => setFormData({...formData, executionYear: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all text-sm"
                      placeholder="1447"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* رفع الصور */}
            <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                الشواهد والصور
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['img1', 'img2', 'img3', 'img4'] as const).map((key, index) => (
                  <div key={key} className="text-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      صورة {index + 1}
                    </label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(key, e)}
                        className="hidden"
                        id={`file-${key}`}
                      />
                      <label
                        htmlFor={`file-${key}`}
                        className="block cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-all h-32 flex items-center justify-center overflow-hidden"
                      >
                        {images[key] ? (
                          <img
                            src={images[key]!}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="text-3xl mb-1">📷</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              اضغط للرفع
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* رفع الملفات الإضافية */}
            <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                الملفات الإضافية
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    شعار وزارة التعليم
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full text-sm"
                  />
                  {logoImage && (
                    <img src={logoImage} alt="شعار" className="mt-2 h-16 object-contain" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    توقيع المعلم
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="w-full text-sm"
                  />
                  {signatureImage && (
                    <img src={signatureImage} alt="توقيع" className="mt-2 h-16 object-contain" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    توقيع القائد
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePrincipalSignatureUpload}
                    className="w-full text-sm"
                  />
                  {principalSignatureImage && (
                    <img src={principalSignatureImage} alt="توقيع القائد" className="mt-2 h-16 object-contain" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الباركود
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBarcodeUpload}
                    className="w-full text-sm"
                  />
                  {barcodeImage && (
                    <img src={barcodeImage} alt="باركود" className="mt-2 h-16 object-contain" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
