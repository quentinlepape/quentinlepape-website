"use client";

import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
// import * as THREE from "../../../node_modules/three/src/Three";
const THREE = require("three");
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

export default function InteractiveGlobe() {
  const locations = CurriculumVitae.locationsWorked;
  const globeRef = useRef<GlobeMethods>();
  const [isGlobeReady, setGlobeReady] = useState<boolean>();
  const [windowSize, setWindowSize] = useState({
    width: 1365,
    height: 0,
  });
  const [globeMaterial, setGlobeMaterial] = useState(
    new THREE.MeshPhongMaterial()
  );

  const getLat = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lat;
  const getLon = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lon;

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      // wait for scene to be populated (asynchronously)
      const directionalLight = globeRef.current
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
      // globeRef.current!.scene().position.y = -1;

      globeRef.current.pointOfView({ lat: 17, lng: 9, altitude: 2 });
      globeRef.current.controls().enableZoom = false;
    }
  }, [isGlobeReady]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const newGlobeMaterial = new THREE.MeshPhongMaterial();
    if (typeof document !== "undefined") {
      let element = document.querySelector(".class-name");

      newGlobeMaterial.bumpScale = 10;
      new THREE.TextureLoader().load(
        "//unpkg.com/three-globe/example/img/earth-water.png",
        (texture: any) => {
          // ! newGlobeMaterial.specularMap = texture;
          newGlobeMaterial.specular = new THREE.Color("grey");
          newGlobeMaterial.shininess = 5;
        }
      );
    }
    setGlobeMaterial(newGlobeMaterial);
  }, []);

  return (
    <Globe
      ref={globeRef}
      showGraticules
      width={
        typeof window !== "undefined" && windowSize.width > 1365 ? 320 : 260
      }
      height={600}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial && globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onGlobeReady={() => {
        setGlobeReady(true);
      }}
      pointsData={locations}
      pointLat={getLat}
      pointLng={getLon}
      onGlobeClick={() => {
        console.log("click");
      }}

      // ! atmosphereAltitude={0.15}
    />
  );
}
