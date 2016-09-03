import React from "react";

import actions from "./actions";
import store from "./store";

const handleLinkClick = (href) => {
  store.dispatch({
    type: actions.LOCATION_CHANGE,
    href,
  });
};

export default ({ href, children }) => (
  <a href={href} onClick={handleLinkClick.bind(null, href)}>
    {children}
  </a>
);
