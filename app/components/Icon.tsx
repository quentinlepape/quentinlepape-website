import { SVGProps } from "react";
import { Rocket } from "../images/icons/rocket";
import { GlobeNetwork } from "../images/icons/globe-network";
import { GlobeMap } from "../images/icons/globe-map";
import { Cube } from "../images/icons/cube";
import { Share } from "../images/icons/share";
import { ArrowRight } from "../images/icons/arrow-right";
import { Cross } from "../images/icons/cross";
import { Location } from "../images/icons/location";
import { Mail } from "../images/icons/mail";
import { PdfDocument } from "../images/icons/pdf-document";
import { Instagram } from "../images/icons/instagram";
import { Linkedin } from "../images/icons/linkedin";
import { Mail2 } from "../images/icons/mail2";

const Icons = {
  Rocket: Rocket,
  GlobeNetwork: GlobeNetwork,
  GlobeMap: GlobeMap,
  Cube: Cube,
  Share: Share,
  ArrowRight: ArrowRight,
  Cross: Cross,
  Location: Location,
  Mail: Mail,
  PdfDocument: PdfDocument,
  Instagram: Instagram,
  Linkedin: Linkedin,
  Mail2: Mail2,
} as const;

export type IconName = keyof typeof Icons;

export type IconFlavor = "default" | "thin" | "bold" | "fill" | "duotone";

export interface ISVGIcon extends SVGProps<SVGSVGElement> {
  flavor?: IconFlavor;
}

const IconSizes = {
  "12": "0.75rem",
  "14": "0.875rem",
  "16": "1rem",
  "20": "1.25rem",
  "24": "1.5rem",
  "32": "2rem",
  "40": "2.5rem",
} as const;

export type IconSize = keyof typeof IconSizes;

interface IIcon {
  name: IconName;

  size?: IconSize;
  flavor?: IconFlavor;

  classNames?: string;
}

export default function Icon({
  name = "Cube",
  size = "16",
  flavor = "default",
  classNames,
}: IIcon): JSX.Element {
  const IconName: (props: ISVGIcon) => JSX.Element = Icons[name];
  return (
    <IconName
      width={IconSizes[size]}
      height={IconSizes[size]}
      flavor={flavor}
      className={classNames}
    ></IconName>
  );
}
