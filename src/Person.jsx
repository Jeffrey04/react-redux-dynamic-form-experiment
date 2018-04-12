import React, { Component } from "react";
import { connect } from "react-redux";

class PersonWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_change = props.handle_change.bind(this);
    this.handle_click = props.handle_click.bind(this);
  }
  render() {
    return (
      <fieldset>
        <legend>Person</legend>
        <p>
          <label>
            Name<br />
            <input
              onChange={this.handle_change}
              name="name"
              value={this.props.person.name || ""}
            />
          </label>
        </p>
        <p>
          <label>
            Website<br />
            <input
              onChange={this.handle_change}
              name="website"
              value={this.props.person.website || ""}
            />
          </label>
        </p>
        <p>
          <a onClick={this.handle_click} href="#">
            Delete this author
          </a>
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
          [e.target.getAttribute("name")]: e.target.value
        })
      );
    },

    handle_click(e) {
      e.preventDefault();

      dispatch(this.props.delegate_update(true));
    }
  })
)(PersonWidget);
