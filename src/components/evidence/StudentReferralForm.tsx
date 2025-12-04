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
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  print-color-adjust: exact !important;
                  -webkit-print-color-adjust: exact !important;
              }
              body {
                  font-family: Arial, sans-serif;
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
                  padding: 0.5rem 1rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-bottom: 1rem;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
              }
              .logo-container {
                  width: 120px;
                  height: 120px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
              }
              .logo-container img {
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
              }
              .header-content {
                  flex: 1;
                  text-align: center;
                  padding: 0 1rem;
              }
              .header h1 {
                  font-size: 1.9rem;
                  font-weight: bold;
                  margin-bottom: 0.4rem;
              }
              .header h2 {
                  font-size: 1.4rem;
                  font-weight: 600;
                  margin-bottom: 0.25rem;
              }
              .document-title {
                  background: #f3f4f6;
                  border: 2px solid #15445A;
                  border-radius: 8px;
                  padding: 0.8rem;
                  text-align: center;
                  margin: 1rem 0;
              }
              .document-title h2 {
                  color: #15445A;
                  font-size: 1.5rem;
                  font-weight: bold;
              }
              .info-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 0.8rem;
                  margin-bottom: 1rem;
              }
              .info-item {
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                  border-radius: 6px;
                  padding: 0.6rem;
              }
              .info-label {
                  color: #15445A;
                  font-weight: bold;
                  font-size: 0.9rem;
                  margin-bottom: 0.2rem;
              }
              .info-value {
                  color: #333;
                  font-size: 1rem;
              }
              .section-title {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.5rem;
                  border-radius: 6px;
                  font-weight: bold;
                  margin: 1rem 0 0.5rem 0;
                  font-size: 1.1rem;
              }
              .content-box {
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                  border-radius: 6px;
                  padding: 1rem;
                  min-height: 100px;
                  margin-bottom: 1rem;
              }
              .referral-to-box {
                  background: #fef3c7;
                  border: 2px solid #f59e0b;
                  border-radius: 8px;
                  padding: 1rem;
                  margin: 1rem 0;
                  text-align: center;
              }
              .referral-to-box .position {
                  color: #92400e;
                  font-size: 1rem;
                  font-weight: 600;
                  margin-bottom: 0.3rem;
              }
              .referral-to-box .name {
                  color: #15445A;
                  font-size: 1.4rem;
                  font-weight: bold;
              }
              .signature-section {
                  margin-top: 1.5rem;
                  display: grid;
                  grid-template-columns: 1fr auto 1fr auto 1fr;
                  gap: 1rem;
                  align-items: end;
              }
              .signature-box {
                  padding: 0.5rem;
                  text-align: center;
                  min-height: 80px;
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
                  height: 50px;
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
                  width: 100px;
                  height: 100px;
                  object-fit: contain;
              }
              .footer {
                  background: #15445A !important;
                  color: white !important;
                  padding: 0.6rem;
                  text-align: center;
                  border-radius: 8px;
                  margin-top: 1rem;
                  font-size: 1rem;
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
                  ${logoImage ? `<img src="${logoImage}" alt="شعار المدرسة">` : '<div style="width:120px;height:120px;"></div>'}
              </div>
              <div class="header-content">
                  <h1>المملكة العربية السعودية</h1>
                  <h2>وزارة التعليم</h2>
                  <h2>${formData.schoolName.split('\n').join('<br>')}</h2>
              </div>
              <div class="logo-container">
                  ${logoImage ? `<img src="${logoImage}" alt="شعار الوزارة">` : '<div style="width:120px;height:120px;"></div>'}
              </div>
          </div>

          <div class="document-title">
              <h2>🎯 إحالة طالب 🎯</h2>
          </div>

          <div class="info-grid">
              <div class="info-item">
                  <div class="info-label">اسم الطالب:</div>
                  <div class="info-value">${formData.studentName || 'غير محدد'}</div>
              </div>
              <div class="info-item">
                  <div class="info-label">الصف:</div>
                  <div class="info-value">${formData.studentGrade}</div>
              </div>
              <div class="info-item">
                  <div class="info-label">الفصل:</div>
                  <div class="info-value">${formData.studentClass}</div>
              </div>
          </div>

          <div class="info-grid" style="grid-template-columns: 1fr 1fr;">
              <div class="info-item">
                  <div class="info-label">تاريخ الإحالة:</div>
                  <div class="info-value">${toArabicNumbers(new Date(formData.referralDate).toLocaleDateString('ar-SA'))}</div>
              </div>
              <div class="info-item">
                  <div class="info-label">المعلم المُحيل:</div>
                  <div class="info-value">${formData.teacherName}</div>
              </div>
          </div>

          <div class="referral-to-box">
              <div class="position">المُحال إليه: ${formData.referredToPosition || 'غير محدد'}</div>
              <div class="name">${formData.referredTo || 'غير محدد'}</div>
          </div>

          <div class="section-title">سبب الإحالة</div>
          <div class="content-box">
              ${formData.referralReason || 'لم يتم تحديد سبب الإحالة'}
          </div>

          <div class="section-title">تفاصيل الإحالة</div>
          <div class="content-box">
              ${formData.referralDetails || 'لا توجد تفاصيل إضافية'}
          </div>

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
                  <div class="signature-box-title">${formData.referredToPosition || 'المستلم'}</div>
                  <div class="signature-name">${formData.referredTo || 'غير محدد'}</div>
                  ${recipientSigImage ? `<img src="${recipientSigImage}" alt="توقيع المستلم">` : '<div style="height:40px;"></div>'}
              </div>

              <div class="barcode-center">
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
