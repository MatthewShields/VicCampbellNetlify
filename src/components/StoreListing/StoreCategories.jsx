import React, { Fragment } from "react";
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

  onChange = (e) => {
    // this.props.history.push(`/${e.target.value}`);
    history.pushState(false, false, `/${e.target.value}`);
  }

  render() {
    let cats_unique = multiDimensionalUnique(this.props.categories);
    return (
      <Fragment>
        <div className="flex-wrap justify-center my-6 hidden md:flex">
          <Link to={'/print-store/'} className={`text-center visible m-4 uppercase text-gray-600 hover:text-black hover:underline ${(this.props.active_category === 'Print Store' ? 'underline' : false)}`}>
            All
          </Link>
          {cats_unique.map((cat) => (
            <Link to={cat.url} className={`text-center visible m-4 uppercase text-gray-600 hover:text-black hover:underline ${(this.props.active_category === cat.name ? 'underline' : false)}`}>
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="filter-categories"
          >
            Filter Categories
          </label>
          <div className="relative mb-8">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="filter-categories"
              id="filter-categories"
            >
              {cats_unique.map((cat) => (
                <option key={cat.url}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreCategories;
