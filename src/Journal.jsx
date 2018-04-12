import React, { Component } from "react";
import { connect } from "react-redux";

import Persons from "./Persons";

class JournalWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_change = props.handle_change.bind(this);
    this.handle_update = props.handle_update.bind(this);
  }

  render() {
    return (
      <fieldset>
        <legend>Journal Meta</legend>

        <Persons
          delegate_update={this.handle_update}
          field="editors"
          legend="Editors"
          persons={this.props.definition.editors || [{}]}
        />

        <p>
          <label>
            Volume<br />
            <input
              onChange={this.handle_change}
              value={this.props.definition.volume}
              name="volume"
            />
          </label>
        </p>
      </fieldset>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    handle_change(e) {
      e.preventDefault();

      dispatch(
        this.props.delegate_update(false, {
          meta: Object.assign({}, this.props.definition, {
            [e.target.getAttribute("name")]: e.target.value
          })
        })
      );
    },

    handle_update(_, changes) {
      return this.props.delegate_update(false, {
        meta: Object.assign({}, this.props.definition, changes)
      });
    }
  })
)(JournalWidget);
