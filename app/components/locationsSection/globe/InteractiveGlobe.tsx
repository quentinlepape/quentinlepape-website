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
  focusedLocation,
}: {
  focusedLocation?: ICurriculumVitaeLocationsWorked;
}) {
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
  const [activeLocation, setActiveLocation] =
    useState<ICurriculumVitaeLocationsWorked>();

  function handleResize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  function object3D(location: ICurriculumVitaeLocationsWorked) {
    function basicMaterial(color: string, opacity?: number) {
      return new THREE.MeshBasicMaterial({
        color: color,
        transparent: opacity !== undefined ? true : false,
        opacity: opacity ? opacity : 0,
      });
    }
    function phongMaterial(color: string, opacity?: number) {
      return new THREE.MeshPhongMaterial({
        color: color,
        transparent: opacity !== undefined ? true : false,
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

    const locationPin = new THREE.Mesh(
      new THREE.SphereGeometry(2),
      basicMaterial(color.white)
    );

    const hoverAreaA = new THREE.Mesh(
      new THREE.CircleGeometry(7),
      location == activeLocation
        ? basicMaterial(color.white, 0.3)
        : basicMaterial(color.white, 0.15)
    );

    const hoverRingA = new THREE.Line(
      ringLine(7),
      new THREE.LineDashedMaterial({
        color: color.white,
        // lineWidth: 1,
        scale: 1,
        dashSize: 1,
        gapSize: 1,
      })
    );
    hoverRingA.computeLineDistances();

    const hoverRingB = new THREE.Mesh(
      new THREE.TorusGeometry(7, 0.2),
      location == activeLocation
        ? basicMaterial(color.white, 1)
        : basicMaterial(color.white, 0)
    );

    // const hoverConeA = wireframe(
    //   new THREE.ConeGeometry(2.5, 5, 4, 1, true),
    //   location == activeLocation ? 1 : 0
    // );
    // const hoverConeB = new THREE.Mesh(
    //   new THREE.ConeGeometry(2.5, 5, 4, 1),
    //   basicMaterial(color.white, location == activeLocation ? 0.5 : 0)
    // );
    // const hoverConeGroup = new THREE.Group();
    // hoverConeGroup.add(hoverConeA);
    // hoverConeGroup.add(hoverConeB);
    // hoverConeGroup.rotateX(-1.5708);
    // hoverConeGroup.translateY(-8);

    const hoverAreaDepictionGroup = new THREE.Group();
    hoverAreaDepictionGroup.add(hoverAreaA);
    hoverAreaDepictionGroup.add(hoverRingA);
    hoverAreaDepictionGroup.add(hoverRingB);
    // hoverAreaDepictionGroup.add(hoverConeGroup);
    hoverAreaDepictionGroup.translateZ(1);

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
    if (focusedLocation && globeRef.current && isGlobeReady) {
      globeRef.current!.pointOfView(
        {
          lat: focusedLocation.preferredPointOfView.lat,
          lng: focusedLocation.preferredPointOfView.lon,
        },
        700
      );
    }
  }, [focusedLocation]);

  useEffect(() => {
    setActiveLocation(focusedLocation);
  }, [focusedLocation]);

  return (
    <Globe
      ref={globeRef}
      showGraticules
      width={
        // typeof window !== "undefined" && windowSize.width > 1365 ? 320 : 260
        600
      }
      height={600}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial && globeMaterial}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      onGlobeReady={() => {
        setGlobeReady(true);
      }}
      onGlobeClick={() => {
        // console.log("click");
      }}
      objectsData={locations}
      objectLat={getLat}
      objectLng={getLon}
      objectAltitude={-0.01}
      objectThreeObject={(location: ICurriculumVitaeLocationsWorked) =>
        object3D(location)
      }
      onObjectHover={setActiveLocation}
    />
  );
}
