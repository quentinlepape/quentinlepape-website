import Link from "next/link";
import * as SocialIcons from "../images/social-icons";

export default function SocialLinks(): JSX.Element {
  return (
    <ul className="flex flex-row gap-1 text-dark">
      <li>
        <Link href="mailto:quentinlepape@gmail.com" target="_blank">
          <SocialIcons.Email
            width={"1.125rem"}
            height={"1.125rem"}
          ></SocialIcons.Email>
        </Link>
      </li>
      <li>
        <Link href="https://www.linkedin.com/in/quentinlepape" target="_blank">
          <SocialIcons.Linkedin
            width={"1.125rem"}
            height={"1.125rem"}
          ></SocialIcons.Linkedin>
        </Link>
      </li>
      <li>
        <Link href="https://www.instagram.com/quentinlepape/" target="_blank">
          <SocialIcons.Instagram
            width={"1.125rem"}
            height={"1.125rem"}
          ></SocialIcons.Instagram>
        </Link>
      </li>
    </ul>
  );
}
