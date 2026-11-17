/**
 * Runs before first paint so the correct theme class is on <html> and there is
 * no flash. Stored choice wins; otherwise dark is the default.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":true;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
