import Link from "next/link";
import Icon from "../Icon";
import styles from "./lightbox.module.css";

export default function Lightbox({
  title,
  subtitle,
  link,
  onClose,
  children,
}: {
  title?: string;
  subtitle?: string;
  link?: URL;
  onClose: () => void;
  children?: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`cursor-pointer fixed z-10 inset-0 h-full w-full bg-backdrop flex items-center justify-center ${
        styles.lightbox
      } ${children ? "block opacity-100" : "hidden opacity-0"} transition`}
      onClick={onClose}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="w-4/5 max-w-video-720p relative cursor-default"
      >
        <div className="h-full w-full overflow-hidden border border-white/40 rounded-lg backdrop-blur bg-white/.06 text-white experimental-shadow">
          <div className="flex flex-row justify-between border-b border-white/40">
            <div className="flex flex-row gap-3 items-center px-5 py-3">
              {/* <Icon name="Rocket" size="16"></Icon> */}
              <div className="separate-2 separate-slash separate-opacity-50">
                <div className="text-S text-bold text-uppercase text-white/80 inline opacity-50">
                  {subtitle && subtitle}
                </div>
                <h3 className="text-S text-bold text-uppercase text-white/80 inline">
                  {title && title}
                </h3>
              </div>
            </div>
            {link && (
              <Link
                href={link}
                className="text-S text-white/80 border-l border-white/40 h-auto px-5 flex items-center justify-center shrink-0 hover:bg-white/.06 group relative left-0 hover:left-0.5 transition"
                target="_blank"
              >
                Learn more
                <Icon
                  name="ArrowRight"
                  size="14"
                  flavor="thin"
                  classNames="-mb-0.5 ml-2.5 transition"
                />
              </Link>
            )}
          </div>

          <div
            style={
              children?.props.width &&
              children?.props.height && {
                aspectRatio: children.props.width / children.props.height,
              }
            }
            className={`${styles.wrapper} w-full overflow-hidden`}
          >
            {children}
          </div>
        </div>
        <button
          onClick={onClose}
          className={`${styles.closeButton} transition text-white/80 absolute top-0 aspect-square border border-white/40 rounded-lg backdrop-blur bg-white/.06 text-white experimental-shadow flex items-center justify-center`}
        >
          <Icon name="Cross" size="20" flavor="thin"></Icon>
        </button>
      </div>
    </div>
  );
}
