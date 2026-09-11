/**
 * ABOUTME: Giscus commenting component powered by GitHub Discussions
 * ABOUTME: Lazily loads comments to avoid impacting initial page load
 */
import * as React from "react";
import Giscus from "@giscus/react";

const GiscusComments = ({ repo, repoId, category, categoryId }) => {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    setMounted(true);

    // The site toggle writes data-theme on <html>; giscus lives in a
    // cross-origin iframe and cannot see it, so mirror it into the widget.
    const root = document.documentElement;
    setTheme(root.getAttribute("data-theme") || "light");

    const observer = new MutationObserver(() => {
      setTheme(root.getAttribute("data-theme") || "light");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="giscus-wrapper">
      <Giscus
        id="comments"
        repo={repo}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default GiscusComments;
