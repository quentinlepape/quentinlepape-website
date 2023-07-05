import Link from "next/link";
import * as SocialIcons from "../../images/social-icons";
import styles from "./socialLinks.module.css";
import Icon from "../Icon";

export default function SocialLinks(): JSX.Element {
  return (
    <ul className={`${styles.socialLinksList} flex flex-row text-dark`}>
      <li className={styles.item}>
        <Link
          href="https://www.linkedin.com/in/quentinlepape"
          target="_blank"
          aria-label="Visit my Linkedin page"
        >
          <Icon name="Linkedin" flavor="duotone" size="20" />
        </Link>
      </li>
      {/* <li className={styles.item}>
        <Link
          href="https://www.instagram.com/quentinlepape/"
          target="_blank"
          aria-label="Visit my Instagram page"
        >
          <Icon name="Instagram" flavor="duotone" size="20" />
        </Link>
      </li> */}
      <li className={styles.item}>
        <Link
          href="/QuentinLePape_Resume.pdf"
          target="_blank"
          aria-label="Visit my Instagram page"
        >
          <Icon name="PdfDocument" flavor="duotone" size="20" />
        </Link>
      </li>
      <li className={styles.item}>
        <Link
          href="mailto:quentinlepape@gmail.com"
          target="_blank"
          aria-label="Send me an email"
        >
          <Icon name="Mail2" flavor="duotone" size="20" />
        </Link>
      </li>
    </ul>
  );
}
