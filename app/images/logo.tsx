import { SVGProps } from "react";

const Logo: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.6}
      fillRule="evenodd"
      d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm0 1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Z"
      clipRule="evenodd"
    />
    <rect width={18} height={18} x={3} y={3} fill="#fff" rx={2} />
    <path
      fill="#000"
      fillOpacity={0.6}
      fillRule="evenodd"
      d="M3 0a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm0 1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M3 1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm4.417 6.418a2.582 2.582 0 1 1 5.164 0 2.582 2.582 0 0 1-5.164 0ZM5 15.164a5.166 5.166 0 0 1 10.002 0H5Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillOpacity={0.6}
      fillRule="evenodd"
      d="M10 4.836A2.582 2.582 0 1 0 10 10a2.582 2.582 0 0 0 0-5.164ZM10 11.291A5.166 5.166 0 0 0 5 15.164h10.002a5.166 5.166 0 0 0-5.001-3.873Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Logo;
