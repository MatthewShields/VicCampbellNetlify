import React from "react";

import "./BlockList.css";

class BlockList extends React.Component {
  render() {
    return (
      <div className="block-item mt-10 border border-black border-solid p-6">
        <h2 className="mt-0">{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.text}} />
      </div>
    );
  }
}

export default BlockList;
