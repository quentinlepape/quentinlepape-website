import {
  CurriculumVitae,
  ICurriculumVitaeLocationsWorked,
} from "@/app/data/curriculumVitae";
import styles from "../../../layout.module.css";
import Icon from "../../Icon";

export default function LocationsList({
  listLocation,
  globeLocation,
  onHover,
  onHoverOff,
}: {
  listLocation?: ICurriculumVitaeLocationsWorked;
  globeLocation?: ICurriculumVitaeLocationsWorked;
  onHover: (focusedLocation: ICurriculumVitaeLocationsWorked) => void;
  onHoverOff: (focusedLocation: undefined) => void;
}) {
  return (
    <ul className="text-medium text-S">
      {CurriculumVitae.locationsWorked.map((location, i) => (
        <li
          className={`${styles.location} ${
            location == (listLocation || globeLocation) && styles.focused
          } flex flex-row items-center justify-between`}
          onMouseEnter={(e) => {
            onHover(location);
          }}
          onMouseLeave={(e) => {
            onHoverOff(undefined);
          }}
          key={i}
        >
          <div className="flex flex-row items-center">
            <span className={styles.pinIcon}>📍</span>
            <span className={styles.locationName}>{location.locationName}</span>
            {location.detail && (
              <span className="text-faded"> ({location.detail})</span>
            )}
            {location.current && <span className={styles.liveIndicator}></span>}
          </div>
          <div
            className={`${styles.hoverIndicator} flex flex-row items-center`}
          >
            <Icon name="GlobeNetwork" flavor="thin" size="16" />
          </div>
        </li>
      ))}
    </ul>
  );
}
