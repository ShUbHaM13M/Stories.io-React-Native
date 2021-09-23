import React, { useRef } from "react";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeContext";
import { dark, light } from "../../global/colors";

const TransitionView = ({ children }: { children: any }) => {
  const { setCurrentTheme } = useTheme();

  const ref = useRef<TransitioningView>(null);
  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={550} />
      <Transition.Out type="fade" durationMs={750} />
    </Transition.Together>
  );

  const changeAndTransitionTheme = () => {
    if (ref.current) ref.current.animateNextTransition();
    setCurrentTheme((prev) => (prev == light ? dark : light));
  };

  const elements = React.Children.toArray(children);
  const ElementsToRender = elements.map((child: any) =>
    React.cloneElement(child, { changeTheme: changeAndTransitionTheme })
  );

  return (
    <Transitioning.View style={{ flex: 1 }} {...{ ref, transition }}>
      {ElementsToRender}
    </Transitioning.View>
  );
};

export default TransitionView;
