import React from "react";

import { createMarkup, format_paras } from "../../_helpers/helpers.js";

class TextBlock extends React.Component {
  render() {
    return (
      <div className="content-section">
        <h2>{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.text}} />
      </div>
    );
  }
}

export default TextBlock;
