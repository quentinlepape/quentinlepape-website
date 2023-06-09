import { ISVGIcon } from "@/app/components/Icon";

function Share({ flavor, ...props }: ISVGIcon) {
  switch (flavor) {
    default: {
      return (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <g>
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.99,13.99h-9v-9h4.76l2-2H0.99c-0.55,0-1,0.45-1,1v11c0,0.55,0.45,1,1,1h11 c0.55,0,1-0.45,1-1V7.24l-2,2V13.99z M14.99-0.01h-5c-0.55,0-1,0.45-1,1s0.45,1,1,1h2.59L7.29,7.28C7.1,7.47,6.99,7.72,6.99,7.99 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l5.29-5.29v2.59c0,0.55,0.45,1,1,1s1-0.45,1-1v-5C15.99,0.44,15.54-0.01,14.99-0.01 z"
              />
            </g>
          </g>
        </svg>
      );
    }
    case "thin": {
      return (
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 18H2V5h8.76l2-2H1c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1h15c.55 0 1-.45 1-1V7.24l-2 2V18zm4-18h-7c-.55 0-1 .45-1 1s.45 1 1 1h4.59l-7.3 7.29a1.003 1.003 0 0 0 1.42 1.42L18 3.41V8c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1z"
          />
        </svg>
      );
    }
  }
}

export { Share };
