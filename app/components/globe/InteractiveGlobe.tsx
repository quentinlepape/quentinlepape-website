"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import * as THREE from "three";
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const globeMaterial = new THREE.MeshPhongMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load(
  "//unpkg.com/three-globe/example/img/earth-water.png",
  (texture: any) => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color("grey");
    globeMaterial.shininess = 15;
  }
);

export default function InteractiveGlobe() {
  const globeRef = useRef(null);

  useEffect(() => {
    console.log(globeRef.current);
    // setTimeout(() => {
    //   // wait for scene to be populated (asynchronously)
    //   const directionalLight = globeRef.current
    //     .scene()
    //     .children.find((obj3d) => obj3d.type === "DirectionalLight");
    //   directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
    // });
  }, [globeRef.current]);

  return (
    <Globe
      ref={globeRef}
      width={260}
      height={260}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      // atmosphereAltitude={0.15}
    />
  );
}
