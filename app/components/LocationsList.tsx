import { CurriculumVitae } from "../data/curriculumVitae";
import styles from "../layout.module.css";

export default function LocationsList() {
  return (
    <ul className="text-medium text-S">
      {CurriculumVitae.locationsWorked.map((location, i) => (
        <li className={`${styles.location} flex flex-row items-center`} key={i}>
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
