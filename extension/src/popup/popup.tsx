import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">SNS炎上リスク検出</h1>
      <p className="text-sm">この拡張機能はSNS投稿の炎上リスクを自動的に分析します。</p>
      <hr className="my-2" />
      <p className="text-xs text-gray-500">入力フィールドに3秒以上変更がないとリスク分析が実行されます。</p>
    </div>
  </React.StrictMode>
);