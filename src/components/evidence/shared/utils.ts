// مكتبة مشتركة للوظائف المساعدة في نماذج شواهد الأداء

/**
 * الحصول على التاريخ الهجري الحالي تلقائياً باستخدام Intl API
 */
export const getCurrentHijriDate = () => {
  try {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      numberingSystem: 'latn'
    });
    
    // الحصول على اسم اليوم بالعربية
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
    // Fallback في حالة عدم دعم المتصفح
    return {
      day: '25',
      month: '5',
      year: '1447',
      dayName: 'السبت'
    };
  }
};

/**
 * تحويل الأرقام الإنجليزية إلى عربية
 */
export const toArabicNumbers = (str: string | number): string => {
  const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(str).replace(/\d/g, d => arabicNums[parseInt(d)]);
};

/**
 * استخراج الرقم فقط من النص (لحل مشكلة أسماء الأشهر)
 */
export const extractNumber = (value: string | number): string => {
  if (typeof value === 'number') return String(value);
  return value.replace(/[^\d]/g, '');
};

/**
 * تنسيق التاريخ الهجري للعرض (مثال: السبت ١٤٤٧/٥/٢٥)
 */
export const formatHijriDate = (dayName: string, year: string | number, month: string | number, day: string | number): string => {
  const monthNumber = extractNumber(String(month));
  return `${dayName} ${toArabicNumbers(year)}/${toArabicNumbers(monthNumber)}/${toArabicNumbers(day)}`;
};

/**
 * البيانات الافتراضية للمدرسة
 */
export const DEFAULT_SCHOOL_DATA = {
  schoolName: "مدرسة ابن سيناء المتوسطة وبرنامجي العوق الفكري والتوحد",
  teacherName: "عبدالله حسن الفيفي",
  principalName: "احمد علي كريري",
  academicYear: "1447",
  educationDepartment: "الإدارة العامة للتعليم بمنطقة جازان"
};

/**
 * مسارات الصور الافتراضية
 */
export const DEFAULT_IMAGES = {
  logo: '/images/moe-logo.WEBP',
  signature: '/images/signature.png',
  principalSignature: '',
  barcode: ''
};

/**
 * تحميل صورة من URL وتحويلها إلى Base64
 */
export const loadImageFromURL = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return '';
  }
};
