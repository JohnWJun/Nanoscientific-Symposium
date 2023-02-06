/* eslint-disable react/require-default-props */
import React from "react";

interface YoutubeEmbedProps {
  embedId?: string;
  url?: string;
  width?: string;
  height?: string;
}

const YoutubeEmbed = ({ embedId, url, width, height }: YoutubeEmbedProps) => {
  let resultSrc = "";

  if (embedId) {
    resultSrc = `https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1&playsinline=1`;
  } else if (url) {
    if (url.indexOf("embed") !== -1) {
      resultSrc = url;
    } else if (url.indexOf("watch") !== -1) {
      const calculatedEmbedId = url.split("v=")[1].split("&")[0];
      resultSrc = `https://www.youtube.com/embed/${calculatedEmbedId}?autoplay=1&mute=1&playsinline=1`;
    }
  }

  return (
    <div
      className="video-responsive"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width={width || "100%"}
        height={height || "100%"}
        src={resultSrc}
        frameBorder="0"
        allow=" accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{ maxWidth: "100vw" }}
      />
    </div>
  );
};

export default YoutubeEmbed;
