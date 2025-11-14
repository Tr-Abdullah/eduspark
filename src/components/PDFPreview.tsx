"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type { DocumentProps } from '@react-pdf/renderer';

// تحميل PDFViewer فقط في المتصفح (client-side)
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">جاري تحميل معاينة PDF...</p>
        </div>
      </div>
    ),
  }
);

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface PDFPreviewProps {
  children: React.ReactElement<DocumentProps>;
  fileName?: string;
  showDownload?: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  children, 
  fileName = 'report.pdf',
  showDownload = true 
}) => {
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* زر التحميل */}
      {showDownload && (
        <div className="absolute top-4 right-4 z-10">
          <PDFDownloadLink document={children} fileName={fileName}>
            {({ loading }) => (
              <button
                disabled={loading}
                className={`
                  px-6 py-3 rounded-lg font-bold shadow-lg transition-all
                  flex items-center gap-2
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }
                `}
              >
                {loading ? (
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
            )}
          </PDFDownloadLink>
        </div>
      )}

      {/* المعاينة */}
      <PDFViewer 
        style={{ 
          width: '100%', 
          height: '100%',
          border: 'none'
        }}
        showToolbar={true}
      >
        {children}
      </PDFViewer>
    </div>
  );
};

export default PDFPreview;
