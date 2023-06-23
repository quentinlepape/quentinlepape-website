import { useState } from "react";
import styles from "../../../layout.module.css";
import { ICurriculumVitaeLocationsWorked } from "@/app/data/curriculumVitae";
import LocationsList from "./LocationsList";
import InteractiveGlobe from "./globe/InteractiveGlobe";

export default function LocationsSection({
  isGlobeExpanded,
  setGlobeExpanded,
  listLocation,
  globeLocation,
  setListLocation,
  setGlobeLocation,
}: {
  isGlobeExpanded: boolean;
  setGlobeExpanded: (isGlobeExpanded: boolean) => void;
  listLocation?: ICurriculumVitaeLocationsWorked;
  globeLocation?: ICurriculumVitaeLocationsWorked;
  setListLocation: (
    focusedLocation: ICurriculumVitaeLocationsWorked | undefined
  ) => void;
  setGlobeLocation: (
    focusedLocation: ICurriculumVitaeLocationsWorked | undefined
  ) => void;
}) {
  return (
    <section>
      <div className={styles.locationsListSection}>
        <h2 className="mb-2">Work locations</h2>
        <LocationsList
          onHover={setListLocation}
          onHoverOff={setListLocation}
          listLocation={listLocation}
          globeLocation={globeLocation}
        />
      </div>
      <div className={styles.globeWrapper}>
        <InteractiveGlobe
          listLocation={listLocation}
          globeLocation={globeLocation}
          setGlobeLocation={setGlobeLocation}
          isGlobeExpanded={isGlobeExpanded}
          onSetGlobeExpanded={setGlobeExpanded}
        />
      </div>
    </section>
  );
}
