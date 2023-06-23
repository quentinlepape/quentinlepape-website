import dynamic from "next/dynamic";
import { forwardRef, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import {
  CurriculumVitae,
  ICurriculumVitaeLocationsWorked,
} from "@/app/data/curriculumVitae";

const GlobeTmpl = dynamic(() => import("./globeWrapper"), {
  ssr: false,
});
const Globe = forwardRef((props: any, ref) => (
  <GlobeTmpl {...props} forwardRef={ref} />
));
Globe.displayName = "Globe";

export default function InteractiveGlobe({
  listLocation,
  globeLocation,
  setGlobeLocation,
  isGlobeExpanded,
  onSetGlobeExpanded,
}: {
  listLocation?: ICurriculumVitaeLocationsWorked;
  globeLocation?: ICurriculumVitaeLocationsWorked;
  setGlobeLocation: (
    focusedLocation: ICurriculumVitaeLocationsWorked | undefined
  ) => void;
  isGlobeExpanded: boolean;
  onSetGlobeExpanded: (isGlobeExpanded: boolean) => void;
}) {
  const locations = CurriculumVitae.locationsWorked;
  const globeRef = useRef<GlobeMethods>();
  const [isGlobeReady, setGlobeReady] = useState<boolean>();
  type device = "desktop" | "tablet" | "mobile";
  const [device, setDevice] = useState<device>("desktop");
  const [windowSize, setWindowSize] = useState({
    width: 1365,
    height: 0,
  });
  const [globeMaterial, setGlobeMaterial] = useState(
    new THREE.MeshPhongMaterial()
  );

  function handleResize() {
    setDevice(
      window.innerWidth > 1023
        ? "desktop"
        : window.innerWidth > 767
        ? "tablet"
        : "mobile"
    );
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  function handleObjectHover(location: ICurriculumVitaeLocationsWorked) {
    if (typeof window !== "undefined" && device == "desktop") {
      setGlobeLocation(location);
    }
  }

  function handleObjectClick(location: ICurriculumVitaeLocationsWorked) {
    if (typeof window !== "undefined" && device !== "desktop") {
      handleSetGlobeExpansion();
    }
    setGlobeLocation(location);
    focusCamera(location);
  }

  function handleSetGlobeExpansion() {
    if (!isGlobeExpanded && device !== "desktop") {
      onSetGlobeExpanded(true);
      if (!globeLocation) {
        setGlobeLocation(locations[0]);
        focusCamera(locations[0]);
      }
    }
  }

  function focusCamera(location: ICurriculumVitaeLocationsWorked) {
    globeRef.current!.pointOfView(
      {
        lat: location.preferredPointOfView.lat,
        lng: location.preferredPointOfView.lon,
      },
      700
    );
  }

  function object3D(location: ICurriculumVitaeLocationsWorked) {
    function basicMaterial(color: string, opacity?: number) {
      return new THREE.MeshBasicMaterial({
        color: color,
        transparent: opacity !== undefined && opacity !== 1 ? true : false,
        opacity: opacity ? opacity : 0,
      });
    }
    function phongMaterial(color: string, opacity?: number) {
      return new THREE.MeshPhongMaterial({
        color: color,
        transparent: opacity !== undefined && opacity !== 1 ? true : false,
        opacity: opacity ? opacity : 0,
      });
    }
    function wireframe(geometry: THREE.BufferGeometry, opacity?: number) {
      const wireframeGeometry = new THREE.WireframeGeometry(geometry);
      const wireframe = new THREE.LineSegments(
        wireframeGeometry,
        basicMaterial(color.white, opacity)
      );
      return wireframe;
    }
    function ringLine(size: number) {
      const points = [];
      for (let i = 0; i <= 360; i++) {
        points.push(
          new THREE.Vector3(
            Math.sin(i * (Math.PI / 180)) * size,
            Math.cos(i * (Math.PI / 180)) * size,
            0
          )
        );
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    }

    const color = { white: "#ffffff", green: "#72d368" };
    const sizeMultiplier =
      typeof window !== "undefined" && device == "desktop" ? 1 : 2;

    // const locationPin = new THREE.Mesh(
    //   new THREE.SphereGeometry(1.3 * sizeMultiplier),
    //   basicMaterial(color.white)
    // );
    const locationPin = new THREE.Mesh(
      new THREE.CircleGeometry(0.9 * sizeMultiplier),
      basicMaterial(color.white)
    );
    locationPin.translateZ(1.1 * sizeMultiplier);

    const hoverAreaA = new THREE.Mesh(
      new THREE.CircleGeometry(7 * sizeMultiplier),
      basicMaterial(color.white, 0.3)
    );
    hoverAreaA.translateZ(0.5 * sizeMultiplier);
    const hoverAreaB = new THREE.Mesh(
      new THREE.CircleGeometry(7 * sizeMultiplier),
      basicMaterial(color.white, 0)
    );

    const hoverRingA = new THREE.Line(
      ringLine(7 * sizeMultiplier),
      new THREE.LineDashedMaterial({
        color: color.white,
        scale: 1,
        dashSize: 1 * sizeMultiplier,
        gapSize: 1 * sizeMultiplier,
        opacity: 0.7,
        transparent: globeLocation && location !== globeLocation ? true : false,
      })
    );
    hoverRingA.computeLineDistances();

    const hoverRingB = new THREE.Mesh(
      new THREE.TorusGeometry(7 * sizeMultiplier, 0.2),
      location == globeLocation
        ? basicMaterial(color.white, 1)
        : basicMaterial(color.white, 0)
    );

    // const hoverConeA = wireframe(
    //   new THREE.ConeGeometry(2.5, 5, 4, 1, true),
    //   location == globeLocation ? 1 : 0
    // );
    // const hoverConeB = new THREE.Mesh(
    //   new THREE.ConeGeometry(2.5, 5, 4, 1),
    //   basicMaterial(color.white, location == globeLocation ? 0.5 : 0)
    // );
    // const hoverConeGroup = new THREE.Group();
    // hoverConeGroup.add(hoverConeA);
    // hoverConeGroup.add(hoverConeB);
    // hoverConeGroup.rotateX(-1.5708);
    // hoverConeGroup.translateY(-8);

    const hoverAreaDepictionGroup = new THREE.Group();
    location == globeLocation && hoverAreaDepictionGroup.add(hoverAreaA);
    globeLocation == undefined
      ? hoverAreaDepictionGroup.add(hoverAreaB)
      : device !== "desktop" && hoverAreaDepictionGroup.add(hoverAreaB);
    hoverAreaDepictionGroup.add(hoverRingA);
    hoverAreaDepictionGroup.add(hoverRingB);
    // hoverAreaDepictionGroup.add(hoverConeGroup);
    hoverAreaDepictionGroup.translateZ(1 * sizeMultiplier);

    const mainGroup = new THREE.Group();

    mainGroup.add(locationPin);
    mainGroup.add(hoverAreaDepictionGroup);

    return mainGroup;
  }

  const getLat = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lat;
  const getLon = (location: ICurriculumVitaeLocationsWorked) =>
    location.geo.lon;

  useEffect(() => {
    if (isGlobeReady && globeRef.current) {
      const directionalLight = globeRef.current
        .scene()
        .children.find((obj3d) => obj3d.type === "DirectionalLight");
      directionalLight && directionalLight.position.set(1, 1, 1);
      globeRef.current.pointOfView({ lat: 17, lng: 9, altitude: 2 });
      globeRef.current.controls().enableZoom = false;
    }
  }, [isGlobeReady]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    const newGlobeMaterial = new THREE.MeshPhongMaterial();
    if (typeof document !== "undefined") {
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

  // TODO Transition camera automatically?
  useEffect(() => {
    if (listLocation && globeRef.current && isGlobeReady) {
      focusCamera(listLocation);
    }
  }, [listLocation]);

  useEffect(() => {
    setGlobeLocation(listLocation);
  }, [listLocation]);

  return (
    <Globe
      ref={globeRef}
      showGraticules
      width={
        typeof window !== "undefined" && device == "desktop"
          ? 600
          : windowSize.width
      }
      height={
        typeof window !== "undefined" && device == "desktop"
          ? 600
          : windowSize.width
      }
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial && globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onGlobeReady={() => {
        setGlobeReady(true);
      }}
      onGlobeClick={() => {
        handleSetGlobeExpansion();
      }}
      objectsData={locations}
      objectLat={getLat}
      objectLng={getLon}
      objectAltitude={-0.01}
      objectThreeObject={(location: ICurriculumVitaeLocationsWorked) =>
        object3D(location)
      }
      onObjectHover={handleObjectHover}
      onObjectClick={handleObjectClick}
    />
  );
}
