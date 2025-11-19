"use client";

import { useState, useRef } from "react";

interface QRCodeFormProps {
  onBack: () => void;
}

type QRCodeSize = 200 | 300 | 400 | 500;
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export default function QRCodeForm({ onBack }: QRCodeFormProps) {
  const [fileLink, setFileLink] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrSize, setQrSize] = useState<QRCodeSize>(400);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!fileLink.trim()) {
      alert("الرجاء إدخال رابط أو نص");
      return;
    }

    setIsGenerating(true);
    try {
      const QRCode = (await import("qrcode")).default;
      
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, fileLink, {
          width: qrSize,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: qrColor,
            light: bgColor,
          },
        });
        setQrCodeData(fileLink);
        setShowPreview(true);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("حدث خطأ أثناء إنشاء رمز QR. تأكد من صحة البيانات المدخلة.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (!qrCodeData) {
      alert("الرجاء إنشاء رمز QR أولاً");
      return;
    }
    window.print();
  };

  const handleDownload = () => {
    if (canvasRef.current && qrCodeData) {
      const link = document.createElement("a");
      const timestamp = new Date().getTime();
      link.download = `qrcode_${timestamp}.png`;
      link.href = canvasRef.current.toDataURL("image/png", 1.0);
      link.click();
    } else {
      alert("الرجاء إنشاء رمز QR أولاً");
    }
  };

  const handleReset = () => {
    setFileLink("");
    setQrCodeData("");
    setShowPreview(false);
    setQrSize(400);
    setErrorLevel('M');
    setQrColor("#000000");
    setBgColor("#ffffff");
  };

  const copyToClipboard = () => {
    if (qrCodeData) {
      navigator.clipboard.writeText(qrCodeData);
      alert("تم نسخ الرابط إلى الحافظة");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .no-print,
            button:not(.print-show),
            input,
            select,
            .controls-section {
              display: none !important;
            }

            body {
              background: white !important;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            .print-content {
              display: flex !important;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              page-break-inside: avoid;
              margin: 0 auto;
              padding: 40px;
            }

            canvas {
              max-width: 100% !important;
              height: auto !important;
              margin: 20px auto !important;
            }

            .print-info {
              display: block !important;
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #333;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            animation: fadeIn 0.4s ease-out;
          }

          .qr-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        `
      }} />

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
      <div className="mb-8 p-8 qr-gradient rounded-3xl text-white shadow-2xl no-print">
        <div className="flex items-center gap-4">
          <div className="text-5xl">📱</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">مولد رموز QR الاحترافي</h2>
            <p className="text-purple-100 text-lg">أنشئ رموز QR عالية الجودة مع خيارات تخصيص متقدمة</p>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">∞</div>
            <div className="text-sm text-purple-200">استخدام غير محدود</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-purple-200">مستويات جودة</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-purple-200">أحجام متعددة</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">✓</div>
            <div className="text-sm text-purple-200">تخصيص كامل</div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Main Input Section */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 no-print">
          <div>
            <label className="block text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              الرابط أو النص
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={fileLink}
                onChange={(e) => setFileLink(e.target.value)}
                placeholder="https://example.com أو أي نص تريد تحويله لـ QR"
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
              />
              <button
                onClick={generateQRCode}
                disabled={isGenerating || !fileLink.trim()}
                className="px-8 py-4 qr-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    إنشاء QR
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              يمكنك إدخال رابط موقع، ملف، نص، أو أي بيانات تريد تحويلها لرمز QR
            </p>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="controls-section border-t-2 border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-slate-800 no-print">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            خيارات متقدمة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                الحجم (بكسل)
              </label>
              <select
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value) as QRCodeSize)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white transition-all"
              >
                <option value={200}>صغير (200×200)</option>
                <option value={300}>متوسط (300×300)</option>
                <option value={400}>كبير (400×400)</option>
                <option value={500}>كبير جداً (500×500)</option>
              </select>
            </div>

            {/* Error Correction Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                مستوى التصحيح
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as ErrorCorrectionLevel)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white transition-all"
              >
                <option value="L">منخفض (7%)</option>
                <option value="M">متوسط (15%)</option>
                <option value="Q">عالي (25%)</option>
                <option value="H">عالي جداً (30%)</option>
              </select>
            </div>

            {/* QR Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                لون الرمز
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-16 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                لون الخلفية
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-16 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:text-white font-mono text-sm"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-blue-900 dark:text-blue-200 text-sm">مستوى التصحيح</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">يسمح بقراءة الرمز حتى مع وجود تلف جزئي</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-green-900 dark:text-green-200 text-sm">جودة عالية</div>
                  <div className="text-xs text-green-700 dark:text-green-300 mt-1">رموز QR واضحة قابلة للطباعة والمسح</div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <div className="font-semibold text-purple-900 dark:text-purple-200 text-sm">تخصيص كامل</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">اختر الألوان والحجم حسب احتياجك</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        {showPreview && qrCodeData && (
          <div className="fade-in border-t-2 border-gray-200 dark:border-gray-700 p-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center flex items-center justify-center gap-3 no-print">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                رمز QR جاهز للاستخدام
              </h3>
              
              {/* QR Code Preview */}
              <div className="flex justify-center mb-6">
                <div className="p-8 bg-white dark:bg-slate-700 rounded-3xl shadow-2xl border-4 border-purple-200 dark:border-purple-700 print-content">
                  <canvas ref={canvasRef} className="mx-auto rounded-xl"></canvas>
                </div>
              </div>

              {/* Link Display */}
              <div className="mb-6 p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 no-print">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">الرابط المُشفّر:</div>
                    <p className="text-sm text-gray-800 dark:text-gray-200 break-all bg-gray-100 dark:bg-slate-600 px-4 py-3 rounded-lg font-mono">
                      {qrCodeData}
                    </p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex-shrink-0 px-4 py-2 bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-lg transition-colors"
                    title="نسخ الرابط"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* QR Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 no-print">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow text-center border border-gray-200 dark:border-gray-600">
                  <div className="text-2xl font-bold text-purple-600">{qrSize}px</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">الحجم</div>
                </div>
                <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow text-center border border-gray-200 dark:border-gray-600">
                  <div className="text-2xl font-bold text-purple-600">
                    {errorLevel === 'L' ? '7%' : errorLevel === 'M' ? '15%' : errorLevel === 'Q' ? '25%' : '30%'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">مستوى التصحيح</div>
                </div>
                <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow text-center border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded border-2 border-gray-300" style={{ backgroundColor: qrColor }}></div>
                    <div className="w-8 h-8 rounded border-2 border-gray-300" style={{ backgroundColor: bgColor }}></div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">الألوان</div>
                </div>
                <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow text-center border border-gray-200 dark:border-gray-600">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">جاهز للطباعة</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 no-print">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  تحميل PNG
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3 qr-gradient text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  طباعة PDF
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  إنشاء رمز جديد
                </button>
              </div>

              {/* Print Info (hidden on screen, visible on print) */}
              <div className="print-info" style={{ display: 'none' }}>
                <div style={{ marginTop: '20px', padding: '15px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>معلومات الرمز:</p>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>الرابط: {qrCodeData}</p>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>الحجم: {qrSize}×{qrSize} بكسل</p>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>مستوى التصحيح: {errorLevel}</p>
                  <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '8px' }}>تم الإنشاء بواسطة: EduSpark</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
