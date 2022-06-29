import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <image
        width="96"
        height="96"
        xlinkHref="https://assets.coingecko.com/coins/images/25498/large/SpO_F8a0_400x400.jpg?1652077746"
      />
    </Svg>
  );
};

export default Icon;
