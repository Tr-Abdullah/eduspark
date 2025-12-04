'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { School, FileText, User, Users, Calendar, MessageSquare, Upload, X, Eye, Printer } from 'lucide-react';

interface FormData {
  schoolName: string;
  schoolLogo: string;
  studentName: string;
  studentGrade: string;
  studentClass: string;
  referralDate: string;
  referralReason: string;
  referralDetails: string;
  referredTo: 'نبيل الشيخ' | 'إيهاب زعقان' | 'رمزي زعقان' | '';
  referredToPosition: string;
  teacherName: string;
  teacherSignature: string;
  recipientSignature: string;
  principalSignature: string;
  principalName: string;
  academicYear: string;
  barcode: string;
}

// قوائم الطلاب حسب الفصول
const studentsData: { [key: string]: string[] } = {
  'أ': [
    'أحمد عبدالله قصير',
    'أحمد هيثم زيلعي',
    'أسامه يحي آل مييش',
    'ايهم عبدالله باعشن',
    'بندر سامي عبده',
    'تركي يحي ضعافي',
    'ثامر احمد مغفوري',
    'حافظ امجد علاقي',
    'حسن بندر الجهني',
    'رامي ايمن الجهني',
    'زياد حسن عباس',
    'زيد عبدالله عوض',
    'سامي جمعان الغامدي',
    'شادي سامي شاذلي',
    'عبدالرحمن هادي الزهراوي',
    'عبدالعزيز سعود غيش',
    'فيصل احمد سود',
    'مازن ابراهيم قب',
    'محمد صبري بريك',
    'محمد عبدالكريم احمد',
    'مناف صبري عثمان',
    'وسام عثمان عبده',
  ],
  'ب': [
    'أبكر حسن مصري',
    'أحمد سامي بحيص',
    'أسامه علي صنجاء',
    'ابراهيم يحي دهل',
    'احمد محمد سليمان',
    'احمد مجدي بكري',
    'انيس يحي شامي',
    'بندر عبده مصري',
    'راكان محمد السبيعي',
    'صالح حسين مكين',
    'ظافر علي آل سالم',
    'عبدالرحيم حسن الطقيقى',
    'عبدالعزيز رمزي ابوراسين',
    'عبدالله علي علي',
    'مراد ماجد شراحيلي',
    'مصطفى محمد حسين',
    'مهند ابراهيم هاشم',
    'مياد عمر حوباني',
    'محمد عابد عواجي',
    'هتان محمد عمر',
    'يامن علي مجربي',
    'يوسف علي آل سالم',
    'يزن احمد الغرة',
    'زياد ماجد شراحيلي',
  ],
  'ج': [
    'ابراهيم شاكر حوباني',
    'أحمد محمد العمري',
    'احمد مصطفى القربي',
    'اياد رمزي ايوب',
    'البدر توفيق خواجي',
    'الزاكي محمد شعيب',
    'بسام علي مقري',
    'خالد عبدالعزيز القطيبي',
    'راكان حسن جري',
    'سلطان يحي عبيري',
    'عبدالاله ماجد زيلع',
    'عبدالرحمن احمد ابوطالب',
    'عبدالرحمن احمد احمد',
    'عبدالرحمن علوان عقيل',
    'عبدالعزيز ابراهيم بحيص',
    'عبدالكريم محمد حمادي',
    'فارس طلال يماني',
    'فؤاد محمد جغادي',
    'مازن محرم الشعراوي',
    'محمد احمد عواجي',
    'محمد خليل قحطاني',
    'مشعل أحمد بامسدوس',
    'نواف بندر زيلعي',
    'نواف محمد حكمي',
  ],
  'د': [
    'برهان نبيل الصديق',
    'حسام بلال القاضي',
    'رياض محمد دوس',
    'سعود عمرو كوكو',
    'عبدالعزيز محمد ونس',
    'عمر وسيم بيطار',
    'فهد حافظ غالب',
    'فوزي اديب الراجحي',
    'مالك بلال قاسم',
    'ماهر محمد محمود',
    'مدني محسن خردلي',
    'مروان محمد بريك',
    'مصطفى محمد الذيب',
    'معاذ سالم غالب',
    'معاذ محمد محمد',
    'معتصم علي شراحيلي',
    'مهاب حمد احمد',
    'مهند علي نابوش',
    'مهند عمر كلفوت',
    'محمد ابكر زعقان',
    'ناصر علي الاخرش',
    'وائل عبدالحكيم علي',
    'يزن سعيد سعيده',
  ],
};

