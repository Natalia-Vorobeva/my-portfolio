import { useState } from 'react';
import { trackEvent } from '../utils/tracking';

export const useCodeModal = () => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [codeFiles, setCodeFiles] = useState(null);
  const [copied, setCopied] = useState(false);

  const openCodeModal = (index, portfolioCode) => {
    setIsCodeModalOpen(true);
    setCurrentCodeIndex(0);
    setCodeFiles(portfolioCode);
    trackEvent('view_code', 'portfolio', portfolioCode[0]?.title || 'Unknown');
  };

  const closeCodeModal = () => {
    setIsCodeModalOpen(false);
  };

  const nextCode = () => {
    if (codeFiles && codeFiles.length > 1) {
      setCurrentCodeIndex((prev) => prev === codeFiles.length - 1 ? 0 : prev + 1);
    }
  };

  const prevCode = () => {
    if (codeFiles && codeFiles.length > 1) {
      setCurrentCodeIndex((prev) => prev === 0 ? codeFiles.length - 1 : prev - 1);
    }
  };

  const handleCopy = () => {
    if (codeFiles && codeFiles[currentCodeIndex]) {
      navigator.clipboard.writeText(codeFiles[currentCodeIndex].content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent('code_copy', 'engagement', 'Copy Code');
    }
  };

  return {
    isCodeModalOpen,
    currentCodeIndex,
    codeFiles,
    copied,
    openCodeModal,
    closeCodeModal,
    nextCode,
    prevCode,
    handleCopy,
    setCurrentCodeIndex
  };
};