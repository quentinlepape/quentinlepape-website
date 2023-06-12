"use client";

import { useMemo, useRef, useState } from "react";
import Lightbox from "../lightbox/Lightbox";
import {
  CurriculumVitae,
  spotlightContentType,
} from "../../data/curriculumVitae";
import React from "react";
import styles from "./videoPreviewList.module.css";
import { useIntersection } from "../../utils/useIntersection";
import VideoPreview from "./VideoPreview";

function renderSubtitle(contentType: spotlightContentType) {
  switch (contentType) {
    case "project":
      return "Product + Design Leadership";
      break;
    case "impact":
      return "Impact spotlights";
      break;
  }
}

export default function VideoPreviewList({
  contentType,
}: {
  contentType: spotlightContentType;
}): React.JSX.Element {
  const [lightboxContent, setlightboxContent] = useState<{
    embed: JSX.Element;
    title: string;
    link?: URL;
  }>();

  const spotlights = CurriculumVitae.spotlights.filter(
    (spotlight) => spotlight.showcase && spotlight.contentType == contentType
  );

  const spotlightVideoPreviews = useMemo(() => {
    const refs: { [key: string]: any } = {};
    spotlights.forEach((spotlight, i) => {
      refs[i] = React.createRef();
    });
    return refs;
  }, [spotlights]);

  return (
    <ul className={`${styles.list} flex flex-row`}>
      {/* {spotlights.map((el, i) => renderPreviewItem(el, i))} */}
      {spotlights.map((spotlight, i) => (
        <VideoPreview
          spotlight={spotlight}
          i={i}
          onClick={setlightboxContent}
          key={i}
        ></VideoPreview>
      ))}
      <Lightbox
        title={lightboxContent?.title}
        subtitle={renderSubtitle(contentType)}
        link={lightboxContent?.link}
        onClose={() => setlightboxContent(undefined)}
      >
        {lightboxContent?.embed}
      </Lightbox>
    </ul>
  );
}
