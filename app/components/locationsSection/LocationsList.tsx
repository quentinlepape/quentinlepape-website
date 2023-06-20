import {
  CurriculumVitae,
  ICurriculumVitaeLocationsWorked,
} from "@/app/data/curriculumVitae";
import styles from "../../layout.module.css";
import Icon from "../Icon";

export default function LocationsList({
  onHover,
}: {
  onHover: (focusedLocation: ICurriculumVitaeLocationsWorked) => void;
}) {
  return (
    <ul className="text-medium text-S">
      {CurriculumVitae.locationsWorked.map((location, i) => (
        <li
          className={`${styles.location} flex flex-row items-center`}
          onMouseEnter={(e) => {
            onHover(location);
          }}
          key={i}
        >
          <div
            className={`${styles.hoverIndicator} flex flex-row items-center`}
          >
            <Icon name="ArrowRight" flavor="thin" size="16" />
          </div>
          <span className={styles.pinIcon}>📍</span>
          {location.locationName}
          {location.detail && (
            <span className="text-faded"> ({location.detail})</span>
          )}
          {location.current && <span className={styles.liveIndicator}></span>}
        </li>
      ))}
    </ul>
  );
}
