import React from 'react';
import { Root } from 'react-dom/client';
import { RiskPopover } from '../components/RiskPopover';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';

/**
 * ポップオーバーProps定義
 */
interface PopoverProps {
  risk: number;
  highlightedText: string;
  originalText: string;
  onClose: () => void;
}

/**
 * ReactポップオーバーコンポーネントをDOMに注入
 */
export function injectRiskPopover(root: Root, props: PopoverProps): void {
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <RiskPopover 
          risk={props.risk} 
          highlightedText={props.highlightedText} 
          originalText={props.originalText}
          onClose={props.onClose}
        />
      </I18nextProvider>
    </React.StrictMode>
  );
}