import React from "react";

import ElementMenuItem from "./element-menu-item";
import Links from "./links";
import Signature from "./signature";
import Link from "./link";

export default class Menu extends React.Component {
  renderAbout() {
    return (
      <div className="about">
        <h1>
          <Link href="#">Tessellate</Link>
        </h1>
        <p>
          Tessellate is interactive art that explores repetition.
          Drag, re-size, rotate, remove, color, and re-order the shapes.
          Create and remove them. Share a link to your work,
          like <Links/>.
        </p>
        <p>
          <b>n</b> makes a new
          element; <b>delete</b> removes an
          element; <b>escape</b> shows and hides this menu.
          If an element is selected, all new elements are duplicates of it.
        </p>
        <p>
          This is a toy. It works best on OSX Chrome. Sorry.
          If {"you're"} curious,
          the shapes are SVG elements rendered with React.
          You can also
          on <a href="https://github.com/chrisbolin/tessellate" target="_blank">
            check out the source
          </a>.
        </p>
        <p>
          <Signature/>
        </p>
      </div>
    );
  }
  renderElements() {
    return (
      <div className="main">
        {this.renderAbout()}
        {
          this.props.elements.map((element, index) => (
            <ElementMenuItem
              element={element}
              key={index}
              index={index}
              selected={index === this.props.selectedIndex}
              selectElement={this.props.selectElement}
              editor={this.props.editSelectedElement}
              deleteElement={this.props.deleteElement}
              moveUp={this.props.moveUp}
              moveDown={this.props.moveDown}
            />
          )).reverse() // show last rendered on top, for z-indexing
        }
      </div>
    );
  }
  renderActions() {
    return (
      <div className="actions">
        <div className="button" onClick={this.props.addElement}> + </div>
        <div
          className={`button ${!this.props.canUndo ? "disabled" : ""}`}
          onClick={this.props.undo}
        >
          ↰
        </div>
        <div
          className={`button ${!this.props.canRedo ? "disabled" : ""}`}
          onClick={this.props.redo}
        >
          ↱
        </div>
        <div className="toggle-hint">
          show + hide menu with <b>escape</b>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={`menu ${!this.props.showMenu ? "hidden" : ""}`}>
        {this.renderElements()}
        {this.renderActions()}
      </div>
    );
  }
}
