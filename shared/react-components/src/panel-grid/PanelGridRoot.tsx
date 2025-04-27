import { createStyledComponent } from '@dyesthetics-lab/react-component-creators'

// TODO: Create more general layouts beyond PanelGridRoot for greater flexibility in the near future.
// TODO: Evaluate adding variants to position rows and root in different fashions.

const PanelGridRoot = createStyledComponent({
  Component: "div",
  classNameResolver: ({ className }) => `flex flex-col items-center justify-center gap-2 ${className}`,
  divideProps: (props) => {
    const { ...rest } = props;

    return {
      styleProps: {},
      componentOwnProps: rest,
    };
  }
});

export default PanelGridRoot;
