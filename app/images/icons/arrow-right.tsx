import { ISVGIcon } from "@/app/components/Icon";

function ArrowRight({ flavor, ...props }: ISVGIcon) {
  switch (flavor) {
    default: {
      return (
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m14.7 7.29-5-5a.965.965 0 0 0-.71-.3 1.003 1.003 0 0 0-.71 1.71l3.29 3.29H1.99c-.55 0-1 .45-1 1s.45 1 1 1h9.59l-3.29 3.29a1.003 1.003 0 0 0 1.42 1.42l5-5c.18-.18.29-.43.29-.71s-.12-.52-.3-.7z"
          />
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
            d="m18.71 9.29-6-6a1.003 1.003 0 0 0-1.42 1.42L15.59 9H2c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"
          />
        </svg>
      );
    }
  }
}

export { ArrowRight };
