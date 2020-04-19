import React, { Fragment } from "react";
import TextBlock from "../TextBlock/TextBlock";
import BlockList from "../BlockList/BlockList";
import MasonryGrid from "../MasonryGrid/MasonryGrid";

class FlexibleContent extends React.Component {
  choose_section(section) {
    switch (section.type) {
      case "text_block":
        return <TextBlock title={section.title} text={section.text} />;
        break;
      case "block_list":
        return (
          <BlockList
            title={section.title}
            text={section.text}
            blocks={section.blocks}
          />
        );
        break;
      case "masonry_grid":
        return (
          <MasonryGrid
            title={section.title}
            text={section.text}
            images={section.images}
          />
        );
        break;
      default:
      // code block
    }
  }

  render() {
    let sections = this.props.sections;
    return (
      <div>
        {sections && sections.length > 0 && (
          <Fragment>
            {sections.map((section, index) => (
              <div key={section.type + "_" + index}>
                {this.choose_section(section)}
              </div>
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}

export default FlexibleContent;
