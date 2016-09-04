import React from "react";

import presets from "./presets";

export default () => (
  <span>
    <a
      href={presets.ColorfulAngledBlocks.hash}
    >
      these colorful blocks
    </a> or <a
      href={presets.SquareAndCircleOnPink.hash}
    >
      this simple pattern
    </a>
  </span>
);
