import { useState } from 'react';

export type AIProvider = 'gemini' | 'openai' | 'claude';

interface Props {
  provider: AIProvider;
  onChange: (p: AIProvider) => void;
}

const PROVIDERS: { id: AIProvider; label: string; available: boolean }[] = [
  { id: 'gemini', label: 'Gemini (Google)', available: true },
  { id: 'openai', label: 'ChatGPT (OpenAI)', available: false },
  { id: 'claude', label: 'Claude (Anthropic)', available: false },
];

export default function ProviderSettings({ provider, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const current = PROVIDERS.find((p) => p.id === provider)!;

  return (
    <div className="relative no-print">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-colors"
        title="AI Provider settings"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.575 1.567a1.875 1.875 0 01-2.651 0L14.25 15m5.55 0v5.25a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V15m5.55 0H5" />
        </svg>
        <span className="font-medium">{current.label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            AI Provider
          </div>
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              disabled={!p.available}
              onClick={() => { onChange(p.id); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                ${p.available ? 'hover:bg-blue-50 cursor-pointer' : 'opacity-40 cursor-not-allowed'}
                ${provider === p.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}
              `}
            >
              {provider === p.id && (
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {provider !== p.id && <span className="w-4 shrink-0" />}
              <span>{p.label}</span>
              {!p.available && (
                <span className="ml-auto text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">Soon</span>
              )}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
