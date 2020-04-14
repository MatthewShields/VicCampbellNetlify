import React from "react";

import "./BlockList.css";

class BlockList extends React.Component {
  render() {
    return (
      <div className="content-section">
        <h2>{this.props.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.text}} />

        {this.props.blocks.map(block => (
          <div key={block.title} className="shadow-block">
            <h3 className="shadow-block__title">{block.title}</h3>
            <div dangerouslySetInnerHTML={{__html: block.text}} />

            {block.footer_list && block.footer_list.length > 0 ? (
              <ul className="options-list">
                {block.footer_list.map(option => (
                  <li key={option.label}>
                    <span className="options-list__label">{option.label}</span>
                    <span className="options-list__value">{option.value}</span>
                  </li>
                ))}
              </ul>
            ) : false}
          </div>
        ))}
      </div>
    );
  }
}

export default BlockList;
