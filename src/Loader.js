import React from "react";
import { css, keyframes } from "emotion";

const svgStyles = size => css`
  width: ${size}px;
  height: ${size}px;
`;

const dashAnimation = (pathLength, speed = 1, bias = 0, dilate = 2.5) => css`
  stroke-dasharray: ${pathLength};
  stroke-dashoffset: ${pathLength};
  animation: ${keyframes`
    ${25 + bias * dilate}% { stroke-dashoffset: 0; }
    ${50 + bias * dilate}% { stroke-dashoffset: -${pathLength}; }
    ${75 + bias * dilate}% { stroke-dashoffset: -${2 * pathLength}; }
    100% { stroke-dashoffset: -${3 * pathLength}; }
  `} ${speed}s linear;
  animation-iteration-count: infinite;
`;

export const Loader = ({
  size = 100,
  circlesNum = 5,
  color = "#a0f",
  strokeWidth = 2.5,
  speed = 4
}) => {
  const circles = [...Array(circlesNum)].map((_, index) => ({
    className: dashAnimation(2 * Math.PI * (50 - index * 2), speed, index),
    r: 50 - strokeWidth * (index + 1),
    opacity: 1 - index / 8
  }));

  return (
    <svg className={svgStyles(size)} viewBox="0 0 100 100">
      <g strokeWidth={strokeWidth + 0.5} stroke={color} fill="none">
        {circles.map(({ className, r, opacity }) => (
          <circle
            strokeOpacity={opacity}
            className={className}
            cx="50"
            cy="50"
            r={r}
          />
        ))}
      </g>
    </svg>
  );
};
