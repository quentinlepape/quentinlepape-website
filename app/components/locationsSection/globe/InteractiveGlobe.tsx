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
  // const [focusedLocation, setFocusedLocation] =
  //   useState<ICurriculumVitaeLocationsWorked>();

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
  }, []);

  useEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleResize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  //   const markerSvg = `<svg
  //   xmlns:dc="http://purl.org/dc/elements/1.1/"
  //   xmlns:cc="http://creativecommons.org/ns#"
  //   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  //   xmlns:svg="http://www.w3.org/2000/svg"
  //   xmlns="http://www.w3.org/2000/svg"
  //   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  //   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  //   width="5.6444445mm"
  //   height="9.847393mm"
  //   viewBox="0 0 20 34.892337"
  //   id="svg3455"
  //   version="1.1"
  //   inkscape:version="0.91 r13725"
  //   sodipodi:docname="Map Pin.svg">
  //  <defs
  //     id="defs3457" />
  //  <sodipodi:namedview
  //     id="base"
  //     pagecolor="#ffffff"
  //     bordercolor="#666666"
  //     borderopacity="1.0"
  //     inkscape:pageopacity="0.0"
  //     inkscape:pageshadow="2"
  //     inkscape:zoom="12.181359"
  //     inkscape:cx="8.4346812"
  //     inkscape:cy="14.715224"
  //     inkscape:document-units="px"
  //     inkscape:current-layer="layer1"
  //     showgrid="false"
  //     inkscape:window-width="1024"
  //     inkscape:window-height="705"
  //     inkscape:window-x="-4"
  //     inkscape:window-y="-4"
  //     inkscape:window-maximized="1"
  //     fit-margin-top="0"
  //     fit-margin-left="0"
  //     fit-margin-right="0"
  //     fit-margin-bottom="0" />
  //  <metadata
  //     id="metadata3460">
  //    <rdf:RDF>
  //      <cc:Work
  //         rdf:about="">
  //        <dc:format>image/svg+xml</dc:format>
  //        <dc:type
  //           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
  //        <dc:title></dc:title>
  //      </cc:Work>
  //    </rdf:RDF>
  //  </metadata>
  //  <g
  //     inkscape:label="Layer 1"
  //     inkscape:groupmode="layer"
  //     id="layer1"
  //     transform="translate(-814.59595,-274.38623)">
  //    <g
  //       id="g3477"
  //       transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
  //      <path
  //         sodipodi:nodetypes="sscccccsscs"
  //         inkscape:connector-curvature="0"
  //         id="path4337-3"
  //         d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z"
  //         style="display:inline;opacity:1;fill:#ff4646;fill-opacity:1;stroke:#d73534;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  //      <circle
  //         r="3.0355"
  //         cy="288.25278"
  //         cx="823.03064"
  //         id="path3049"
  //         style="display:inline;opacity:1;fill:#590000;fill-opacity:1;stroke-width:0" />
  //    </g>
  //  </g>
  // </svg>`;

  // TODO Function to transition camera
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

  function object3D() {
    const objGeometry = new THREE.SphereGeometry(2);
    const objMaterial = new THREE.MeshPhongMaterial({
      color: "#e20720",
      specular: "grey",
      shininess: 300,
    });
    return new THREE.Mesh(objGeometry, objMaterial);
  }

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
      pointsData={locations}
      pointLat={getLat}
      pointLng={getLon}
      pointAltitude={0.1}
      pointRadius={0.2}
      pointColor={() => "#837a72"}
      onGlobeClick={() => {
        console.log("click");
        console.log(globeRef.current!.pointOfView());
      }}
      // htmlElementsData={locations}
      // htmlLat={getLat}
      // htmlLng={getLon}
      // // htmlElement={<div>Hellooo</div>}
      // htmlElement={() => {
      //   const el = document.createElement("div");
      //   // el.innerHTML = markerSvg;
      //   el.innerHTML = "🖥️";
      //   el.style.color = "black";
      //   el.style.width = "20px";
      //   el.style.fontSize = "30px";

      //   // el.style['pointer-events'] = 'auto';
      //   el.style.cursor = "pointer";
      //   // el.onclick = () => console.info(d);
      //   return el;
      // }}

      objectsData={locations}
      objectLat={getLat}
      objectLng={getLon}
      // objectAltitude={0.1}
      objectAltitude={-0.01}
      objectThreeObject={object3D}

      // ! atmosphereAltitude={0.15}
    />
  );
}
