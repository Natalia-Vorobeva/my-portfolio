// components/ui/CodeModal.js
import React from 'react';

const CodeModal = ({
  isOpen,
  onClose,
  codeFiles,
  currentCodeIndex,
  onPrev,
  onNext,
  onCopy,
  onSetCurrentIndex,
  copied
}) => {
  // console.log('CodeModal props:', { isOpen, codeFiles, currentCodeIndex }); // Уберите console.log в продакшене

  if (!isOpen) return null;

  const currentFile = codeFiles[currentCodeIndex] || {};

  // Проверяем, есть ли контент для копирования
  const hasCopyableContent = currentFile.content && currentFile.content.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl border border-primary/30 shadow-2xl overflow-hidden">
        {/* Модальное окно */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-sm font-mono text-gray-300">
              {currentFile.fileName || 'code.js'}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
              {currentFile.language || 'javascript'}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[70vh]">
          <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap">
            {currentFile.content || '// No code available'}
          </pre>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex space-x-2">
            <button
              onClick={() => onPrev()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 transition-colors"
              disabled={codeFiles.length <= 1}
            >
              ← Prev
            </button>
            <button
              onClick={() => onNext()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 transition-colors"
              disabled={codeFiles.length <= 1}
            >
              Next →
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {codeFiles.length > 1 && (
              <div className="flex space-x-2">
                {codeFiles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSetCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentCodeIndex ? 'bg-primary' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to file ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {hasCopyableContent ? (
              <button
                onClick={() => onCopy(currentFile.content)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary hover:bg-primary/80 text-white'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            ) : (
              <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed">
                No code to copy
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;