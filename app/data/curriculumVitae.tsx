import { StaticImageData } from "next/image";
import PalantirLogo from "../images/palantir-logo";
import ontologyPoster from "../../public/videos/previews/ontology/poster.png";
import aimlPoster from "../../public/videos/previews/aiml/poster.png";
import wfpPoster from "../../public/videos/previews/wfp/poster.png";
import healthlifesciencesPoster from "../../public/videos/previews/healthlifesciences/poster.png";
import usarmyPoster from "../../public/videos/previews/usarmy/poster.png";
import scuderiaferrariPoster from "../../public/videos/previews/scuderiaferrari/poster.png";
import cleanenergyPoster from "../../public/videos/previews/cleanenergy/poster.png";
import { IconName } from "../components/Icon";

const CurriculumVitaeTypes = {
  experience: "experience",
  education: "education",
  client: "client",
  spotlight: "spotlight",
  patent: "patent",
  locationWorked: "locationWorked",
} as const;

export type CurriculumVitaeType = keyof typeof CurriculumVitaeTypes;

export interface ICurriculumVitaeExperience {
  type: typeof CurriculumVitaeTypes.experience;
  companyName: string;
  image:
    | {
        svgSource: React.ReactNode;
        imageSource?: never;
        imageAlt?: never;
        icon?: never;
      }
    | {
        svgSource?: never;
        imageSource: StaticImageData;
        imageAlt: string;
        icon?: never;
      }
    | {
        svgSource?: never;
        imageSource?: never;
        imageAlt?: never;
        icon: IconName;
      };
  detail?: string;
  link?: URL;
  jobTitles: string[];
  date: { startDate: string; endDate: string } | string;
}
export interface ICurriculumVitaeEducation {
  type: typeof CurriculumVitaeTypes.education;
  diploma: string;
  institution: string;
  date: string;
}
export interface ICurriculumVitaeClients {
  type: typeof CurriculumVitaeTypes.client;
  name: string;
  showcase: boolean;
  content?: {
    link?: URL;
    embed?: JSX.Element;
  };
}
export type spotlightContentType = "project" | "impact";
export interface ICurriculumVitaeSpotlight {
  type: typeof CurriculumVitaeTypes.spotlight;
  contentType: spotlightContentType;
  title: string;
  subtitle: string;
  showcase: boolean;
  content: {
    link: URL;
    video: {
      location: string;
      poster: StaticImageData;
      startTime: number;
    };
    embed?: JSX.Element;
  };
}
export interface ICurriculumVitaePatents {
  type: typeof CurriculumVitaeTypes.patent;
  id: string;
  label: string;
  link: URL;
  date: string;
}
export interface ICurriculumVitaeLocationsWorked {
  type: typeof CurriculumVitaeTypes.locationWorked;
  locationName: string;
  detail?: string;
  geo: {
    lat: number;
    lon: number;
  };
  preferredPointOfView: {
    lat: number;
    lon: number;
  };
  current: boolean;
}

