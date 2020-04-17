import React from "react";
import { Link } from "gatsby";

function multiDimensionalUnique(arr) {
  arr.sort(sortFunction);
  var uniques = [];
  var itemsFound = {};
  for(var i = 0, l = arr.length; i < l; i++) {
      var stringified = JSON.stringify(arr[i]);
      if(itemsFound[stringified]) { continue; }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
  }
  return uniques;
}

function sortFunction(a, b) {
  if (a.name === b.name) {
      return 0;
  }
  else {
      return (a.name < b.name) ? -1 : 1;
  }
}

class StoreCategories extends React.Component {
  render() {
    let cats_unique = multiDimensionalUnique(this.props.categories);
    return (
      <div className="flex flex-wrap justify-center my-6">
        <Link to={'/print-store/'} className={`text-center visible m-4 uppercase text-gray-600 hover:text-black hover:underline ${(this.props.active_category === 'Print Store' ? 'underline' : false)}`}>
          All
        </Link>
        {cats_unique.map((cat) => (
          <Link to={cat.url} className={`text-center visible m-4 uppercase text-gray-600 hover:text-black hover:underline ${(this.props.active_category === cat.name ? 'underline' : false)}`}>
            {cat.name}
          </Link>
        ))}
      </div>
    );
  }
}

export default StoreCategories;
