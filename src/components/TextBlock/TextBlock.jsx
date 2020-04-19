import React from "react";

import { createMarkup, format_paras } from "../../_helpers/helpers.js";

class TextBlock extends React.Component {
  render() {
    return (
      <div className="max-w-screen-md mx-auto my-12">
        <h2>{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.text}} />
      </div>
    );
  }
}

export default TextBlock;
