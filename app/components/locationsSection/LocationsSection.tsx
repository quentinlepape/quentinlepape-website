"use client";

import { useState } from "react";
import styles from "../../layout.module.css";
import { ICurriculumVitaeLocationsWorked } from "@/app/data/curriculumVitae";
import LocationsList from "./LocationsList";
import InteractiveGlobe from "./globe/InteractiveGlobe";

export default function LocationsSection() {
  const [focusedLocation, setFocusedLocation] =
    useState<ICurriculumVitaeLocationsWorked>();

  return (
    <section>
      <div className={styles.locationsListSection}>
        <h2 className="mb-2">Work locations</h2>
        <LocationsList onHover={setFocusedLocation} />
      </div>
      <div className={styles.globeWrapper}>
        <InteractiveGlobe focusedLocation={focusedLocation} />
      </div>
    </section>
  );
}
