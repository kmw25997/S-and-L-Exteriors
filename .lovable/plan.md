

## Fix: Remove Markdown Code Fences from index.html

### Problem
The `index.html` file is wrapped in markdown code fence markers (`` ```html `` on line 1 and `` ``` `` on line 49). The browser renders these as visible text on the page. You can see `` ```html `` briefly on load and behind the header when scrolling.

### Plan
Remove lines 1 and 49 from `index.html` so the file contains only valid HTML (starting with `<!doctype html>` and ending with `</html>`).

