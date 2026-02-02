// hooks/useCodeModal.js
import { useState, useCallback } from 'react';

export const useCodeModal = () => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [codeFiles, setCodeFiles] = useState([]);
  const [copied, setCopied] = useState(false);

  const openCodeModal = useCallback((index, files) => {
    console.log('Opening code modal:', { index, files }); // Добавьте лог
    setCurrentCodeIndex(index);
    setCodeFiles(Array.isArray(files) ? files : []);
    setIsCodeModalOpen(true);
  }, []);

  const closeCodeModal = useCallback(() => {
    setIsCodeModalOpen(false);
    setTimeout(() => {
      setCodeFiles([]);
      setCopied(false);
    }, 300);
  }, []);

  const nextCode = useCallback(() => {
    setCurrentCodeIndex(prev => 
      prev < codeFiles.length - 1 ? prev + 1 : 0
    );
    setCopied(false);
  }, [codeFiles.length]);

  const prevCode = useCallback(() => {
    setCurrentCodeIndex(prev => 
      prev > 0 ? prev - 1 : codeFiles.length - 1
    );
    setCopied(false);
  }, [codeFiles.length]);

  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

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