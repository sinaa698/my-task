import React from "react";

type mainComponentProps<P> = P & {
  className?: string | "";
  onClick?: () => void;
  onChange?: (e: any) => void;
};

export interface ReactFC<P = {}> extends React.FC<mainComponentProps<P>> {}
