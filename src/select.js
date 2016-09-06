import React from "react";

export default class Select extends React.Component {
  render() {
    return (
      <select
        title={this.props.title}
        value={this.props.value}
        onFocus={(event) => this.props.onFocus(event.target.value)}
        onChange={(event) => this.props.onChange(event.target.value)}
      >
        {Object.keys(this.props.displayValues).map((value) => {
          const display = this.props.displayValues[value];
          return (
            <option value={value} key={value}>
              {display}
            </option>
          );
        })}
      </select>
    );
  }
}
