import React, { Fragment } from "react";
import TextBlock from "../TextBlock/TextBlock";
import BlockList from "../BlockList/BlockList";
import MasonryGrid from "../MasonryGrid/MasonryGrid";
import MultiColumn from "../MultiColumn/MultiColumn";

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
      case "multi_column":
        return (
          <MultiColumn
            title={section.title}
            text={section.text}
            col_num={section.col_num}
            columns={section.columns}
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
