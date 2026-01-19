import { useEffect, useRef, useState } from 'react';

const copyTextToClipboard = async (text) => {
  if (navigator?.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall through to the execCommand fallback.
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (error) {
    return false;
  }
};

const CopyMarkdownButton = ({ slug, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const markdownRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    markdownRef.current = null;

    const prefetchMarkdown = async () => {
      try {
        const response = await fetch(`/api/raw/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to prefetch markdown');
        }

        const markdownContent = await response.text();
        if (isMounted) {
          markdownRef.current = markdownContent;
        }
      } catch (error) {
        console.error('Failed to prefetch markdown:', error);
      }
    };

    prefetchMarkdown();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyMarkdown = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const markdownContent = markdownRef.current;
      if (!markdownContent) {
        throw new Error('Markdown not ready');
      }

      const didCopy = await copyTextToClipboard(markdownContent);
      if (!didCopy) {
        throw new Error('Failed to copy markdown');
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      // Fallback: copy the markdown URL instead
      const markdownUrl = `${window.location.origin}/${slug}.md`;
      const didCopyUrl = await copyTextToClipboard(markdownUrl);
      if (didCopyUrl) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Failed to copy markdown URL:', markdownUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCopyMarkdown}
      className={`copy-markdown-button ${className}`}
      title={copied ? 'Copied!' : 'Copy as Markdown'}
      disabled={loading}
      type="button"
    >
      {loading ? (
        <svg
          className="copy-icon spinning"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"
            fill="currentColor"
          />
        </svg>
      ) : copied ? (
        <svg
          className="copy-icon success"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          className="copy-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="8"
            y="2"
            width="8"
            height="4"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="copy-text">
        {copied ? 'Copied!' : 'MD'}
      </span>
    </button>
  );
};

export default CopyMarkdownButton;