const StudentReferralForm: React.FC = () => {
  const [availableStudents, setAvailableStudents] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    schoolName: 'مدرسة ابن سيناء المتوسطة\nوبرنامجي العوق الفكري والتوحد',
    schoolLogo: '',
    studentName: '',
    studentGrade: 'الثالث المتوسط',
    studentClass: 'أ',
    referralDate: new Date().toISOString().split('T')[0],
    referralReason: '',
    referralDetails: '',
    referredTo: '',
    referredToPosition: '',
    teacherName: 'عبدالله حسن الفيفي',
    teacherSignature: '',
    recipientSignature: '',
    principalSignature: '',
    principalName: 'احمد علي كريري',
    academicYear: '1447',
    barcode: '',
  });

  const [logoImage, setLogoImage] = useState<string>('');
  const [teacherSigImage, setTeacherSigImage] = useState<string>('');
  const [recipientSigImage, setRecipientSigImage] = useState<string>('');
  const [principalSigImage, setPrincipalSigImage] = useState<string>('');
  const [barcodeImage, setBarcodeImage] = useState<string>('');
  const [evidenceImage1, setEvidenceImage1] = useState<string>('');
  const [evidenceImage2, setEvidenceImage2] = useState<string>('');
  const [evidenceImage3, setEvidenceImage3] = useState<string>('');
  const [evidenceImage4, setEvidenceImage4] = useState<string>('');
  const [evidenceImage5, setEvidenceImage5] = useState<string>('');

  // تحميل الشعار والتوقيعات من localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLogo = localStorage.getItem('school-logo');
      const savedTeacherSig = localStorage.getItem('teacher-signature');
      const savedPrincipalSig = localStorage.getItem('principal-signature');
      const savedBarcode = localStorage.getItem('school-barcode');
      
      if (savedLogo) setLogoImage(savedLogo);
      if (savedTeacherSig) setTeacherSigImage(savedTeacherSig);
      if (savedPrincipalSig) setPrincipalSigImage(savedPrincipalSig);
      if (savedBarcode) setBarcodeImage(savedBarcode);
    }
  }, []);

  // تحديث قائمة الطلاب عند تغيير الفصل
  useEffect(() => {
    const students = studentsData[formData.studentClass] || [];
    setAvailableStudents(students);
    // إعادة تعيين اسم الطالب عند تغيير الفصل
    setFormData(prev => ({ ...prev, studentName: '' }));
  }, [formData.studentClass]);

  // تحويل HEIC إلى JPEG
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
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHEIC = file.type === 'image/heic' || file.type === 'image/heif' || 
                     file.name.toLowerCase().endsWith('.heic') || 
                     file.name.toLowerCase().endsWith('.heif');
      
      if (isHEIC) {
        try {
          const dataUrl = await convertHEICtoJPEG(file);
          setter(dataUrl);
        } catch (error) {
          console.error('HEIC conversion error:', error);
          alert('فشل تحويل صورة HEIC. الرجاء استخدام صيغة JPG أو PNG');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setter(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleReferredToChange = (value: string) => {
    let position = '';
    if (value === 'نبيل الشيخ' || value === 'إيهاب زعقان') {
      position = 'الموجه الطلابي';
    } else if (value === 'رمزي زعقان') {
      position = 'وكيل الشؤون الطلابية';
    }
    setFormData({ 
      ...formData, 
      referredTo: value as FormData['referredTo'], 
      referredToPosition: position 
    });
  };

  const toArabicNumbers = (num: string) => {
    const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.replace(/\d/g, (d) => arabicNums[parseInt(d)]);
  };

  const handlePreview = () => {
    generatePrint(false);
  };

  const handlePrint = () => {
    generatePrint(true);
  };

  const generatePrint = (autoPrint: boolean) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>إحالة طالب - ${formData.studentName}</title>
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
                  margin: 0 0 0.2rem 0;
                  font-size: 1.25rem;
                  letter-spacing: 0.5px;
                  word-spacing: 2px;
                  font-weight: 700;
                  text-rendering: optimizeLegibility;
              }
              .header-text h4 {
                  margin: 0 0 0.15rem 0;
                  font-size: 1.1rem;
                  letter-spacing: 0.3px;
              }
              .school-name-header {
                  margin-top: 0.3rem;
                  font-size: 1.15rem;
                  font-weight: bold;
                  white-space: normal;
                  line-height: 1.4;
              }
              .school-name-header {
                  margin-top: 0.3rem;
                  font-size: 1.15rem;
                  font-weight: bold;
                  white-space: normal;
                  line-height: 1.4;
              }
              
              /* في الطباعة: منع الالتفاف مع الحفاظ على حجم خط مناسب */
              @media print {
                .school-name-header {
                  white-space: nowrap !important;
                  font-size: 1.1rem !important;
                  overflow: hidden;
                }
                .header-text h3 {
                  font-size: 1.2rem !important;
                }
                .header-text h4 {
                  font-size: 1.05rem !important;
                }
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
                  font-size: 1.1rem;
              }
              .info-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
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
                  font-size: 1rem;
                  min-width: 100px;
                  border-right: 2px solid #3D7EB9 !important;
                  padding-right: 0.3rem;
                  margin-right: 0.3rem;
              }
              .info-value {
                  flex: 1;
                  font-size: 1rem;
                  font-weight: bold;
              }
              
              /* في الطباعة */
              @media print {
                .info-label {
                  font-size: 0.9rem !important;
                }
                .info-value {
                  font-size: 0.9rem !important;
                }
                .section-title {
                  font-size: 1rem !important;
                }
                .signature-box-title {
                  font-size: 0.95rem !important;
                }
                .signature-name {
                  font-size: 1rem !important;
                }
                .footer {
                  font-size: 1rem !important;
                }
              }
              }
              .content-box {
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  padding: 0.5rem;
                  margin-bottom: 0.6rem;
                  font-size: 1rem;
                  font-weight: bold;
              }
              .referral-to-section {
                  background: white !important;
                  border: 2px solid #3D7EB9 !important;
                  border-radius: 8px;
                  padding: 0.5rem;
                  margin-bottom: 0.6rem;
              }
              .referral-to-content {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0.5rem;
                  background: rgba(61, 126, 185, 0.1);
                  border-radius: 4px;
                  gap: 1rem;
              }
              .referral-to-content .label {
                  color: #3D7EB9 !important;
                  font-weight: bold;
                  font-size: 1rem;
              }
              .referral-to-content .value {
                  color: #15445A;
                  font-weight: bold;
                  font-size: 1.1rem;
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
                  margin-top: 0.3rem;
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
                  color: #333 !important;
                  padding: 0.2rem;
                  font-weight: bold;
                  margin-bottom: 0.15rem;
                  font-size: 1rem;
              }
              .signature-name {
                  font-size: 1.1rem;
                  font-weight: bold;
                  color: #333;
                  margin: 0.3rem 0;
              }
              .signature-box img {
                  max-width: 150px;
                  height: 40px;
                  object-fit: contain;
                  margin: 0.2rem auto;
              }
              .barcode-center {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0.5rem;
              }
              .barcode-center img {
                  width: 120px;
                  height: 120px;
                  object-fit: contain;
              }
              .footer {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.6rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-top: 0.2rem;
                  font-size: 1.05rem;
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
                      margin: 0.4cm;
                      size: A4;
                  }
                  /* إخفاء رابط الصفحة في الطباعة */
                  header, footer {
                      display: none !important;
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
                  <div class="school-name-header">${formData.schoolName.split('\n').join(' ')}</div>
              </div>
              <div class="logo-container">
                  <div style="width:120px;height:120px;"></div>
              </div>
          </div>

          <div class="info-section">
              <div class="section-title">تقرير: إحالة طالب</div>
              <div class="info-grid">
                  <div class="info-item">
                      <div class="info-label">اسم الطالب</div>
                      <div class="info-value">${formData.studentName || 'غير محدد'}</div>
                  </div>
                  <div class="info-item">
                      <div class="info-label">الصف</div>
                      <div class="info-value">${formData.studentGrade}</div>
                  </div>
                  <div class="info-item">
                      <div class="info-label">الفصل</div>
                      <div class="info-value">${formData.studentClass}</div>
                  </div>
                  <div class="info-item">
                      <div class="info-label">تاريخ الإحالة</div>
                      <div class="info-value">${toArabicNumbers(new Date(formData.referralDate).toLocaleDateString('ar-SA'))}</div>
                  </div>
                  <div class="info-item" style="grid-column: 2 / -1;">
                      <div class="info-label">المعلم المُحيل</div>
                      <div class="info-value">${formData.teacherName}</div>
                  </div>
              </div>
          </div>

          <div class="referral-to-section">
              <div class="section-title">المُحال إليه</div>
              <div class="referral-to-content">
                  <span class="label">${formData.referredToPosition || 'غير محدد'}:</span>
                  <span class="value">${formData.referredTo || 'غير محدد'}</span>
              </div>
          </div>

          <div class="content-box">
              <div class="section-title">سبب الإحالة</div>
              <div style="padding: 0.5rem; font-size: 1rem;">${formData.referralReason || 'لم يتم تحديد سبب الإحالة'}</div>
          </div>

          <div class="content-box">
              <div class="section-title">تفاصيل الإحالة</div>
              <div style="padding: 0.5rem; font-size: 1rem;">${formData.referralDetails || 'لا توجد تفاصيل إضافية'}</div>
          </div>

          ${evidenceImage1 || evidenceImage2 || evidenceImage3 || evidenceImage4 || evidenceImage5 ? `
          <div class="evidence-section">
              <div class="section-title">الشواهد</div>
              <div class="evidence-grid">
                  ${evidenceImage1 ? `<div class="evidence-item"><img src="${evidenceImage1}" alt="الشاهد 1" loading="eager" decoding="sync"></div>` : ''}
                  ${evidenceImage2 ? `<div class="evidence-item"><img src="${evidenceImage2}" alt="الشاهد 2" loading="eager" decoding="sync"></div>` : ''}
                  ${evidenceImage3 ? `<div class="evidence-item"><img src="${evidenceImage3}" alt="الشاهد 3" loading="eager" decoding="sync"></div>` : ''}
                  ${evidenceImage4 ? `<div class="evidence-item"><img src="${evidenceImage4}" alt="الشاهد 4" loading="eager" decoding="sync"></div>` : ''}
                  ${evidenceImage5 ? `<div class="evidence-item"><img src="${evidenceImage5}" alt="الشاهد 5" loading="eager" decoding="sync"></div>` : ''}
              </div>
          </div>` : ''}

          <div class="signature-section">
              <div class="signature-box">
                  <div class="signature-box-title">المعلم</div>
                  <div class="signature-name">${formData.teacherName}</div>
                  ${teacherSigImage ? `<img src="${teacherSigImage}" alt="توقيع المعلم">` : '<div style="height:40px;"></div>'}
              </div>
              
              <div class="barcode-center">
                  ${barcodeImage ? `<img src="${barcodeImage}" alt="الباركود">` : ''}
              </div>

              <div class="signature-box">
                  <div class="signature-box-title">مدير المدرسة</div>
                  <div class="signature-name">${formData.principalName}</div>
                  ${principalSigImage ? `<img src="${principalSigImage}" alt="توقيع القائد">` : '<div style="height:40px;"></div>'}
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

    printWindow.onload = () => {
      const allImages = printWindow.document.querySelectorAll('img');
      let loadedCount = 0;
      const totalImages = allImages.length;

      if (totalImages === 0) {
        if (autoPrint) {
          setTimeout(() => {
            printWindow.print();
          }, 500);
        }
        return;
      }

      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          if (autoPrint) {
            setTimeout(() => {
              printWindow.print();
            }, 1000);
          }
        }
      };

      allImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          if (img.complete && img.naturalHeight !== 0) {
            checkAllLoaded();
          } else {
            img.onload = checkAllLoaded;
            img.onerror = checkAllLoaded;
          }
        }
      });

      setTimeout(() => {
        if (autoPrint && loadedCount < totalImages) {
          printWindow.print();
        }
      }, 5000);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">إحالة طالب</h1>
              <p className="text-gray-600 dark:text-gray-300">إحالة الطالب إلى الموجه الطلابي أو وكيل الشؤون الطلابية</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* معلومات المدرسة */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <School className="w-5 h-5" />
              معلومات المدرسة
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المدرسة <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* معلومات الطالب */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              معلومات الطالب
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الصف <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.studentGrade}
                  onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="مثال: الثالث المتوسط"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الفصل <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.studentClass}
                  onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="أ">أ</option>
                  <option value="ب">ب</option>
                  <option value="ج">ج</option>
                  <option value="د">د</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم الطالب <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-- اختر الطالب --</option>
                  {availableStudents.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* تفاصيل الإحالة */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              تفاصيل الإحالة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تاريخ الإحالة <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.referralDate}
                  onChange={(e) => setFormData({ ...formData, referralDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  المُحال إليه <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.referredTo}
                  onChange={(e) => handleReferredToChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-- اختر المُحال إليه --</option>
                  <optgroup label="الموجه الطلابي">
                    <option value="نبيل الشيخ">نبيل الشيخ</option>
                    <option value="إيهاب زعقان">إيهاب زعقان</option>
                  </optgroup>
                  <optgroup label="وكيل الشؤون الطلابية">
                    <option value="رمزي زعقان">رمزي زعقان</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                سبب الإحالة <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.referralReason}
                onChange={(e) => setFormData({ ...formData, referralReason: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="اذكر سبب إحالة الطالب..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تفاصيل إضافية
              </label>
              <textarea
                value={formData.referralDetails}
                onChange={(e) => setFormData({ ...formData, referralDetails: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="أضف أي تفاصيل إضافية حول الحالة..."
              />
            </div>
          </div>

          {/* صور الشواهد */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              صور الشواهد
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const imageState = [evidenceImage1, evidenceImage2, evidenceImage3, evidenceImage4, evidenceImage5][num - 1];
                const setImageState = [setEvidenceImage1, setEvidenceImage2, setEvidenceImage3, setEvidenceImage4, setEvidenceImage5][num - 1];
                
                return (
                  <div key={num} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.heic,.heif"
                      onChange={(e) => handleImageUpload(e, setImageState)}
                      className="hidden"
                      id={`evidence-${num}`}
                    />
                    <label htmlFor={`evidence-${num}`} className="cursor-pointer block">
                      {imageState ? (
                        <div className="relative">
                          <img
                            src={imageState}
                            alt={`شاهد ${num}`}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setImageState('');
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">شاهد {num}</span>
                        </div>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* رفع التوقيعات والصور */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              رفع الصور والتوقيعات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* شعار الوزارة */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  شعار الوزارة
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleImageUpload(e, setLogoImage)}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer block">
                  {logoImage ? (
                    <div className="relative">
                      <img src={logoImage} alt="الشعار" className="w-full h-32 object-contain rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setLogoImage('');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mb-2" />
                      <span className="text-sm">اضغط لرفع الشعار</span>
                    </div>
                  )}
                </label>
              </div>

              {/* توقيع المعلم */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توقيع المعلم
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleImageUpload(e, setTeacherSigImage)}
                  className="hidden"
                  id="teacher-sig-upload"
                />
                <label htmlFor="teacher-sig-upload" className="cursor-pointer block">
                  {teacherSigImage ? (
                    <div className="relative">
                      <img src={teacherSigImage} alt="توقيع المعلم" className="w-full h-32 object-contain rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setTeacherSigImage('');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mb-2" />
                      <span className="text-sm">اضغط لرفع التوقيع</span>
                    </div>
                  )}
                </label>
              </div>

              {/* توقيع المُحال إليه */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توقيع المُحال إليه
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleImageUpload(e, setRecipientSigImage)}
                  className="hidden"
                  id="recipient-sig-upload"
                />
                <label htmlFor="recipient-sig-upload" className="cursor-pointer block">
                  {recipientSigImage ? (
                    <div className="relative">
                      <img src={recipientSigImage} alt="توقيع المُحال إليه" className="w-full h-32 object-contain rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setRecipientSigImage('');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mb-2" />
                      <span className="text-sm">اضغط لرفع التوقيع</span>
                    </div>
                  )}
                </label>
              </div>

              {/* توقيع المدير */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توقيع مدير المدرسة
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleImageUpload(e, setPrincipalSigImage)}
                  className="hidden"
                  id="principal-sig-upload"
                />
                <label htmlFor="principal-sig-upload" className="cursor-pointer block">
                  {principalSigImage ? (
                    <div className="relative">
                      <img src={principalSigImage} alt="توقيع المدير" className="w-full h-32 object-contain rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPrincipalSigImage('');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mb-2" />
                      <span className="text-sm">اضغط لرفع التوقيع</span>
                    </div>
                  )}
                </label>
              </div>

              {/* الباركود */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الباركود
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={(e) => handleImageUpload(e, setBarcodeImage)}
                  className="hidden"
                  id="barcode-upload"
                />
                <label htmlFor="barcode-upload" className="cursor-pointer block">
                  {barcodeImage ? (
                    <div className="relative">
                      <img src={barcodeImage} alt="الباركود" className="w-full h-32 object-contain rounded-lg" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setBarcodeImage('');
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mb-2" />
                      <span className="text-sm">اضغط لرفع الباركود</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              معلومات إضافية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم المعلم
                </label>
                <input
                  type="text"
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  اسم القائد
                </label>
                <input
                  type="text"
                  value={formData.principalName}
                  onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  العام الدراسي
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="1447"
                />
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex gap-4 justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Eye className="w-5 h-5" />
              معاينة
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Printer className="w-5 h-5" />
              طباعة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReferralForm;
