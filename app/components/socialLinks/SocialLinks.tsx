import Link from "next/link";
import * as SocialIcons from "../../images/social-icons";
import styles from "./socialLinks.module.css";

export default function SocialLinks(): JSX.Element {
  return (
    <ul className={`${styles.socialLinksList} flex flex-row text-dark`}>
      <li className={styles.item}>
        <Link href="mailto:quentinlepape@gmail.com" target="_blank">
          <SocialIcons.Email
            width={"1.125rem"}
            height={"1.125rem"}
          ></SocialIcons.Email>
        </Link>
      </li>
      <li className={styles.item}>
        <Link href="https://www.linkedin.com/in/quentinlepape" target="_blank">
          <SocialIcons.Linkedin
            width={"1.125rem"}
            height={"1.125rem"}
          ></SocialIcons.Linkedin>
        </Link>
      </li>
      <li className={styles.item}>
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
