import Link from "next/link";
import styles from "./page.module.css";
import { CurriculumVitae } from "./data/curriculumVitae";
import ClientsList from "./components/ClientsList";
import TitledSection from "./components/TitledSection";
import Table from "./components/table/Table";
import SocialLinks from "./components/socialLinks/SocialLinks";
import Image from "next/image";
import logo from "./images/logo.svg";
import VideoPreviewList from "./components/videoPreviewList/VideoPreviewList";
import Icon from "./components/Icon";

export default function MainWrapper() {
  return (
    <main>
      <nav
        className={`${styles.responsiveHeader} hidden backdrop-blur w-full h-15 flex items-center border-b border-solid border-color`}
      >
        <Link
          href="/"
          className="flex flex-row items-center gap-3 text-XS text-bold text-faded text-uppercase"
        >
          <Image src={logo} alt="Logo for Quentin Le Pape's website" />
          Quentin Le Pape
        </Link>
      </nav>
      <div className={styles.mainWrapper}>
        <div
          className={`${styles.mainContent} block-w-main pt-35 flex flex-col gap-15`}
        >
          <div className="block-w-narrow mb-5 flex flex-col gap-10">
            <p className={`${styles.intro}`}>
              <span className="text-bold">
                Hello there,
                <br />
              </span>{" "}
              I’m <span className="text-dark">Quentin Le Pape.</span>
            </p>
            <h1 className="mb-3.5">
              <ol className="text-medium text-XL text-line-height-XL">
                <li>
                  <span className="list-marker">
                    <span className="list-marker-number">1</span>.
                  </span>
                  Full-Stack <span className="text-underline">Developer</span>
                  <span className="opacity-25">,</span>
                </li>
                <li>
                  <span className="list-marker">
                    <span className="list-marker-number">2</span>.
                  </span>
                  Product Design <span className="text-underline">Leader</span>
                  <span className="opacity-25">,</span>
                </li>
                <li>
                  <span className="list-marker">
                    <span className="list-marker-number">3</span>.
                  </span>
                  Serial <span className="text-underline">Founder</span>
                  <span className="opacity-25">.</span>
                </li>
              </ol>
            </h1>
            <section>
              <h2 className="mb-3.5 after after-arrow-bottom">
                I&apos;ve built products for
              </h2>
              <ClientsList />
            </section>
          </div>
          <section className="block-w-narrow flex flex-col gap-8 mb-5">
            <p>
              <span className="text-dark text-medium">
                Previously at{" "}
                <Link
                  href="https://www.palantir.com/"
                  target="_blank"
                  className="link-dotted"
                >
                  Palantir Technologies
                </Link>
              </span>{" "}
              as a product design lead – where I&apos;ve participated in laying
              down the foundations of several of our flagship products,
              including{" "}
              <Link
                href="https://www.palantir.com/platforms/foundry/"
                target="_blank"
                className="link-dotted"
              >
                Foundry Ontology
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.palantir.com/platforms/foundry/foundry-ai-os/"
                target="_blank"
                className="link-dotted"
              >
                Foundry Operational AI
              </Link>
              .
            </p>
            <p>
              Currently building the future of web design at{" "}
              <span className="text-dark text-medium link-dotted">
                webcraft
              </span>
              .
            </p>
          </section>
          <TitledSection
            title="Product + Design Leadership"
            sectionClassNames="overflow-visible"
          >
            <VideoPreviewList contentType="project" />
          </TitledSection>
          <TitledSection
            title="Impact spotlights"
            sectionClassNames="overflow-visible"
          >
            <VideoPreviewList contentType="impact" />
          </TitledSection>
          <TitledSection title="Experience" sectionClassNames="mt-7.5">
            <Table data={CurriculumVitae.experience}></Table>
          </TitledSection>
          <TitledSection title="Patents">
            <Table data={CurriculumVitae.patents}></Table>
          </TitledSection>
          <TitledSection title="Education">
            <Table data={CurriculumVitae.education}></Table>
          </TitledSection>
          <TitledSection
            title="Current availability"
            sectionClassNames="mt-7.5"
          >
            <div className="flex flex-col gap-1.5">
              <div className="text-medium">Open for contracting</div>
              <address className="text-S text-faded">
                Let’s connect at{" "}
                <Link
                  href="mailto:quentinlepape@gmail.com"
                  className="text-link text-underline"
                >
                  quentinlepape@gmail.com
                </Link>
              </address>
            </div>
          </TitledSection>
          <footer className="mt-12.5">
            <address>
              <SocialLinks />
              <Link
                href="mailto:quentinlepape@gmail.com"
                className={`
                ${styles.getInTouchButton} after after-arrow-right text-XS text-medium h7.5 border rounded px-2.5 py-0.5 backdrop-blur bg-light/80`}
              >
                <span>Get in touch</span>
                <Icon name="Mail" flavor="thin" size="20" />
              </Link>
            </address>
          </footer>
        </div>
      </div>
    </main>
  );
}
