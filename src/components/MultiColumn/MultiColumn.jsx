import React, { Fragment } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

class MultiColumn extends React.Component {
  render() {
    let products = this.props.images;
    const columns = (this.props.columns ? this.props.columns : 3);
    const column_count = (this.props.col_num ? this.props.col_num : 3);
    return (
      <Fragment>
        {Array.isArray(columns) && columns.length > 0 &&
          <div className={`mx-auto ${(this.props.size ? 'max-w-screen-'+this.props.size : false)}`}>
            {this.props.title &&
              <h2 className="mb-4 text-2xl text-center">{this.props.title}</h2>
            }
            <div className={`grid md:grid-cols-${column_count} gap-6 lg:gap-12`}>
              {columns.map((column) => (
                <div 
                dangerouslySetInnerHTML={{ __html: column.text }}
                />
              ))}
            </div>
          </div>
        }
      </Fragment>
    );
  }
}

export default MultiColumn;
