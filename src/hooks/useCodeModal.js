import { useState, useCallback, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markdown';

export const useCodeModal = () => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [codeFiles, setCodeFiles] = useState([]);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const openCodeModal = useCallback((index, files) => {
    setCodeFiles(files);
    setCurrentCodeIndex(0);
    setIsCodeModalOpen(true);
  }, []);

  const closeCodeModal = useCallback(() => {
    setIsCodeModalOpen(false);
  }, []);

  const nextCode = useCallback(() => {
    setCurrentCodeIndex((prev) =>
      prev === codeFiles.length - 1 ? 0 : prev + 1
    );
  }, [codeFiles.length]);

  const prevCode = useCallback(() => {
    setCurrentCodeIndex((prev) =>
      prev === 0 ? codeFiles.length - 1 : prev - 1
    );
  }, [codeFiles.length]);

  const handleCopy = useCallback(() => {
    if (codeFiles[currentCodeIndex]) {
      navigator.clipboard.writeText(codeFiles[currentCodeIndex].content)
        .then(() => {
          setCopied(true);
    
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          
          timerRef.current = setTimeout(() => setCopied(false), 2000);
        });
    }
  }, [codeFiles, currentCodeIndex]);

  useEffect(() => {
    if (isCodeModalOpen && codeFiles.length > 0) {
      const frameId = requestAnimationFrame(() => {
        const codeElements = document.querySelectorAll('.code-content code');
        codeElements.forEach((element) => {
          Prism.highlightElement(element);
        });
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [isCodeModalOpen, currentCodeIndex, codeFiles]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
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