export const CurriculumVitae: {
  experience: ICurriculumVitaeExperience[];
  education: ICurriculumVitaeEducation[];
  clients: ICurriculumVitaeClients[];
  spotlights: ICurriculumVitaeSpotlight[];
  patents: ICurriculumVitaePatents[];
  locationsWorked: ICurriculumVitaeLocationsWorked[];
} = {
  /**
   * EXPERIENCE
   */
  experience: [
    {
      type: "experience",
      companyName: "Comand AI",
      image: { icon: "Rocket" },
      detail: "founder",
      link: new URL("https://www.comand.ai/"),
      jobTitles: ["Product Design Founder"],
      date: { startDate: "2023", endDate: "Now" },
    },
    {
      type: "experience",
      companyName: "Palantir Technologies",
      image: {
        svgSource: <PalantirLogo />,
      },
      detail: "",
      link: new URL("https://www.palantir.com/"),
      jobTitles: ["Product Design Lead"],
      date: { startDate: "2017", endDate: "2023" },
    },
    {
      type: "experience",
      companyName: "Bitcallz",
      image: { icon: "Rocket" },
      detail: "founder",
      jobTitles: ["Full-Stack Developer", "Product Designer"],
      date: { startDate: "2017", endDate: "2018" },
    },
    {
      type: "experience",
      companyName: "Thedirectory.io",
      image: { icon: "Rocket" },
      detail: "founder",
      jobTitles: ["Full-Stack Developer", "Product Designer"],
      date: { startDate: "2015", endDate: "2016" },
    },
    {
      type: "experience",
      companyName: "Contracting",
      image: { icon: "GlobeNetwork" },
      jobTitles: ["Product Designer", "Developer"],
      date: "Since 2012",
    },
  ],

  /**
   * EDUCATION
   */
  education: [
    {
      type: "education",
      diploma: "Master of Design (MDes)",
      institution: "L’École de Design Nantes-Atlantique",
      date: "2017",
    },
    {
      type: "education",
      diploma: "Master of Research in VR Engineering (MS)",
      institution: "École Nationale Supérieure d'Arts et Métiers",
      date: "2017",
    },
    {
      type: "education",
      diploma: "Bachelor of Design (BA)",
      institution: "L’École de Design Nantes-Atlantique",
      date: "2015",
    },
  ],

  /**
   * CLIENTS
   */
  clients: [
    {
      type: "client",
      name: "FBI",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/offerings/intelligence/"),
      },
    },
    {
      type: "client",
      name: "American Special Forces",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/offerings/defense/"),
      },
    },
    {
      type: "client",
      name: "World Food Program",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/Iisb3OclVEQ?autoplay=1&modestbranding=1&rel=0"
            title="Our work with the World Food Program"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/impact/world-food-programme/"),
      },
    },
    {
      type: "client",
      name: "US Air Force",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/touvdfsYLrk?autoplay=1&modestbranding=1&rel=0"
            title="Our work with the US Air Force"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/defense/air-space/"),
      },
    },
    {
      type: "client",
      name: "US Space Force",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/3iylsWhHivE?autoplay=1&modestbranding=1&rel=0&start=4"
            title="Our work with the US Space Force"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/defense/air-space/"),
      },
    },
    {
      type: "client",
      name: "US Navy",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/Hcr27WC0G9M?autoplay=1&modestbranding=1&rel=0"
            title="Our work with the US Navy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/defense/navy/"),
      },
    },
    {
      type: "client",
      name: "US Army",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/offerings/defense/army/"),
      },
    },
    {
      type: "client",
      name: "Counter Child Exploitation",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/h29rt8QV1Ko?autoplay=1&modestbranding=1&rel=0"
            title="Our work with NCMEC"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL(
          "https://blog.palantir.com/fighting-child-exploitation-with-big-data-86868bad559e"
        ),
      },
    },
    {
      type: "client",
      name: "NIH",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/offerings/federal-health"),
      },
    },
    {
      type: "client",
      name: "CDC",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/impact/federal-health/"),
      },
    },
    {
      type: "client",
      name: "HHS",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/impact/federal-health/"),
      },
    },
    {
      type: "client",
      name: "NHS",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/lKOU7LPsaC4?start=214&autoplay=1&modestbranding=1&rel=0"
            title="Our work with the NHS"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/uk/healthcare/"),
      },
    },
    {
      type: "client",
      name: "Sanofi",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/impact/rwe-pharma-sanofi/"),
      },
    },
    {
      type: "client",
      name: "Merck",
      showcase: true,
      content: {
        link: new URL(
          "https://www.palantir.com/offerings/health/#biomanufacturing"
        ),
      },
    },
    {
      type: "client",
      name: "Swiss Re",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/ITwz--MM7Bo?autoplay=1&modestbranding=1&rel=0"
            title="Our work with Swiss Re"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/impact/swiss-re/"),
      },
    },
    {
      type: "client",
      name: "Clean Energy",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/7u0Ec2eGZV0?autoplay=1&modestbranding=1&rel=0"
            title="Our work for Clean Energy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/energy/"),
      },
    },
    {
      type: "client",
      name: "PG&E",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/pgjUU98zR0c?autoplay=1&modestbranding=1&rel=0"
            title="Our work with PG&E"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL(
          "https://www.palantir.com/impact/pacific-gas-and-electric/"
        ),
      },
    },
    {
      type: "client",
      name: "Airbus",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/-sJhFpaylhU?autoplay=1&modestbranding=1&rel=0"
            title="Our work with Airbus"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL(
          "https://aircraft.airbus.com/en/services/enhance/skywise"
        ),
      },
    },
    {
      type: "client",
      name: "University of Nantes",
      showcase: false,
    },
    {
      type: "client",
      name: "and other organizations",
      showcase: false,
    },
  ],

  /**
   * SPOTLIGHTS
   */
  spotlights: [
    {
      type: "spotlight",
      contentType: "project",
      title: "Foundry Ontology",
      subtitle: "Palantir Technologies",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/platforms/foundry/"),
        video: {
          location: "/videos/previews/ontology/videopreview.mp4",
          startTime: 0,
          poster: ontologyPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "project",
      title: "Foundry AI/ML",
      subtitle: "Palantir Technologies",
      showcase: true,
      content: {
        link: new URL("https://www.palantir.com/platforms/aip/"),
        video: {
          location: "/videos/previews/aiml/videopreview.mp4",
          startTime: 0,
          poster: aimlPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "impact",
      title: "World Food Program",
      subtitle: "Delivering life-saving assistance using data",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/Iisb3OclVEQ?autoplay=1&modestbranding=1&rel=0"
            title="Our work with the World Food Program"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/impact/world-food-programme/"),
        video: {
          location: "/videos/previews/wfp/videopreview.mp4",
          startTime: 0,
          poster: wfpPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "impact",
      title: "Health & Life Sciences",
      subtitle: "Powering data-driven research and treatment",
      showcase: true,
      content: {
        embed: (
          <video width="1280" height="720" autoPlay controls>
            <source src="/videos/healthlifesciences.mp4" type="video/mp4" />
          </video>
        ),
        link: new URL("https://www.palantir.com/offerings/health/"),
        video: {
          location:
            "/videos/previews/healthlifesciences/videopreview.mp4#t=1.1",
          startTime: 1.1,
          poster: healthlifesciencesPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "impact",
      title: "U.S. Army",
      subtitle: "AI-enabled technology to deter and defend",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/touvdfsYLrk?autoplay=1&modestbranding=1&rel=0"
            title="Our work with the U.S. Army"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/defense/army/"),
        video: {
          location: "/videos/previews/usarmy/videopreview.mp4",
          startTime: 0,
          poster: usarmyPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "impact",
      title: "Scuderia Ferrari",
      subtitle: "Partners in ultimate performance",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/W7DExH8iPnE?autoplay=1&modestbranding=1&rel=0"
            title="Our work with Scuderia Ferrari"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/auto-racing/"),
        video: {
          location: "/videos/previews/scuderiaferrari/videopreview.mp4",
          startTime: 0,
          poster: scuderiaferrariPoster,
        },
      },
    },
    {
      type: "spotlight",
      contentType: "impact",
      title: "Clean Energy",
      subtitle: "Helping suppliers deliver cleaner energy",
      showcase: true,
      content: {
        embed: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/7u0Ec2eGZV0?autoplay=1&modestbranding=1&rel=0"
            title="Our work with Clean Energy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ),
        link: new URL("https://www.palantir.com/offerings/energy/#carbon"),
        video: {
          location: "/videos/previews/cleanenergy/videopreview.mp4",
          startTime: 0,
          poster: cleanenergyPoster,
        },
      },
    },
  ],

  /**
   * PATENTS
   */
  patents: [
    {
      type: "patent",
      id: "11585672",
      label: "Three-dimensional representations of routes",
      link: new URL("https://patents.justia.com/patent/11585672"),
      date: "2023",
    },
    {
      type: "patent",
      id: "11500620",
      label:
        "Workflow application and user interface builder integrating objects, relationships, and actions",
      link: new URL("https://patents.justia.com/patent/11500620"),
      date: "2022",
    },
  ],

  /**
   * LOCATIONS WORKED
   */
  locationsWorked: [
    {
      type: "locationWorked",
      locationName: "San Francisco",
      geo: {
        lat: 37.77,
        lon: -122.43,
      },
      preferredPointOfView: {
        lat: 15.03,
        lon: -110.98,
      },
      current: false,
    },
    {
      type: "locationWorked",
      locationName: "New York",
      geo: {
        lat: 40.73,
        lon: -73.93,
      },
      preferredPointOfView: {
        lat: 14.45,
        lon: -87.48,
      },
      current: false,
    },
    {
      type: "locationWorked",
      locationName: "Los Angeles",
      geo: {
        lat: 34.05,
        lon: -118.24,
      },
      preferredPointOfView: {
        lat: 10.87,
        lon: -104.93,
      },
      current: false,
    },
    {
      type: "locationWorked",
      locationName: "London",
      detail: "UK",
      geo: {
        lat: 51.51,
        lon: -0.12,
      },
      preferredPointOfView: {
        lat: 22,
        lon: 2.48,
      },
      current: false,
    },
    {
      type: "locationWorked",
      locationName: "Paris",
      detail: "France",
      geo: {
        lat: 48.86,
        lon: 2.35,
      },
      preferredPointOfView: {
        lat: 17,
        lon: 9,
      },
      current: true,
    },
    {
      type: "locationWorked",
      locationName: "Munich",
      detail: "Germany",
      geo: {
        lat: 48.14,
        lon: 11.58,
      },
      preferredPointOfView: {
        lat: 19.15,
        lon: 13,
      },
      current: false,
    },
  ],
};
