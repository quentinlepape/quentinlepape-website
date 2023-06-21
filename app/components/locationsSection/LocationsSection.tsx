"use client";

import { useState } from "react";
import styles from "../../layout.module.css";
import { ICurriculumVitaeLocationsWorked } from "@/app/data/curriculumVitae";
import LocationsList from "./LocationsList";
import InteractiveGlobe from "./globe/InteractiveGlobe";

export default function LocationsSection() {
  const [listLocation, setListLocation] =
    useState<ICurriculumVitaeLocationsWorked>();
  const [globeLocation, setGlobeLocation] =
    useState<ICurriculumVitaeLocationsWorked>();

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
          globeLocation={setGlobeLocation}
        />
      </div>
    </section>
  );
}
