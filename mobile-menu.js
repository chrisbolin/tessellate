import React from "react";

import Links from "./links";
import Signature from "./signature";

export default class MobileMenu extends React.Component {
  render() {
    return (
      <div className={`mobile-menu ${this.props.showMenu ? "" : "hidden"}`}>
        <h1>Tessellate</h1>
        <p>
          Tessellate is interactive art that explores repetition.
          Check out <Links/>
          .
          Come back on your computer to make your own designs!
        </p>
        <p>
          <Signature/>
        </p>
      </div>
    );
  }
}
