import { history } from "./location";
import presets from "./presets";

// decoded -> encoded
// always added new targets to the *end of TARGETS* so legacy saves don't break
const TARGETS = `
"type":
"rect"
"height":
"width":
"fill":
"translate":
"rotate":
"bgcolor":
"elements":
"ellipse"
"rx"
"ry"
",
"#
"
],
{
}
,
:
.
[
]
triangle
`.trim().split("\n");

const REPLACEMENTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_~'!*()".split("");

if (TARGETS.length > REPLACEMENTS.length) {
  throw new Error(
    `Cannot encode. More targets (${TARGETS.length}) than replacements (${REPLACEMENTS.length}).`
  );
}

// helpers //

const replaceAll = (string, fromList, toList) => {
  for (const index in fromList) {
    const fromSymbol = fromList[index];
    const toSymbol = toList[index];
    const regex = fromSymbol.match(/^[a-z\s]*$/i) ?
      `${fromSymbol}` : `\\${fromSymbol}`;
    const search = new RegExp(regex, "g");
    string = string.replace(search, toSymbol);
  }
  return string;
};

const replaceToEncode = (string) => replaceAll(string, TARGETS, REPLACEMENTS);
const replaceToDecode = (string) => replaceAll(string, REPLACEMENTS, TARGETS);

const truncateDigits = (string) => (
  // find ABC.123456, replace with ABC.123
  string.replace(/\.[0-9]{4,}/g, (match) => match.substring(0, 4))
);

// encoding / decoding //

const encode = (state) => {
  const persistableState = {
    elements: state.elements,
    bgcolor: state.backgroundColor
  };
  return encodeURIComponent(
    replaceToEncode(
      truncateDigits(JSON.stringify(persistableState).toLowerCase())
    )
  );
};

const decode = (encoded) => {
  const decoded = JSON.parse(
    replaceToDecode(
      decodeURIComponent(encoded)
    )
  );
  return {
    elements: decoded.elements,
    backgroundColor: decoded.bgcolor,
  };
};

// exports //

export const updateHash = (state) => {
  history.replace(
    location.pathname
    + "#"
    + encode(state)
  );
};

export const getStateFromHash = (href) => {
  try {
    // could fail if
    // 1. no hash (common)
    // 2. malformed hash (uncommon)
    href = href || history.getCurrentLocation().hash;
    const encodedState = href.split("#")[1];
    return decode(encodedState);
  } catch (e) {
    return presets.FourColoredAngledBars;
  }
};
