// set up //

// decoded -> encoded
const TARGETS = `
"type":
"rect"
"height":
"width":
"fill":
"translate":
"rotate":
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
`.trim().split("\n");

const REPLACEMENTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_~'!*()".split("");

if (TARGETS.length > REPLACEMENTS.length) {
  throw new Error(
    `Cannot encode. More targets (${TARGETS.length}) than replacements (${REPLACEMENTS.length}).`
  );
}

window._mapper = TARGETS.reduce((mapper, current, index) => {
  mapper[REPLACEMENTS[index]] = TARGETS[index];
  return mapper;
}, {});

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

const encode = (elements) => {
  const elementsCopy = [...elements];
  return encodeURIComponent(
    replaceToEncode(
      truncateDigits(JSON.stringify(elementsCopy).toLowerCase())
    )
  );
};

const decode = (encoded) => {
  return JSON.parse(
    replaceToDecode(
      decodeURIComponent(encoded)
    )
  );
};

// exports //

export const updateHash = (elements) => {
  location.hash = encode(elements);
};

export const getElementsFromHash = () => {
  try {
    // could fail if
    // 1. no hash (common)
    // 2. malformed hash (uncommon)
    const encodedElements = location.hash.substr(1);
    return decode(encodedElements);
  } catch (e) {
    location.hash = "";
    return false;
  }
};
