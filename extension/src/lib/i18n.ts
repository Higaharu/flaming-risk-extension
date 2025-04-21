import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻訳リソース
const resources = {
  en: {
    translation: {
      popover: {
        title: 'Flaming Risk Analysis',
        riskLevel: 'Risk Level:',
        showHighlights: 'Show problematic phrases',
        hideHighlights: 'Hide problematic phrases',
        gotIt: 'Got it',
        close: 'Close'
      },
      risk: {
        low: 'Low Risk',
        medium: 'Medium Risk',
        high: 'High Risk'
      },
      options: {
        title: 'SNS Flaming Risk Detector Settings',
        platforms: 'Enabled Platforms',
        language: 'Language Preference',
        thresholds: 'Risk Thresholds',
        save: 'Save Settings',
        saved: 'Settings saved successfully!'
      }
    }
  },
  ja: {
    translation: {
      popover: {
        title: '炎上リスク分析',
        riskLevel: 'リスクレベル:',
        showHighlights: '問題のある表現を表示',
        hideHighlights: '問題表現を隠す',
        gotIt: '了解',
        close: '閉じる'
      },
      risk: {
        low: '低リスク',
        medium: '中リスク',
        high: '高リスク'
      },
      options: {
        title: 'SNS炎上リスク検出ツール設定',
        platforms: '有効なプラットフォーム',
        language: '言語設定',
        thresholds: 'リスク閾値',
        save: '設定を保存',
        saved: '設定が正常に保存されました！'
      }
    }
  }
};

// i18nの初期化
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('ja') ? 'ja' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // Reactは既にXSS対策を行っている
    }
  });

export default i18n;