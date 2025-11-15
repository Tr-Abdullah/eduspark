"use client";

import { useState, useRef, useEffect } from "react";

interface QRCodeFormProps {
  onBack: () => void;
}

export default function QRCodeForm({ onBack }: QRCodeFormProps) {
  const [fileLink, setFileLink] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!fileLink.trim()) return;

    try {
      // Using QRCode.js library approach - will dynamically import
      const QRCode = (await import("qrcode")).default;
      
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, fileLink, {
          width: 400,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrCodeData(fileLink);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("حدث خطأ أثناء إنشاء رمز QR");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
      <div className="mb-6 p-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl text-white">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📱</div>
          <div>
            <h2 className="text-2xl font-bold">رمز QR / الباركود</h2>
            <p className="text-slate-300 mt-1">إنشاء رموز QR للملفات والروابط</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); generateQRCode(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              رابط الملف
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={fileLink}
                onChange={(e) => setFileLink(e.target.value)}
                placeholder="https://example.com/file"
                className="flex-1 px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all shadow-lg"
              >
                إنشاء QR
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              أدخل رابط الملف أو الموقع لإنشاء رمز QR
            </p>
          </div>

          {/* QR Code Display */}
          {qrCodeData && (
            <div className="mt-8 p-8 bg-gray-50 dark:bg-slate-700 rounded-2xl text-center">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                رمز QR جاهز
              </h3>
              
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-white dark:bg-slate-600 rounded-2xl shadow-xl">
                  <canvas ref={canvasRef} className="mx-auto"></canvas>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white dark:bg-slate-600 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                  {qrCodeData}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  تحميل PNG
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  طباعة PDF
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
