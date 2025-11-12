import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

// This entire block of code will only ever run ONCE in your app's lifecycle.
marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        const highlightedCode = hljs.highlight(code, { language }).value;

        const lines = highlightedCode.split('\n');

        const numberedLines = lines.map((line, index) => {
            if (index === lines.length - 1 && !line) {
                return '';
            }
            return `<span class="line">
                        <span class="line-number">${index + 1}</span>
                        <span class="line-content">${line || ' '}</span>
                    </span>`;
        });

        return numberedLines.join('\n');
    }
}));

// Export the already-configured instance
export const markdownParser = marked;