/**
 * Universal One-Page Print Fitter
 * Automatically scales any report to fit one printable page.
 */

(function() {
  'use strict';

  let originalScale = null;
  let sheetElement = null;

  // Get printable dimensions from CSS variables
  function getPrintableDims() {
    const style = getComputedStyle(document.documentElement);
    const w = parseFloat(style.getPropertyValue('--printable-w'));
    const h = parseFloat(style.getPropertyValue('--printable-h'));
    return { w, h };
  }

  // Measure total content dimensions
  function measureContent() {
    if (!sheetElement) return { w: 0, h: 0 };
    const rect = sheetElement.getBoundingClientRect();
    return { w: rect.width, h: rect.height };
  }

  // Calculate auto scale
  function calcScale() {
    const printable = getPrintableDims();
    const content = measureContent();
    if (content.w === 0 || content.h === 0) return 1;
    const scaleW = printable.w / content.w;
    const scaleH = printable.h / content.h;
    return Math.min(scaleW, scaleH, 1); // Never scale up
  }

  // Apply scale
  function applyScale(scale) {
    if (!sheetElement) return;
    originalScale = sheetElement.style.transform || '';
    sheetElement.style.transform = `scale(${scale})`;
    sheetElement.style.transformOrigin = 'top left';
  }

  // Reset scale
  function resetScale() {
    if (!sheetElement) return;
    sheetElement.style.transform = originalScale;
    originalScale = null;
  }

  // Public function to trigger one-page print
  window.printOnePage = function() {
    sheetElement = document.querySelector('.sheet');
    if (!sheetElement) {
      console.error('No .sheet element found for printing');
      return;
    }

    const scale = calcScale();
    applyScale(scale);
    window.print();
  };

  // Auto-handle print events
  window.addEventListener('beforeprint', function() {
    sheetElement = document.querySelector('.sheet');
    if (sheetElement) {
      const scale = calcScale();
      applyScale(scale);
    }
  });

  window.addEventListener('afterprint', function() {
    resetScale();
  });

  // Fallback for browsers without beforeprint/afterprint
  let printInProgress = false;
  const originalPrint = window.print;
  window.print = function() {
    if (printInProgress) return;
    printInProgress = true;
    sheetElement = document.querySelector('.sheet');
    if (sheetElement) {
      const scale = calcScale();
      applyScale(scale);
    }
    originalPrint();
    // Reset after a delay (since afterprint may not fire)
    setTimeout(() => {
      resetScale();
      printInProgress = false;
    }, 1000);
  };

})();