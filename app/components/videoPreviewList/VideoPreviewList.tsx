"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "../lightbox/Lightbox";
import {
  CurriculumVitae,
  ICurriculumVitaeSpotlight,
  spotlightContentType,
} from "../../data/curriculumVitae";
import React from "react";
import styles from "./videoPreviewList.module.css";
import Link from "next/link";

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

function scrollIntoView(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  const scrollAgent = e.currentTarget;
  const scrollContainer = scrollAgent.parentElement!;

  const agentStyle = window.getComputedStyle(scrollAgent);
  const containerStyle = window.getComputedStyle(
    e.currentTarget.parentElement!
  );

  // Target distance from the edge of the container
  const targetDistFromEdge =
    parseFloat(containerStyle.paddingLeft) + parseFloat(agentStyle.marginLeft);

  const containerDistFromEdge = {
    left: scrollContainer.getBoundingClientRect().left,
    right:
      document.documentElement.clientWidth -
      scrollContainer.getBoundingClientRect().right,
  };
  const agentPositionWithinContainer = {
    left: scrollAgent.getBoundingClientRect().left - containerDistFromEdge.left,
    right:
      document.documentElement.clientWidth -
      scrollAgent.getBoundingClientRect().right -
      containerDistFromEdge.right,
  };
  if (
    agentPositionWithinContainer.left < targetDistFromEdge ||
    agentPositionWithinContainer.right < targetDistFromEdge
  ) {
    let targetTranslation = 0;
    if (
      agentPositionWithinContainer.left < agentPositionWithinContainer.right
    ) {
      targetTranslation =
        agentPositionWithinContainer.left - targetDistFromEdge;
    } else {
      targetTranslation =
        -agentPositionWithinContainer.right + targetDistFromEdge;
    }
    scrollContainer.scrollBy({
      top: 0,
      left: targetTranslation,
      behavior: "smooth",
    });
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

  function startVideo(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const video = e.currentTarget.firstElementChild!.firstElementChild!
      .firstElementChild!.firstElementChild! as HTMLVideoElement;
    video.play();
  }
  function stopVideo(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    videoID: number
  ) {
    const video = e.currentTarget.firstElementChild!.firstElementChild!
      .firstElementChild!.firstElementChild! as HTMLVideoElement;
    video.pause();
    const timeout = setTimeout(() => {
      video.currentTime = spotlights[videoID].content.video.startTime;
    }, 150);
    return () => clearTimeout(timeout);
  }

  function handlePreviewClick(clickedSpotlight: ICurriculumVitaeSpotlight) {
    if (clickedSpotlight.content.embed) {
      setlightboxContent({
        embed: clickedSpotlight.content.embed!,
        title: clickedSpotlight.title + " | " + clickedSpotlight.subtitle,
        link: clickedSpotlight.content.link,
      });
    }
  }

  function renderPreviewItem(el: ICurriculumVitaeSpotlight, i: number) {
    const titleComponent = (
      <div
        className={`${styles.titleWrapper} relative flex flex-col px-5 pt-3 pb-3.5`}
      >
        <h3 className="text-medium text-M">{el.title}</h3>
        <h4 className="text-regular text-S text-faded">{el.subtitle}</h4>
      </div>
    );

    const videoComponent = (
      <div>
        <div
          className={`${styles.videoWrapper} bg-backdrop aspect-video rounded-md relative`}
        >
          <video
            ref={spotlightVideoPreviews[i]}
            className="w-full absolute"
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            autoPlay={false}
            muted
            loop
            controls={false}
            poster={el.content.video.poster.src}
          >
            <source src={el.content.video.location} type="video/mp4" />
          </video>
          <Image
            fill
            src={el.content.video.poster}
            className={styles.poster}
            alt=""
            sizes="364px"
          ></Image>
        </div>
      </div>
    );

    if (el.content.embed) {
      return (
        <li
          className={`${styles.li} cursor-pointer shrink-0 rounded-lg relative`}
          key={i}
          onMouseEnter={(e) => {
            startVideo(e);
            scrollIntoView(e);
          }}
          onMouseLeave={(e) => {
            stopVideo(e, i);
          }}
          onClick={() => {
            handlePreviewClick(el);
          }}
        >
          <div
            className={`${styles.itemWrapper} flex flex-col rounded-md bg-white overflow-hidden`}
          >
            {videoComponent}
            {titleComponent}
          </div>
        </li>
      );
    } else {
      return (
        <li
          className={`${styles.li} cursor-pointer shrink-0 rounded-lg relative`}
          key={i}
          onMouseEnter={(e) => {
            startVideo(e);
            scrollIntoView(e);
          }}
          onMouseLeave={(e) => {
            stopVideo(e, i);
          }}
        >
          <Link
            href={el.content.link}
            target="_blank"
            className={`${styles.itemWrapper} flex flex-col rounded-md bg-white overflow-hidden`}
          >
            {videoComponent}
            {titleComponent}
          </Link>
        </li>
      );
    }
  }

  return (
    <ul className={`${styles.list} flex flex-row`}>
      {spotlights.map((el, i) => renderPreviewItem(el, i))}
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
