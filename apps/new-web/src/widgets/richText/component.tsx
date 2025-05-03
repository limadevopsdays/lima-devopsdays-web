import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { CSSProperties } from 'react';
import { tv } from 'tailwind-variants';

export interface DefaultRichTextRendererProps {
  children: Parameters<typeof documentToReactComponents>[0];
  predefinedBackgroundColor?: 'gray3'| 'gray4' | 'gray5';
  predefinedTextColor?: 'white' | 'black';
  backgroundColor?: string;
  textColor?: string;
}


const richTextWrapper = tv({
  variants: {
    predefinedBackgroundColor: {
      gray3: 'bg-gray-3',
      gray4: 'bg-gray-4',
      gray5: 'bg-gray-5'
    },
    predefinedTextColor: {
      white: 'text-white',
      black: 'text-black'
    },
    backgroundColor:{
      true: 'bg-(--rich-text-background-color)',
    },
    textColor: {
      true: 'text-(--rich-text-text-color)',
    }
  }
})

export default function RichTextDefaultRenderer({
  children,
  backgroundColor,
  predefinedBackgroundColor,
  predefinedTextColor,
  textColor
}: Readonly<DefaultRichTextRendererProps>) {
  const resolvedClassName = richTextWrapper({
    predefinedBackgroundColor,
    predefinedTextColor,
    backgroundColor: !!backgroundColor,
    textColor: !!textColor
  })

  return <section
    style={{
      '--rich-text-background-color': backgroundColor,
      '--rich-text-text-color': textColor
    } as CSSProperties}
    className={resolvedClassName}
  >
    {documentToReactComponents(children, {

    })}
  </section>
}
