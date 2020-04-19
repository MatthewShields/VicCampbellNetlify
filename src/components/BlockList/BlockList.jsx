import React from "react";

import "./BlockList.css";

class BlockList extends React.Component {
  render() {
    return (
      <div className="block-item max-w-screen-md mx-auto my-12 border border-gray-400 bg-gray-100 border-solid p-6">
        <h2 className="mt-0">{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.text}} />
      </div>
    );
  }
}

export default BlockList;
