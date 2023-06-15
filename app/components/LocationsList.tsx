import {
  CurriculumVitae,
  ICurriculumVitaeLocationsWorked,
} from "../data/curriculumVitae";
import styles from "../layout.module.css";

function Locations(locations: ICurriculumVitaeLocationsWorked[]) {
  const locationsList: React.JSX.Element[] = [];
  locations.forEach((location) => {
    const secondaryLabel: React.JSX.Element | null = location.detail ? (
      <span className="text-faded"> ({location.detail})</span>
    ) : null;
    locationsList.push(
      <li className={styles.location}>
        {location.locationName}
        {secondaryLabel}
      </li>
    );
  });

  return locationsList;
}

// TODO: Update this code with exampke from https://nextjs.org/learn/foundations/from-javascript-to-react/displaying-data-with-props

export default function LocationsList() {
  return (
    <ul className="text-medium text-S">
      {Locations(CurriculumVitae.locationsWorked)}
    </ul>
  );
}
