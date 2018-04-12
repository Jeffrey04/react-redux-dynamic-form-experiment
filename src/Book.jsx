import React, { Component } from "react";
import { connect } from "react-redux";

import Persons from "./Persons";

class BookWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_change = props.handle_change.bind(this);
    this.handle_update = props.handle_update.bind(this);
  }

  render() {
    return (
      <fieldset>
        <legend>Book Meta</legend>

        <Persons
          delegate_update={this.handle_update}
          field="editors"
          legend="Editors"
          persons={this.props.definition.editors || [{}]}
        />

        <p>
          <label>
            Book title<br />
            <input
              onChange={this.handle_change}
              value={this.props.definition.title}
              name="title"
            />
          </label>
        </p>

        <p>
          <label>
            Published?<br />
            <select
              onChange={this.handle_change}
              value={this.props.definition.is_published}
              name="is_published"
            >
              <option value="" disabled selected>
                Select one
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </p>
      </fieldset>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    get_value(e) {
      let result;

      switch (e.target.getAttribute("name")) {
        case "is_published":
          if (e.target.value === "true") {
            result = true;
          } else if (e.target.value === "false") {
            result = false;
          }
          break;
        default:
          result = e.target.value;
      }

      return result;
    },
    handle_change(e) {
      e.preventDefault();

      dispatch(
        this.props.delegate_update(false, {
          meta: Object.assign({}, this.props.definition, {
            [e.target.getAttribute("name")]: this.props.get_value(e)
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
)(BookWidget);
