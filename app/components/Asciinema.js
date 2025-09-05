"use client";

import React, { useRef, useEffect } from "react";

// Custom component to render the embedded Asciinema player.
//
// Usage:
//
// <Asciinema recordingId="267480" />
// <Asciinema recordingId="267480" autoPlay="false" speed="2" loop="false" />
//

const Asciinema = ({
  recordingId,
  autoPlay = "true",
  speed = "1.5",
  loop = "1",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!recordingId || !ref.current) return;

    const script = document.createElement("script");

    script.setAttribute("id", "asciicast-" + recordingId);
    script.setAttribute(
      "src",
      "https://asciinema.org/a/" + recordingId + ".js",
    );
    script.setAttribute("async", "true");

    script.dataset.autoplay = autoPlay;
    script.dataset.speed = speed;
    script.dataset.loop = loop;

    ref.current.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.getElementById(
        "asciicast-" + recordingId,
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [recordingId, autoPlay, speed, loop]);

  if (!recordingId) {
    return <div>Error: recordingId is required for Asciinema component</div>;
  }

  return <div ref={ref} />;
};

export default Asciinema;
