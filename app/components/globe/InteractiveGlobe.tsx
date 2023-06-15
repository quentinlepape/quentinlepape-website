"use client";

import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import {
  CurriculumVitae,
  ICurriculumVitaeLocationsWorked,
} from "../../data/curriculumVitae";

const GlobeTmpl = dynamic(() => import("./globeWrapper"), {
  ssr: false,
});
const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
));
Globe.displayName = "Globe";

const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load(
  "//unpkg.com/three-globe/example/img/earth-water.png",
  (texture: any) => {
    // ! globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color("grey");
    globeMaterial.shininess = 5;
  }
);

export default function InteractiveGlobe() {
  const globeRef = useRef<GlobeMethods>();
  const [isGlobeReady, setGlobeReady] = useState<boolean>();
  const locations = CurriculumVitae.locationsWorked;

  const getLat = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lat;
  const getLon = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lon;
  // ! const getAlt = (data: any) => data.elevation * 5e-5;

  useEffect(() => {
    if (isGlobeReady) {
      // wait for scene to be populated (asynchronously)
      const directionalLight = globeRef
        .current!.scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
      // ! globeRef.current!.scene().position.y = -100;
    }
  }, [isGlobeReady]);

  return (
    <Globe
      ref={globeRef}
      width={260}
      height={260 * 2}
      showGraticules
      // width={
      //   typeof window !== "undefined" && window.innerWidth > 575 ? 460 : 288
      // }
      // height={
      //   typeof window !== "undefined" && window.innerWidth > 575 ? 700 : 440
      // }
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onGlobeReady={() => {
        setGlobeReady(true);
      }}
      pointsData={locations}
      pointLat={getLat}
      pointLng={getLon}

      // ! atmosphereAltitude={0.15}
    />
  );
}
