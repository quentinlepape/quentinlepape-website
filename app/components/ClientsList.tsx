"use client";

import Link from "next/link";
import {
  CurriculumVitae,
  ICurriculumVitaeClients,
} from "../data/curriculumVitae";
import Lightbox from "./lightbox/Lightbox";
import { SetStateAction, useState } from "react";

function Clients(
  clients: ICurriculumVitaeClients[],
  setlightboxContent: (
    value: SetStateAction<
      | {
          embed: JSX.Element;
          title: string;
          link?: URL;
        }
      | undefined
    >
  ) => void
) {
  const clientsList: React.JSX.Element[] = [];

  clients.forEach((client, i) => {
    if (client.showcase) {
      let element: JSX.Element | undefined = undefined;

      if (client.content?.embed) {
        if (client.content.link) {
          element = (
            <li key={i}>
              <span className="px-0.55em cursor-pointer link-dotted-group">
                <span
                  onClick={() =>
                    setlightboxContent({
                      embed: client.content?.embed!,
                      title: client.name,
                      link: client.content?.link,
                    })
                  }
                  className="dotted link-dotted transition"
                >
                  {client.name}
                </span>
              </span>
            </li>
          );
        } else {
          element = (
            <li key={i}>
              <span className="px-0.55em cursor-pointer link-dotted-group">
                <span
                  onClick={() =>
                    setlightboxContent({
                      embed: client.content?.embed!,
                      title: client.name,
                    })
                  }
                  className="dotted link-dotted cursor-pointer transition"
                >
                  {client.name}
                </span>
              </span>
            </li>
          );
        }
      } else if (client.content?.link) {
        element = (
          <li key={i}>
            <Link
              href={client.content.link}
              target="_blank"
              className="px-0.55em link-dotted-group"
            >
              <span className="dotted link-dotted transition">
                {client.name}
              </span>
            </Link>
          </li>
        );
      } else {
        element = (
          <li key={i}>
            <span className="px-0.55em cursor-default">
              <span className="dotted">{client.name}</span>
            </span>
          </li>
        );
      }

      clientsList.push(element);
    }
  });

  return clientsList;
}

// TODO: Update this code with exampke from https://nextjs.org/learn/foundations/from-javascript-to-react/displaying-data-with-props

export default function ClientsList() {
  const [lightboxContent, setlightboxContent] = useState<{
    embed: JSX.Element;
    title: string;
    link?: URL;
  }>();

  const clients = CurriculumVitae.clients;

  return (
    <div>
      <ul className="relative -l-0.55em list-inline list-inline-separated text-medium">
        {Clients(clients, setlightboxContent)}
      </ul>
      <Lightbox
        title={lightboxContent?.title}
        subtitle={"Showcase"}
        link={lightboxContent?.link}
        onClose={() => setlightboxContent(undefined)}
      >
        {lightboxContent?.embed}
      </Lightbox>
    </div>
  );
}
