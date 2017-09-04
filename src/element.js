import React from "react";

const noop = () => {};

export default class Element extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.update;
  }
  render() {
    const { element, onMouseDown } = this.props;
    // note: order of transforms matters
    // -> if rotate is first, x-y moves will have to be altered
    const elementTransforms = {
      translate: element.translate,
      rotate: element.rotate,
    };

    let elementProps;
		let svgType;

    const baseProps = {
      fill: element.fill,
    };

		switch (element.type) {
			case "rect": {
				svgType = "rect";
	      elementProps = {
	        width: element.width,
	        height: element.height
	      };
				break;
			}
			case "ellipse": {
				svgType = "ellipse";
	      elementProps = {
	        rx: element.width / 2,
	        ry: element.height / 2
	      };
				break;
			}
			case "triangle": {
				svgType = "polygon";
				elementProps = {
					points: `0,0 ${element.width / 2},${-element.height} ${element.width},0`
				}
				break;
			}
		}

    let transform = Object.keys(elementTransforms).map(key => (
      `${key}(${elementTransforms[key]})`
    )).join(' ');

    return React.createElement(
      svgType,
      {
        transform,
        onMouseDown,
				...baseProps,
        ...elementProps
      }
    );
  }
}
