import React, { useLayoutEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import { FiFileText, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const CodeModal = ({
  codeFiles,
  currentCodeIndex,
  setCurrentCodeIndex,
  closeCodeModal,
  nextCode,
  prevCode,
  handleCopy,
  copied
}) => {
  useLayoutEffect(() => {
    if (codeFiles) {
      const codeElements = document.querySelectorAll('.code-content code');
      codeElements.forEach((element) => {
        Prism.highlightElement(element);
      });
    }
  }, [codeFiles, currentCodeIndex]);

  if (!codeFiles) return null;

  const currentFile = codeFiles[currentCodeIndex];

  return (
    <div className="code-modal-overlay" onClick={closeCodeModal}>
      <div className="code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-modal-header flex justify-between items-center mb-6">
          <div className="code-file-info flex items-center gap-3">
            <FiFileText className="file-icon text-primary text-xl" />
            <h3 className="text-xl font-bold text-light">{currentFile.name}</h3>
            <span className="code-language bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {currentFile.language}
            </span>
          </div>
          <button 
            className="close-modal-btn bg-transparent border-none text-white text-xl cursor-pointer hover:opacity-70" 
            onClick={closeCodeModal}
          >
            <FiX />
          </button>
        </div>

        <div className="code-navigation flex justify-between items-center mb-6">
          <button
            className="nav-btn prev-btn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={prevCode}
            disabled={codeFiles.length <= 1}
          >
            <FiChevronLeft /> Предыдущий
          </button>

          <div className="nav-indicator">
            <span className="current-index bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold">
              {currentCodeIndex + 1}/{codeFiles.length}
            </span>
          </div>

          <button
            className="nav-btn prev-btn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={nextCode}
            disabled={codeFiles.length <= 1}
          >
            Следующий <FiChevronRight />
          </button>
        </div>

        <div className="file-thumbnails flex flex-wrap gap-2 mb-6">
          {codeFiles.map((file, index) => (
            <button
              key={file.id}
              className={`file-thumbnail flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                index === currentCodeIndex 
                  ? 'bg-primary/30 text-primary border border-primary/50' 
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
              onClick={() => setCurrentCodeIndex(index)}
            >
              <FiFileText />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        <div className="code-container bg-gray-900 rounded-xl overflow-hidden flex-1 flex flex-col">
          <div className="code-header bg-gray-800 px-4 py-3 flex justify-between items-center">
            <span className="line-numbers text-sm text-gray-400">
              Строки: {currentFile.content.split('\n').length}
            </span>
            <button
              className={`copy-btn px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                copied ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary hover:bg-primary/30'
              }`}
              onClick={handleCopy}
            >
              {copied ? 'Скопировано!' : 'Скопировать код'}
            </button>
          </div>
          <div className="code-content flex-1 overflow-auto p-4">
            <pre className="m-0">
              <code className={`language-${currentFile.language} text-sm`}>
                {currentFile.content}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;