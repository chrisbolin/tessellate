import React from "react";
import Keycode from "keycode";

import Tile from "./tile";
import Element from "./element";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";


// HELPERS //

const makeArray = (number) => Array.apply(null, Array(number));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.base = 14;
    this.mobile = !!navigator.userAgent.match(/Mobile|Android/);
    this.viewBox =
      `0 0 ${this.base * 10} ${this.base * 10}`;
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeys.bind(this));
    window.addEventListener("touchend", this.handleTouch.bind(this));
    this.props.selectElement(0);
  }

  handleElementMouseDown(event, selectedIndex) {
    this.props.startDrag(selectedIndex, event);
    event.stopPropagation();
  }

  handleTouch(event) {
    this.props.toggleMenu();
  }

  handleKeys(event) {
    // -- always catch these events -- //
    const keyName = Keycode(event);

    if (keyName === "esc") { // MENU
      this.props.toggleMenu();
    } else if (event.metaKey && keyName === "z") { // UNDO/REDO
      if (event.shiftKey) {
        this.props.redo();
      } else {
        this.props.undo();
      }
    } else if (event.target.tagName === "INPUT") {
      return;
    // -- only catch these events if _not_ on an input -- //
    } else if (keyName === "n") { // ADD NEW ELEMENT
      this.props.addElement();
    } else if (
      (['up', 'down', 'left', 'right'].indexOf(keyName) !== -1)
    ) {
      if (this.props.selectedIndex === null) {
        return;
      }

      let dx = 0;
      let dy = 0;
      let size = "medium";

      if (keyName === "up") {
        dy = -1;
      } else if (keyName === "down") {
        dy = 1;
      } else if (keyName === "right") {
        dx = 1;
      } else if (keyName === "left") {
        dx = -1;
      }

      if (event.shiftKey) {
        size = "small";
      }

      this.props.nudgeElement(dx, dy, size);
      event.preventDefault();
    } else if (keyName === "delete" || keyName === "backspace") {
      this.props.deleteElement();
    }
  }

  renderArtboard() {
    return (
      <div className="artboard">
        <svg
          viewBox={this.viewBox}
          style={{ backgroundColor: this.props.backgroundColor }}
          onMouseUp={this.props.endSelect}
          onMouseDown={this.props.deselect}
          onMouseMove={this.props.moveMouse}
          >
          {makeArray(12*12).map((_, index) => (
            <Tile
              key={index}
              index={index}
              base={this.base}
              selectedIndex={this.props.selectedIndex}
              elements={this.props.elements}
              onMouseDown={this.handleElementMouseDown.bind(this)}
              forceElementUpdate={this.props.forceElementUpdate}
              />
          ))}
        </svg>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderArtboard()}
        {
          this.mobile ?
            <MobileMenu
              showMenu={this.props.showMenu}
            />
            :
            <Menu
              showMenu={this.props.showMenu}
              elements={this.props.elements}
              selectedIndex={this.props.selectedIndex}
              selectElement={this.props.selectElement}
              editSelectedElement={this.props.editSelectedElement}
              addElement={this.props.addElement}
              undo={this.props.undo}
              redo={this.props.redo}
              deleteElement={this.props.deleteElement}
              moveUp={this.props.moveUp}
              moveDown={this.props.moveDown}
              canUndo={this.props.canUndo}
              canRedo={this.props.canRedo}
              editBackground={this.props.editBackground}
              backgroundColor={this.props.backgroundColor}
            />

        }
      </div>
    );

  }
}
