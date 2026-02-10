/**
 * CustomTemplateParser is a simple, extensible parser for custom text templating in React.
 *
 * It supports directives in the form of `%directiveName:content%` and allows registration of custom directives.
 * The parser returns a React fragment, so you can use it inside any parent element (p, div, etc).
 *
 * Example usage:
 *   const parser = new CustomTemplateParser();
 *   parser.registerDirective("highlight", (content, key) => <mark key={key}>{content}</mark>);
 *   // In your component:
 *   {parser.parse("This is %emphasisPrimary:important% and %highlight:custom highlight%!")}
 */

export type RenderCallback = (content: string, key: number) => React.ReactNode;

export interface DirectiveMap {
  [name: string]: RenderCallback;
}

export class CustomTemplateParser {
  directives: DirectiveMap = {};

  constructor() {
    // Register default directives
    this.registerDirective("emphasisPrimary", (content, key) => (
      <span className="text-paragraph-enphasis-primary" key={key}>
        {content}
      </span>
    ));
    this.registerDirective("emphasisSecondary", (content, key) => (
      <span className="text-paragraph-enphasis-secondary" key={key}>
        {content}
      </span>
    ));
  }

  /**
   * Register a new directive with a render callback.
   * @param name - The directive name (e.g., "highlight")
   * @param render - A function that returns a React node for the directive content
   */
  registerDirective(name: string, render: RenderCallback) {
    this.directives[name] = render;
  }

  /**
   * Parse a template string and return a React fragment with directives rendered.
   * Also parses markdown links [text](url) and replaces them with anchor tags.
   * Now also parses markdown subtitles (## Subtitle) as <h2>.
   * @param template - The template string to parse
   * @returns React.ReactNode (a fragment)
   */
  parse(template: string): React.ReactNode {
    // Pattern: %directiveName:content%
    const directiveRegex = /%([\w]+):([^%]+)%/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    const nodes: React.ReactNode[] = [];

    // Helper to parse markdown links in plain text and return nodes
    const parseMarkdownLinks = (text: string): React.ReactNode[] => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let linkLastIndex = 0;
      let linkMatch;
      const linkNodes: React.ReactNode[] = [];
      while ((linkMatch = linkRegex.exec(text)) !== null) {
        if (linkMatch.index > linkLastIndex) {
          linkNodes.push(text.slice(linkLastIndex, linkMatch.index));
        }
        const [_, linkText, linkUrl] = linkMatch;
        linkNodes.push(
          <a
            href={linkUrl}
            key={`mdlink-${key++}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paragraph-enphasis-secondary"
          >
            {linkText}
          </a>
        );
        linkLastIndex = linkRegex.lastIndex;
      }
      if (linkLastIndex < text.length) {
        linkNodes.push(text.slice(linkLastIndex));
      }
      return linkNodes;
    };

    // Helper to parse markdown subtitles (## Subtitle) as <h2>
    const parseMarkdownSubtitles = (text: string): React.ReactNode[] => {
      const lines = text.split(/\r?\n/);
      const result: React.ReactNode[] = [];
      for (const line of lines) {
        const subtitleMatch = line.match(/^##\s+(.+)/);
        if (subtitleMatch) {
          result.push(<h2 key={`subtitle-${key++}`} className="text-xl font-bold my-6">{subtitleMatch[1]}</h2>);
        } else {
          result.push(...parseMarkdownLinks(line));
        }
        result.push("\n"); // preserve line breaks
      }
      return result;
    };

    while ((match = directiveRegex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        // Parse markdown subtitles and links in the plain text segment
        nodes.push(...parseMarkdownSubtitles(template.slice(lastIndex, match.index)));
      }
      const [_, directive, content] = match;
      const render = this.directives[directive];
      if (render) {
        nodes.push(render(content, key++));
      } else {
        // Unknown directive: render as plain text
        nodes.push(match[0]);
      }
      lastIndex = directiveRegex.lastIndex;
    }
    if (lastIndex < template.length) {
      nodes.push(...parseMarkdownSubtitles(template.slice(lastIndex)));
    }
    return <>{nodes}</>;
  }
}
