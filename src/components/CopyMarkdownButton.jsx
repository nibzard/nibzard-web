import { useState } from 'react';

const CopyMarkdownButton = ({ slug, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyMarkdown = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/raw/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch markdown');
      }
      
      const markdownContent = await response.text();
      await navigator.clipboard.writeText(markdownContent);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      // Fallback: copy the markdown URL instead
      const markdownUrl = `${window.location.origin}/${slug}.md`;
      await navigator.clipboard.writeText(markdownUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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