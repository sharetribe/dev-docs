'use client';
import { useEffect } from 'react';

export default function KapaWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.kapa.ai/kapa-widget.bundle.js';
    script.async = true;
    const attrs = {
      'data-website-id': 'adc8b7cb-4e4a-4f1d-aef2-274477f095da',
      'data-project-name': 'Sharetribe',
      'data-project-color': '#181616',
      'data-mcp-enabled': 'true',
      'data-mcp-server-url': 'https://sharetribe.mcp.kapa.ai',
      'data-project-logo':
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqHt-LCCSvT41C827y-LrXf1etlv8uqUV_g&s',
      'data-bot-protection-mechanism': 'hcaptcha',
      'data-modal-override-open-id': 'ask-ai-input',
      'data-modal-override-open-class': 'search-input',
      'data-user-analytics-fingerprint-enabled': 'true',
      'data-modal-title': 'Sharetribe AI Assistant',
      'data-modal-example-questions-title': 'Try asking me...',
      'data-modal-disclaimer':
        'This **AI assistant answers Sharetribe questions** using our [documentation](https://www.sharetribe.com/docs/), [API reference](https://www.sharetribe.com/api-reference/), [help center](https://www.sharetribe.com/help/en/), [blogs](https://www.sharetribe.com/developer-blog/), [SDK reference](https://sharetribe.github.io/flex-sdk-js/) and [github files](https://github.com/sharetribe/web-template/).',
      'data-button-text-color': '#FFFFFF',
      'data-modal-header-bg-color': '#181616',
      'data-modal-title-color': '#FFFFFF',
      'data-consent-required': 'true',
      'data-consent-screen-title':
        'Using our AI assistant requires anonymous user tracking',
      'data-consent-screen-disclaimer':
        "By clicking 'Allow tracking and use AI assistant', you consent to anonymous user tracking which helps us improve our service. We don't collect any personally identifiable information.",
      'data-consent-screen-accept-button-text':
        'Allow tracking and use AI assistant',
      'data-consent-screen-reject-button-text': 'No, thanks',
      'data-search-keyboard-nav-enabled': 'true',
    };
    Object.entries(attrs).forEach(([key, value]) =>
      script.setAttribute(key, value)
    );
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
}
