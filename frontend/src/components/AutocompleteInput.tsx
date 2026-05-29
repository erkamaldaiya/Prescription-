import { useRef, useState, useEffect, useCallback, KeyboardEvent, ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  field: string;
  context?: Record<string, string>;
  provider: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function AutocompleteInput({
  value,
  onChange,
  field,
  context = {},
  provider,
  placeholder,
  className = '',
  disabled = false,
}: Props) {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSuggestion = useCallback(
    async (text: string) => {
      if (text.trim().length < 3) {
        setSuggestion('');
        return;
      }
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setLoading(true);
      try {
        const res = await fetch('/api/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, text, context, provider }),
          signal: abortRef.current.signal,
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setSuggestion(data.suggestion || '');
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') setSuggestion('');
      } finally {
        setLoading(false);
      }
    },
    [field, context, provider]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    setSuggestion('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestion(newVal), 600);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      onChange(value + suggestion);
      setSuggestion('');
    } else if (e.key === 'Escape') {
      setSuggestion('');
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const inputStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontSize: '14px',
    padding: '8px 12px',
  };

  return (
    <div className="relative">
      {/* Ghost text */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center rounded-lg overflow-hidden"
        aria-hidden="true"
        style={{ padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit' }}
      >
        <span style={{ color: 'transparent' }}>{value}</span>
        <span style={{ color: '#9ca3af' }}>{suggestion}</span>
      </div>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-transparent relative z-10 ${className}`}
        style={inputStyle}
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
          <svg className="animate-spin w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      )}

      {suggestion && !loading && (
        <div className="mt-0.5 text-xs text-gray-400">
          Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-xs">Tab</kbd> to accept
        </div>
      )}
    </div>
  );
}
