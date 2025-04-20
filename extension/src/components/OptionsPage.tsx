import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 設定オプション型定義
 */
interface Settings {
  enabledPlatforms: {
    twitter: boolean;
    x: boolean;
    facebook: boolean;
    threads: boolean;
    linkedin: boolean;
  };
  riskThresholds: {
    low: number;
    high: number;
  };
  language: 'auto' | 'en' | 'ja';
  showNotification: boolean;
}

/**
 * 拡張機能の設定ページコンポーネント
 */
export const OptionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState<Settings>({
    enabledPlatforms: {
      twitter: true,
      x: true,
      facebook: true,
      threads: true,
      linkedin: true
    },
    riskThresholds: {
      low: 30,
      high: 70
    },
    language: 'auto',
    showNotification: true
  });
  const [isSaved, setIsSaved] = useState(false);

  // 設定を読み込み
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await chrome.storage.sync.get(null);
        setSettings(prev => ({
          ...prev,
          enabledPlatforms: result.enabledPlatforms || prev.enabledPlatforms,
          riskThresholds: result.riskThresholds || prev.riskThresholds,
          language: result.language || prev.language,
          showNotification: result.showNotification !== undefined ? result.showNotification : prev.showNotification
        }));
      } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
      }
    };

    loadSettings();
  }, []);

  // 言語変更時に適用
  useEffect(() => {
    if (settings.language === 'auto') {
      const browserLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
      i18n.changeLanguage(browserLang);
    } else {
      i18n.changeLanguage(settings.language);
    }
  }, [settings.language, i18n]);

  // プラットフォーム有効/無効の切り替え
  const handlePlatformChange = (platform: keyof Settings['enabledPlatforms']) => {
    setSettings(prev => ({
      ...prev,
      enabledPlatforms: {
        ...prev.enabledPlatforms,
        [platform]: !prev.enabledPlatforms[platform]
      }
    }));
  };

  // 言語設定の変更
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value as Settings['language']
    }));
  };

  // リスク閾値の変更
  const handleThresholdChange = (type: 'low' | 'high', value: number) => {
    setSettings(prev => ({
      ...prev,
      riskThresholds: {
        ...prev.riskThresholds,
        [type]: value
      }
    }));
  };

  // 通知設定の変更
  const handleNotificationChange = () => {
    setSettings(prev => ({
      ...prev,
      showNotification: !prev.showNotification
    }));
  };

  // 設定を保存
  const saveSettings = async () => {
    try {
      await chrome.storage.sync.set(settings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{t('options.title')}</h1>
      
      {/* プラットフォーム設定 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">{t('options.platforms')}</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(settings.enabledPlatforms).map(([platform, enabled]) => (
            <div key={platform} className="flex items-center">
              <input
                type="checkbox"
                id={`platform-${platform}`}
                checked={enabled}
                onChange={() => handlePlatformChange(platform as keyof Settings['enabledPlatforms'])}
                className="mr-2 h-5 w-5 text-blue-600"
              />
              <label htmlFor={`platform-${platform}`} className="text-gray-700 capitalize">
                {platform}
              </label>
            </div>
          ))}
        </div>
      </section>
      
      {/* 言語設定 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">{t('options.language')}</h2>
        <select
          value={settings.language}
          onChange={handleLanguageChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="auto">Auto (ブラウザ言語に従う)</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </section>
      
      {/* リスク閾値設定 */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">{t('options.thresholds')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              低リスク/中リスク境界: {settings.riskThresholds.low}%
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.riskThresholds.low}
              onChange={(e) => handleThresholdChange('low', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              中リスク/高リスク境界: {settings.riskThresholds.high}%
            </label>
            <input
              type="range"
              min="50"
              max="90"
              value={settings.riskThresholds.high}
              onChange={(e) => handleThresholdChange('high', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>
      
      {/* 通知設定 */}
      <section className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-notification"
            checked={settings.showNotification}
            onChange={handleNotificationChange}
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <label htmlFor="show-notification" className="text-gray-700">
            投稿前のポップアップ通知を表示する
          </label>
        </div>
      </section>
      
      {/* 保存ボタン */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('options.save')}
        </button>
      </div>
      
      {/* 保存メッセージ */}
      {isSaved && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
          {t('options.saved')}
        </div>
      )}
    </div>
  );
};