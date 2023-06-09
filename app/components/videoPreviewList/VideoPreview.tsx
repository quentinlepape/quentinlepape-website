import { useRef, useState } from "react";
import { ICurriculumVitaeSpotlight } from "../../data/curriculumVitae";
import styles from "./videoPreviewList.module.css";
import Image from "next/image";
import Link from "next/link";
import { useIntersection } from "@/app/utils/useIntersection";

function RenderItemWrapper({
  spotlight,
  children,
}: {
  spotlight: ICurriculumVitaeSpotlight;
  children: JSX.Element[];
}) {
  if (spotlight.content.embed) {
    return (
      <div
        className={`${styles.itemWrapper} flex flex-col rounded-md bg-white overflow-hidden`}
      >
        {children}
      </div>
    );
  } else {
    return (
      <Link
        href={spotlight.content.link}
        target="_blank"
        className={`${styles.itemWrapper} flex flex-col rounded-md bg-white overflow-hidden`}
      >
        {children}
      </Link>
    );
  }
}

function startVideo(video: HTMLVideoElement) {
  video.play();
}
function stopVideo(video: HTMLVideoElement, startTime: number) {
  video.pause();
  const timeout = setTimeout(() => {
    video.currentTime = startTime;
  }, 150);
  return () => clearTimeout(timeout);
}

function handlePreviewClick(clickedSpotlight: ICurriculumVitaeSpotlight) {
  return {
    embed: clickedSpotlight.content.embed!,
    title: clickedSpotlight.title + " | " + clickedSpotlight.subtitle,
    link: clickedSpotlight.content.link,
  };
}

function scrollIntoView(scrollAgent: HTMLElement) {
  const scrollContainer = scrollAgent.parentElement!;

  const agentStyle = window.getComputedStyle(scrollAgent);
  const containerStyle = window.getComputedStyle(scrollAgent.parentElement!);

  //* Target distance from the edge of the container
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

export default function VideoPreview({
  spotlight,
  i,
  onClick,
}: {
  spotlight: ICurriculumVitaeSpotlight;
  i: number;
  onClick: ({
    embed,
    title,
    link,
  }: {
    embed: JSX.Element;
    title: string;
    link: URL;
  }) => void;
}) {
  const isCenteredInViewport = useRef(false);
  const liRef = useRef(null);
  const hasPlayed = useRef(false);
  const videoRef = useRef(null);

  const inTriggerZone = useIntersection(liRef, "-40% -50% -50% -50%", 0);

  if (inTriggerZone) {
    isCenteredInViewport.current = true;
    startVideo(videoRef.current!);
  }
  if (hasPlayed.current && !inTriggerZone) {
    isCenteredInViewport.current = false;
    stopVideo(videoRef.current!, spotlight.content.video.startTime);
  }

  const videoComponent = (
    <div>
      <div
        className={`${styles.videoWrapper} aspect-video rounded-md relative`}
      >
        <video
          ref={videoRef}
          onPlay={() => {
            hasPlayed.current = true;
          }}
          className="w-full absolute"
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          autoPlay={false}
          muted
          loop
          controls={false}
          poster={spotlight.content.video.poster.src}
        >
          <source src={spotlight.content.video.location} type="video/mp4" />
        </video>
        <Image
          fill
          src={spotlight.content.video.poster}
          className={styles.poster}
          alt=""
          sizes="364px"
          quality={100}
          placeholder="blur"
        ></Image>
      </div>
    </div>
  );

  const titleComponent = (
    <div
      className={`${styles.titleWrapper} relative flex flex-col px-5 pt-3 pb-3.5`}
    >
      <h3 className="text-medium text-M">{spotlight.title}</h3>
      <h4 className="text-regular text-S text-faded">{spotlight.subtitle}</h4>
    </div>
  );

  return (
    <li
      ref={liRef}
      className={`${styles.li} ${
        isCenteredInViewport.current && styles.centeredInViewport
      } cursor-pointer shrink-0 rounded-lg relative`}
      key={i}
      onMouseEnter={(e) => {
        startVideo(videoRef.current!);
        scrollIntoView(e.currentTarget);
      }}
      onMouseLeave={(e) => {
        stopVideo(videoRef.current!, spotlight.content.video.startTime);
      }}
      onClick={() => {
        spotlight.content.embed && onClick(handlePreviewClick(spotlight));
      }}
    >
      <RenderItemWrapper spotlight={spotlight}>
        {videoComponent}
        {titleComponent}
      </RenderItemWrapper>
    </li>
  );
}
