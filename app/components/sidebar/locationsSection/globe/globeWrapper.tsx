"use client";

import { MutableRefObject } from "react";
import GlobeTmpl, { GlobeMethods, GlobeProps } from "react-globe.gl";

export type FCwithRef<P = {}, R = {}> = React.FunctionComponent<
  P & { ref?: React.MutableRefObject<R | undefined> }
>;

const Globe = ({
  forwardRef,
  ...otherProps
}: {
  forwardRef: MutableRefObject<GlobeMethods | undefined> | undefined;
  otherProps: FCwithRef<GlobeProps, GlobeMethods>;
}) => <GlobeTmpl {...otherProps} ref={forwardRef} />;

export default Globe;
