"use client";

import { useState } from "react";
import styles from "../../layout.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.svg";
import LocationsSection from "./locationsSection/LocationsSection";
import { ICurriculumVitaeLocationsWorked } from "@/app/data/curriculumVitae";
import Icon from "@/app/components/Icon";

export default function Sidebar() {
  const [isGlobeExpanded, setGlobeExpanded] = useState<boolean>(false);
  const [listLocation, setListLocation] =
    useState<ICurriculumVitaeLocationsWorked>();
  const [globeLocation, setGlobeLocation] =
    useState<ICurriculumVitaeLocationsWorked>();

  function handleCloseGlobe() {
    setGlobeExpanded(false);
    setListLocation(undefined);
    setGlobeLocation(undefined);
  }

  return (
    <div
      className={`${styles.sidebarWrapper} ${
        isGlobeExpanded ? styles.isGlobeExpanded : ""
      } relative h-full grow-0 shrink-0`}
      onClick={() => handleCloseGlobe()}
    >
      <div
        className={`${styles.sidebar} fixed h-full p-10 flex flex-col justify-between bg-white border-r border-solid border-color`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <nav>
          <Link
            href="/"
            className="flex flex-row items-center gap-3 text-XS text-bold text-faded text-uppercase"
          >
            <Image src={logo} alt="Logo for Quentin Le Pape's website" />
            Quentin Le Pape
          </Link>
        </nav>
        <LocationsSection
          isGlobeExpanded={isGlobeExpanded}
          setGlobeExpanded={setGlobeExpanded}
          listLocation={listLocation}
          globeLocation={globeLocation}
          setListLocation={setListLocation}
          setGlobeLocation={setGlobeLocation}
        />
        <button
          onClick={() => handleCloseGlobe()}
          className={`${styles.closeButton} hidden`}
        >
          <Icon name="Cross" size="20" flavor="thin"></Icon>
        </button>
      </div>
    </div>
  );
}
