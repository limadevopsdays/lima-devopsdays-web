
import { CustomTemplateParser } from "./CustomTemplateParser";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Utils/CustomTemplateParser",
  component: ()=> <div />,
};
export default meta;

type Story = StoryObj;

const parser = new CustomTemplateParser();
parser.registerDirective("highlight", (content, key) => (
  <mark key={key}>{content}</mark>
));

export const Default: Story = {
  render: () => (
    <div>
      {parser.parse(
        "This is %emphasisPrimary:important% and %emphasisSecondary:less important%."
      )}
    </div>
  ),
  name: "Default Directives",
};

export const WithCustomDirective: Story = {
  render: () => (
    <div>
      {parser.parse(
        "Highlight this: %highlight:custom highlight%! And %emphasisPrimary:primary%."
      )}
    </div>
  ),
  name: "With Custom Directive",
};

export const UnknownDirective: Story = {
  render: () => (
    <div>
      {parser.parse(
        "This is %unknown:should be plain text%."
      )}
    </div>
  ),
  name: "Unknown Directive",
};
