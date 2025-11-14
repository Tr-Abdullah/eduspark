"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// تسجيل خط عربي (يمكنك استبداله بخط مخصص)
// Font.register({
//   family: 'Cairo',
//   src: '/fonts/Cairo-Regular.ttf'
// });

interface GeneralReportPDFProps {
  formData: {
    teacherName: string;
    principalName: string;
    schoolName: string;
    academicYear: string;
    programName: string;
    programGoals: string[];
    performanceItem: string;
    performanceElement: string;
    executionDay: string;
    executionMonth: string;
    executionYear: string;
    targetAudience: string;
  };
  images: {
    img1?: string;
    img2?: string;
    img3?: string;
    img4?: string;
  };
  logoImage?: string;
  signatureImage?: string;
  barcodeImage?: string;
}

// تعريف الأنماط
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica', // استخدم 'Cairo' بعد تسجيل الخط العربي
  },
  
  // الهيدر
  header: {
    backgroundColor: '#15445A',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  
  logoContainer: {
    backgroundColor: '#1a4d5e',
    borderRadius: 8,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
  },
  
  headerTextContainer: {
    alignItems: 'center',
  },
  
  headerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  
  // اسم المدرسة
  schoolNameSection: {
    backgroundColor: '#15445A',
    padding: 8,
    textAlign: 'center',
  },
  
  schoolName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // المحتوى
  content: {
    padding: 12,
    flex: 1,
  },
  
  // البيانات الأساسية
  infoBox: {
    backgroundColor: '#F0FDFA',
    borderRadius: 8,
    padding: 8,
    border: '1px solid #99F6E4',
    marginBottom: 8,
  },
  
  infoGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
    paddingBottom: 6,
    borderBottom: '1px solid #5EEAD4',
  },
  
  infoItem: {
    flex: 1,
  },
  
  infoLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  
  infoValue: {
    fontSize: 9,
    color: '#111827',
  },
  
  goalsList: {
    marginTop: 2,
    paddingRight: 10,
  },
  
  goalItem: {
    fontSize: 9,
    color: '#111827',
    marginBottom: 1,
  },
  
  // الشواهد (الصور)
  witnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  
  witnessItem: {
    width: '48%',
    borderRadius: 4,
    border: '1px solid #BFDBFE',
    backgroundColor: '#EFF6FF',
    padding: 4,
  },
  
  witnessImageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    border: '1px dashed #93C5FD',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  witnessImage: {
    maxWidth: '100%',
    maxHeight: 80,
    objectFit: 'cover',
    borderRadius: 4,
  },
  
  witnessPlaceholder: {
    fontSize: 20,
  },
  
  // التوقيعات
  signaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 8,
    marginBottom: 8,
  },
  
  signatureBlock: {
    width: '30%',
  },
  
  signatureLabel: {
    fontSize: 8,
    color: '#4B5563',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  
  signatureName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  
  signatureImage: {
    maxHeight: 25,
    width: 'auto',
    objectFit: 'contain',
    marginTop: 2,
  },
  
  barcodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  barcode: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  
  // الفوتر
  footer: {
    background: 'linear-gradient(90deg, #3D7EB9, #0DA9A6, #07A869)',
    padding: 6,
    textAlign: 'center',
  },
  
  footerText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

const GeneralReportPDF: React.FC<GeneralReportPDFProps> = ({ 
  formData, 
  images, 
  logoImage, 
  signatureImage, 
  barcodeImage 
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {logoImage ? (
              <Image src={logoImage} style={styles.logo} />
            ) : (
              <Text style={{ color: '#FFFFFF', fontSize: 8 }}>الشعار</Text>
            )}
          </View>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>المملكة العربية السعودية</Text>
            <Text style={styles.headerText}>وزارة التعليم</Text>
            <Text style={styles.headerText}>الإدارة العامة للتعليم بمنطقة جازان</Text>
          </View>
        </View>

        {/* اسم المدرسة */}
        <View style={styles.schoolNameSection}>
          <Text style={styles.schoolName}>{formData.schoolName}</Text>
        </View>

        {/* المحتوى */}
        <View style={styles.content}>
          {/* البيانات الأساسية */}
          <View style={styles.infoBox}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>اسم البرنامج:</Text>
                <Text style={styles.infoValue}>{formData.programName}</Text>
              </View>
              
              {formData.programGoals.length > 0 && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>أهداف البرنامج:</Text>
                  <View style={styles.goalsList}>
                    {formData.programGoals.map((goal, index) => (
                      <Text key={index} style={styles.goalItem}>• {goal}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
            
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>المعيار:</Text>
                <Text style={styles.infoValue}>{formData.performanceItem}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>المؤشر:</Text>
                <Text style={styles.infoValue}>{formData.performanceElement}</Text>
              </View>
            </View>
            
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>تاريخ التنفيذ:</Text>
                <Text style={styles.infoValue}>
                  {formData.executionDay}/{formData.executionMonth}/{formData.executionYear} هـ
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>المستهدفون:</Text>
                <Text style={styles.infoValue}>{formData.targetAudience}</Text>
              </View>
            </View>
          </View>

          {/* الشواهد */}
          <View style={styles.witnessGrid}>
            {(['img1', 'img2', 'img3', 'img4'] as const).map((imgKey, index) => (
              <View key={imgKey} style={styles.witnessItem}>
                <View style={styles.witnessImageContainer}>
                  {images[imgKey] ? (
                    <Image src={images[imgKey]!} style={styles.witnessImage} />
                  ) : (
                    <Text style={styles.witnessPlaceholder}>📸</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* التوقيعات */}
          <View style={styles.signaturesContainer}>
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureLabel}>المعلم</Text>
              <Text style={styles.signatureName}>{formData.teacherName}</Text>
              {signatureImage && (
                <Image src={signatureImage} style={styles.signatureImage} />
              )}
            </View>
            
            <View style={[styles.signatureBlock, styles.barcodeContainer]}>
              {barcodeImage && (
                <Image src={barcodeImage} style={styles.barcode} />
              )}
            </View>
            
            <View style={[styles.signatureBlock, { alignItems: 'flex-end' }]}>
              <Text style={styles.signatureLabel}>مدير المدرسة</Text>
              <Text style={styles.signatureName}>{formData.principalName}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>العام الدراسي {formData.academicYear} هـ</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GeneralReportPDF;
