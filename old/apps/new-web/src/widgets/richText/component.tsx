import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
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
  base: ["px-4", "py-20",],
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

  //TODO: the render node functions should be gotten from a IoC to allow configuration
  //from the CMS
  return <section
    style={{
      '--rich-text-background-color': backgroundColor,
      '--rich-text-text-color': textColor
    } as CSSProperties}
    className={resolvedClassName}
  >
    <div className='max-w-[1200px] mx-auto'>
      {documentToReactComponents(children, {
        preserveWhitespace: true,
        renderNode: {
          [BLOCKS.HEADING_1]: (node, children) => <h1
            className='text-2xl text-center md:text-5xl mb-12'>
              {children}
            </h1>,
          [BLOCKS.HEADING_2]: (node, children) => <h2
            className='text-xl md:text-2xl my-8'>
              {children}
            </h2>,
        }
      })}
    </div>
  </section>
}
