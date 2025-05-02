
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
   * @param template - The template string to parse
   * @returns React.ReactNode (a fragment)
   */
  parse(template: string): React.ReactNode {
    // Pattern: %directiveName:content%
    const regex = /%([\w]+):([^%]+)%/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    const nodes: React.ReactNode[] = [];

    while ((match = regex.exec(template)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(template.slice(lastIndex, match.index));
      }
      const [_, directive, content] = match;
      const render = this.directives[directive];
      if (render) {
        nodes.push(render(content, key++));
      } else {
        // Unknown directive: render as plain text
        nodes.push(match[0]);
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < template.length) {
      nodes.push(template.slice(lastIndex));
    }
    return <>{nodes}</>;
  }
}
