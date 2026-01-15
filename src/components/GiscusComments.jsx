/**
 * ABOUTME: Giscus commenting component powered by GitHub Discussions
 * ABOUTME: Lazily loads comments to avoid impacting initial page load
 */
import * as React from "react";
import Giscus from "@giscus/react";

const GiscusComments = ({ repo, repoId, category, categoryId }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
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
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default GiscusComments;
