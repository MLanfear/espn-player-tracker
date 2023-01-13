import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Ready to win your fantasy league this year?",
          "Well, let me introduce you to FunkyNFLAnalytics!",

        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default Type;
