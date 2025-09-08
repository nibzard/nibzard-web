import { visit } from 'unist-util-visit';

export default function remarkMermaidClient() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        // Replace code block with HTML that client-side Mermaid can render
        node.type = 'html';
        node.value = `<div class="mermaid">${node.value}</div>`;
      }
    });
  };
}