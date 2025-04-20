import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

interface RiskPopoverProps {
  risk: number;
  highlightedText: string;
  originalText: string;
  onClose: () => void;
}

/**
 * 炎上リスク表示用ポップオーバーコンポーネント
 */
export const RiskPopover: React.FC<RiskPopoverProps> = ({ 
  risk, 
  highlightedText, 
  originalText, 
  onClose 
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // リスクレベルに応じた色を取得
  const getRiskColor = (): string => {
    if (risk >= 70) return 'bg-red-500';
    if (risk >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // リスクレベルに応じたテキストを取得
  const getRiskText = (): string => {
    if (risk >= 70) return t('risk.high');
    if (risk >= 30) return t('risk.medium');
    return t('risk.low');
  };

  // アニメーション用のマウント効果
  useEffect(() => {
    // マウント時にフェードイン
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // ハイライトされたテキストを安全にレンダリング
  const sanitizedHighlightedText = DOMPurify.sanitize(highlightedText, {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class']
  });

  return (
    <div 
      className={`fixed bottom-16 right-4 z-50 transition-opacity duration-300 max-w-md 
                ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getRiskColor()}`} />
            <h3 className="font-medium text-gray-800">{t('popover.title')}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={t('popover.close')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* リスク表示 */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">{t('popover.riskLevel')}</div>
            <div className="font-semibold">
              <span className={risk >= 70 ? 'text-red-600' : risk >= 30 ? 'text-yellow-600' : 'text-green-600'}>
                {risk}%
              </span>
              <span className="ml-1 text-gray-700">({getRiskText()})</span>
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
            <div 
              className={`h-2.5 rounded-full ${getRiskColor()}`} 
              style={{ width: `${risk}%` }}
            ></div>
          </div>
          
          {/* 問題箇所ハイライト（展開可能） */}
          {risk >= 30 && (
            <div className="mt-2">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none flex items-center"
                aria-expanded={isExpanded}
              >
                {isExpanded ? t('popover.hideHighlights') : t('popover.showHighlights')}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isExpanded && (
                <div className="mt-2 p-3 bg-gray-50 rounded text-sm border border-gray-200">
                  <div
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{ __html: sanitizedHighlightedText }}
                  />
                </div>
              )}
            </div>
          )}
          
          {/* アドバイス */}
          {risk >= 70 && (
            <div className="mt-3 text-sm text-red-600">
              <p>{t('popover.highRiskWarning')}</p>
            </div>
          )}
          {risk >= 30 && risk < 70 && (
            <div className="mt-3 text-sm text-yellow-600">
              <p>{t('popover.mediumRiskWarning')}</p>
            </div>
          )}
        </div>
        
        {/* フッター */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {t('popover.gotIt')}
          </button>
        </div>
      </div>
    </div>
  );
};