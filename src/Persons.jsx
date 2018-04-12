import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "./Person";

class PersonsWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_click = props.handle_click.bind(this);
  }
  render() {
    return (
      <fieldset>
        <legend>{this.props.legend}</legend>
        {(this.props.persons || [{}]).map((person, idx) => (
          <Person
            key={`${this.props.field}-${idx}`}
            delegate_update={this.props.handle_update.bind(this, idx)}
            person={person}
          />
        ))}

        <p>
          <a onClick={this.handle_click} href="#">
            Add new person
          </a>
        </p>
      </fieldset>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    add_empty(value) {
      return value.length == 0 ? [{}] : value;
    },

    handle_click(e) {
      e.preventDefault();

      dispatch(
        this.props.delegate_update(false, {
          [this.props.field]: this.props.persons.concat([{}])
        })
      );
    },

    handle_update(position, is_delete, changes) {
      return this.props.delegate_update(false, {
        [this.props.field]: is_delete
          ? this.props.add_empty(
              this.props.persons.filter((_, idx) => idx !== position)
            )
          : this.props.persons.map(
              (_current, idx) =>
                position === idx
                  ? Object.assign({}, _current, changes)
                  : _current
            )
      });
    }
  })
)(PersonsWidget);
