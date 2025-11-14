"use client";

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFPreviewProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  contentRef,
  fileName = 'report.pdf',
  onClose
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // انتظار للتأكد من تحميل المحتوى
    const timer = setTimeout(() => {
      if (contentRef.current) {
        generatePDF();
      } else {
        console.error('contentRef is null');
        setIsLoading(false);
        alert('خطأ: المحتوى غير جاهز للالتقاط');
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [contentRef]);

  const generatePDF = async () => {
    if (!contentRef.current) {
      console.error('contentRef is null in generatePDF');
      setIsLoading(false);
      alert('خطأ: المحتوى غير موجود');
      return;
    }
    
    setIsGenerating(true);
    try {
      console.log('بدء التقاط المحتوى...');
      console.log('Element:', contentRef.current);
      console.log('Width:', contentRef.current.scrollWidth);
      console.log('Height:', contentRef.current.scrollHeight);
      
      // التقاط المحتوى كصورة
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
        ignoreElements: (element) => {
          // تجاهل أي عناصر قد تسبب مشاكل
          return element.classList?.contains('no-print') || false;
        },
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('general-report-preview');
          if (clonedElement) {
            clonedElement.style.opacity = '1';
            clonedElement.style.position = 'relative';
            
            // تحويل جميع الألوان المتقدمة إلى RGB
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(el);
              
              // نسخ الألوان المحسوبة
              if (computedStyle.color) {
                htmlEl.style.color = computedStyle.color;
              }
              if (computedStyle.backgroundColor) {
                htmlEl.style.backgroundColor = computedStyle.backgroundColor;
              }
              if (computedStyle.borderColor) {
                htmlEl.style.borderColor = computedStyle.borderColor;
              }
            });
          }
        }
      });

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // إنشاء PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      console.log('Creating PDF...');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // تحويل PDF إلى blob URL للمعاينة
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      console.log('PDF generated successfully!');
    } catch (error) {
      console.error('خطأ تفصيلي في توليد PDF:', error);
      alert(`حدث خطأ في توليد PDF: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        ignoreElements: (element) => {
          return element.classList?.contains('no-print') || false;
        },
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('general-report-preview');
          if (clonedElement) {
            clonedElement.style.opacity = '1';
            clonedElement.style.position = 'relative';
            
            // تحويل الألوان المتقدمة إلى RGB
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(el);
              
              if (computedStyle.color) htmlEl.style.color = computedStyle.color;
              if (computedStyle.backgroundColor) htmlEl.style.backgroundColor = computedStyle.backgroundColor;
              if (computedStyle.borderColor) htmlEl.style.borderColor = computedStyle.borderColor;
            });
          }
        }
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error('خطأ في تحميل PDF:', error);
      alert('حدث خطأ في تحميل PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            إغلاق
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating || isLoading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>جاري التحضير...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>تحميل PDF</span>
              </>
            )}
          </button>
        </div>

        <div className="text-white font-bold text-lg">
          معاينة PDF - {fileName}
        </div>
      </div>

      {/* PDF Preview */}
      <div className="flex-1 overflow-auto bg-gray-800 p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
              <p className="text-white font-semibold text-lg">جاري إنشاء المعاينة...</p>
            </div>
          </div>
        ) : pdfUrl ? (
          <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full"
              style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}
              title="PDF Preview"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <p className="text-xl font-bold mb-4">فشل في تحميل المعاينة</p>
              <button
                onClick={generatePDF}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
