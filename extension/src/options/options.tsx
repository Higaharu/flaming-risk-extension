import React from 'react';
import { createRoot } from 'react-dom/client';
import { OptionsPage } from '../components/OptionsPage';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import '../styles/globals.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <OptionsPage />
    </I18nextProvider>
  </React.StrictMode>
);