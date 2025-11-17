// الأنماط المشتركة لجميع نماذج التقارير
export const sharedPrintStyles = `
    * {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Sakkal Majalla', 'Traditional Arabic', 'Segoe UI', Tahoma, Arial, sans-serif;
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
        font-size: 1.1rem;
    }
    .header-text h4 {
        margin: 0 0 0.15rem 0;
        font-size: 0.9rem;
    }
    .school-name-header {
        margin-top: 0.3rem;
        font-size: 1rem;
        font-weight: bold;
        white-space: pre-line;
        line-height: 1.4;
    }
    
    /* تصغير حجم الخط في الشاشات الصغيرة فقط */
    @media (max-width: 640px) {
        .school-name-header {
            font-size: 0.75rem;
            line-height: 1.2;
        }
        .header-text h3 {
            font-size: 0.85rem;
        }
        .header-text h4 {
            font-size: 0.7rem;
        }
        .signature-box-title {
            font-size: 0.7rem !important;
        }
        .signature-name {
            font-size: 0.8rem !important;
        }
    }
    
    /* في الطباعة: منع الالتفاف وتصغير الخط قليلاً */
    @media print {
        .school-name-header {
            white-space: nowrap !important;
            font-size: 0.85rem !important;
            overflow: hidden;
        }
        .header-text h3 {
            font-size: 0.95rem !important;
        }
        .header-text h4 {
            font-size: 0.8rem !important;
        }
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
    }
    .signature-box-title {
        color: #333 !important;
        padding: 0.2rem;
        font-weight: bold;
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
        font-size: 0.9rem;
        font-weight: bold;
    }
    /* طباعة من الموبايل: تصغير كل شيء */
    @media print and (max-width: 640px) {
        body {
            margin: 0;
            font-size: 10px !important;
            transform: scale(0.89);
            transform-origin: top right;
        }
        @page {
            margin: 0.3cm;
            size: A4 landscape;
        }
        .header {
            padding: 0.2rem 0.4rem !important;
            margin-bottom: 0.4rem !important;
        }
        .logo-container {
            width: 80px !important;
            height: 80px !important;
        }
        .logo-container img {
            width: 60px !important;
            height: 60px !important;
        }
        .header-text h3 {
            font-size: 0.6rem !important;
            margin: 0 0 0.1rem 0 !important;
        }
        .header-text h4 {
            font-size: 0.55rem !important;
            margin: 0 0 0.1rem 0 !important;
        }
        .school-name-header {
            font-size: 0.5rem !important;
            margin-top: 0.15rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        .signature-section {
            margin-top: 0.2rem !important;
            gap: 0.5rem !important;
        }
        .signature-box {
            padding: 0.15rem !important;
            min-height: 40px !important;
        }
        .signature-box-title {
            font-size: 0.5rem !important;
            padding: 0.1rem !important;
            margin-bottom: 0.1rem !important;
        }
        .signature-name {
            font-size: 0.5rem !important;
            margin: 0.15rem 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        .signature-box img {
            max-width: 80px !important;
            height: 25px !important;
        }
        .barcode-center img {
            width: 80px !important;
            height: 80px !important;
        }
        .footer {
            padding: 0.3rem !important;
            margin-top: 0.15rem !important;
            font-size: 0.55rem !important;
        }
    }
    
    /* طباعة من الديسكتوب: كما هو */
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
`;

// دالة إنشاء الهيدر المشترك
export const generateHeader = (
    logoImage: string,
    schoolName: string
) => `
    <div class="header">
        <div class="logo-container">
            ${logoImage ? `<img src="${logoImage}" alt="شعار الوزارة">` : '<div style="width:120px;height:120px;"></div>'}
        </div>
        <div class="header-text">
            <h3>المملكة العربية السعودية</h3>
            <h3>وزارة التعليم</h3>
            <h4>الإدارة العامة للتعليم بمنطقة جازان</h4>
            <div class="school-name-header">${schoolName || 'اسم المدرسة'}</div>
        </div>
        <div class="logo-container">
            <div style="width:120px;height:120px;"></div>
        </div>
    </div>
`;

// دالة إنشاء قسم التوقيعات المشترك
export const generateSignatureSection = (
    teacherName: string,
    principalName: string,
    signatureImage: string,
    principalSignatureImage: string,
    barcodeImage: string
) => `
    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-box-title">المعلم</div>
            <div class="signature-name">${teacherName || 'غير محدد'}</div>
            ${signatureImage ? `<img src="${signatureImage}" alt="توقيع المعلم">` : '<div style="height:40px;"></div>'}
        </div>
        <div class="barcode-center">
            ${barcodeImage ? `<img src="${barcodeImage}" alt="الباركود">` : ''}
        </div>
        <div class="signature-box">
            <div class="signature-box-title">مدير المدرسة</div>
            <div class="signature-name">${principalName || 'غير محدد'}</div>
            ${principalSignatureImage ? `<img src="${principalSignatureImage}" alt="توقيع المدير">` : '<div style="height:40px;"></div>'}
        </div>
    </div>
`;

// دالة إنشاء الفوتر المشترك
export const generateFooter = (academicYear: string, toArabicNumbers: (str: string) => string) => `
    <div class="footer">
        العام الدراسي ${toArabicNumbers(academicYear)}
    </div>
`;

// تحويل الأرقام إلى عربية
export const toArabicNumbers = (str: string): string => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, (d) => arabicNumbers[parseInt(d)]);
};
