'use client';

export default function AskAIButton({
  variant = 'default',
  text = 'Ask AI',
  showIcon = true,
}) {
  return (
    <button
      onClick={() => window.Kapa?.open()}
      className={`ask-ai-button ask-ai-button--${variant}`}
      type="button"
    >
      {text}
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginLeft: '4px' }}
        >
          <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
        </svg>
      )}
    </button>
  );
}
