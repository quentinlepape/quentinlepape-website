import { ISVGIcon } from "@/app/components/Icon";

function Mail({ flavor, ...props }: ISVGIcon) {
  switch (flavor) {
    default: {
      return (
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          {...props}
        >
          <path
            fillRule="evenodd"
            d="M0 3.06v9.88L4.94 8 0 3.06zM14.94 2H1.06L8 8.94 14.94 2zm-6.41 8.53c-.14.14-.32.22-.53.22s-.39-.08-.53-.22L6 9.06 1.06 14h13.88L10 9.06l-1.47 1.47zM11.06 8 16 12.94V3.06L11.06 8z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    case "thin": {
      return (
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          {...props}
        >
          <path
            fillRule="evenodd"
            d="M0 4.01v11.91l6.27-6.27L0 4.01zm18.91-1.03H1.09L10 10.97l8.91-7.99zm-5.18 6.66L20 15.92V4.01l-6.27 5.63zm-3.23 2.9c-.13.12-.31.19-.5.19s-.37-.07-.5-.19l-2.11-1.89-6.33 6.33h17.88l-6.33-6.33-2.11 1.89z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }
}

export { Mail };
