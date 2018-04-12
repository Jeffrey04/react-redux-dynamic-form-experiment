import React, { Component } from "react";
import { connect } from "react-redux";

import Publication from "./Publication";

function make_publication_update(revision_new) {
  return {
    type: "PUBLICATION_UPDATE",
    revision: revision_new
  };
}

class AppWidget extends Component {
  constructor(props) {
    super(props);

    this.handle_click = props.handle_click.bind(this);
  }

  render() {
    return (
      <fieldset>
        <legend>Publications</legend>

        {this.props.publications.map((item, idx) => (
          <Publication
            key={idx}
            publication={item}
            delegate_update={this.props.handle_update.bind(this, idx)}
          />
        ))}

        <a onClick={this.handle_click} href="#">
          Add new publiations
        </a>
      </fieldset>
    );
  }
}

export default connect(
  state => ({
    publications: state.publications || [{}]
  }),
  dispatch => ({
    handle_click(e) {
      e.preventDefault();

      dispatch(make_publication_update(this.props.publications.concat([{}])));
    },

    handle_update(position, is_delete, changes) {
      return make_publication_update(
        is_delete
          ? this.props.publications.filter((_, idx) => idx !== position)
          : this.props.publications.map(
              (_current, idx) =>
                idx === position
                  ? Object.assign({}, _current, changes)
                  : _current
            )
      );
    }
  })
)(AppWidget);
