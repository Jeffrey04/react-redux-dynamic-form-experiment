import React, { Component } from "react";
import { connect } from "react-redux";

import Persons from "./Persons";
import Journal from "./Journal";
import Book from "./Book";

class PublicationWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_change = props.handle_change.bind(this);
    this.handle_click = props.handle_click.bind(this);
    this.handle_update = props.handle_update.bind(this);
  }

  get_meta_widget() {
    let result;

    switch (this.props.publication.type) {
      case "journal":
        result = (
          <Journal
            delegate_update={this.handle_update}
            definition={this.props.publication.meta || {}}
          />
        );
        break;
      case "book":
        result = (
          <Book
            delegate_update={this.handle_update}
            definition={this.props.publication.meta || {}}
          />
        );
        break;
      default:
        result = "";
    }

    return result;
  }

  render() {
    return (
      <fieldset>
        <legend>Publication</legend>
        <p>
          <label>
            title<br />
            <input
              onChange={this.handle_change}
              name="title"
              value={this.props.publication.title}
            />
          </label>
        </p>

        <Persons
          legend="Authors"
          field="authors"
          delegate_update={this.handle_update}
          persons={this.props.publication.authors || [{}]}
        />

        <p>
          <label>
            Type<br />
            <select name="type" onChange={this.handle_change}>
              <option disabled selected={this.props.publication.type || true}>
                select
              </option>
              <option
                value="journal"
                selected={this.props.publication.type === "journal"}
              >
                Journal
              </option>
              <option
                selected={this.props.publication.type === "book"}
                value="book"
              >
                book
              </option>
            </select>
          </label>
        </p>

        <p>{this.get_meta_widget()}</p>

        <p>
          <a onClick={this.handle_click} href="#">
            Delete this publication
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
    },

    handle_update(_, changes) {
      return this.props.delegate_update(
        false,
        Object.assign({}, this.props.publication, changes)
      );
    }
  })
)(PublicationWidget);
