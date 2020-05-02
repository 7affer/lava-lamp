import React from "react";
import { css, keyframes } from "emotion";

const getRandomizedPath = ({
  start = { x: 0, y: 0 },
  num = 10,
  step = 10,
  spread = 2
}) => {
  const calcSpreadX = (x, i) =>
    x + (-1) ** i * (Math.random() * spread + spread);
  const calcSpreadY = (y, i) => y + (i + 1) * step - step / 2;
  const getSpread = ({ x, y }, i) =>
    `${calcSpreadX(x, i)} ${calcSpreadY(y, i)}`;
  const getStep = ({ x, y }, i) => `${start.x} ${start.y + (i + 1) * step}`;

  return `
    M ${start.x} ${start.y} 
    ${[...new Array(num - 1)]
      .map((_, i) => `Q ${getSpread(start, i)}, ${getStep(start, i)}`)
      .join(" ")}
  `;
};

const containerStyles = css`
  width: 100%;

  svg {
    background-color: #000;
    background-image: radial-gradient(
        circle at 50% 120%,
        rgba(60, 30, 60, 1),
        rgba(0, 0, 0, 0) 50%
      ),
      radial-gradient(
        circle at -10% 65%,
        rgba(60, 0, 30, 1),
        rgba(0, 0, 0, 0) 60%
      ),
      radial-gradient(
        circle at 110% 65%,
        rgba(30, 0, 60, 1),
        rgba(0, 0, 0, 0) 60%
      );

    width: 600px;
    height: 600px;
  }
`;

const dashAnimation = (speed, delay, step, num) => css`
  stroke-dasharray: 13 ${step * num * 1000};
  animation: ${keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: ${-(step * num) * 0.5}; }
`} ${speed}s ease-in-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-delay: -${delay * 100}s;
`;

export const LavaLamp = () => {
  const paths = [...new Array(4)].map((_, i) => {
    const step = 40;
    const num = 5;
    return {
      key: i,
      strokeNum: (-1) ** i > 0 ? 1 : 2,
      className: dashAnimation(
        Math.random() * 5 + 5,
        Math.random() * 5 + 5,
        step,
        num
      ),
      pathString: getRandomizedPath({
        spread: (-1) ** i * Math.random() * 10 + 2,
        step,
        num
      }),
      width: Math.random() * 20 + 10
    };
  });

  return (
    <div className={containerStyles}>
      <svg viewBox="0 0 100 150">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3.5"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -7"
              result="goo"
            />
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
              result="finalGoo"
            />
          </filter>
          <linearGradient id="linear1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b03" />
            <stop offset="100%" stopColor="#f09" />
          </linearGradient>
          <linearGradient id="linear2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b30" />
            <stop offset="100%" stopColor="#f20" />
          </linearGradient>
        </defs>
        <g strokeLinecap="round" fill="transparent" filter="url(#goo)">
          {paths.map(({ key, className, pathString, width, strokeNum }) => (
            <path
              key={key}
              d={pathString}
              stroke={`url(#linear${strokeNum})`}
              transform={`translate(${50 + Math.random() * 10 - 5} 20)`}
              className={className}
              strokeWidth={width}
            />
          ))}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="transparent"
            stroke="transparent"
          />
        </g>
      </svg>
    </div>
  );
};
