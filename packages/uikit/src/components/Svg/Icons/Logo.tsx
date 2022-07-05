import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 198 199" {...props}>
      <image width="198" height="198" xlinkHref="https://1ech.com/1ech.png" x="0" y="0" />
    </Svg>
  );
};

export default Icon;
