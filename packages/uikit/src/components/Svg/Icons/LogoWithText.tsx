import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 1281 199" {...props}>
      <image
        width="1100.7764"
        height="209.92418"
        xlinkHref="data:image/png;base64,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"
        id="image579"
        x="62.514328"
        y="-2.4374888"
      />
      <image width="165.36459" height="165.36459" xlinkHref="https://1ech.com/1ech.png" x="61.001804" y="13.107101" />
    </Svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
