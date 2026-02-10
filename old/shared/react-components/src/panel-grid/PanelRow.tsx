import { createStyledComponent } from '@dyesthetics-lab/react-component-creators';

// TODO: Evaluate adding variants to position rows in different fashions.

const PanelRow = createStyledComponent({
  Component: "div",
  classNameResolver: ({ className }) => `flex justify-center flex-wrap gap-2 ${className ?? ''}`,
  divideProps: (props) => {
    const { ...rest } = props;

    return {
      styleProps: {},
      componentOwnProps: rest,
    };
  }
});

export default PanelRow;
