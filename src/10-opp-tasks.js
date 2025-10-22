/**
 * You will complete the PaginationHelper class,
 * which is a utility class helpful for querying paging information related to an array.
 * The class is designed to take in an array of values and an integer
 * indicating how many items will be allowed per each page.
 * The types of values contained within the collection/array are not relevant.
 *
 * The following are some examples of how this class is used:
 * @example
 *     const helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
 *     helper.pageCount(); //should == 2
 *     helper.itemCount(); //should == 6
 *     helper.pageItemCount(0); //should == 4
 *     helper.pageItemCount(1); // last page - should == 2
 *     helper.pageItemCount(2); // should == -1 since the page is invalid
 *
 *     // pageIndex takes an item index and returns the page that it belongs on
 *     helper.pageIndex(5); //should == 1 (zero based index)
 *     helper.pageIndex(2); //should == 0
 *     helper.pageIndex(20); //should == -1
 *     helper.pageIndex(-10); //should == -1
 */

class PaginationHelper {
  constructor(collection, itemsPerPage) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  itemCount() {
    return this.collection.length;
  }

  pageCount() {
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }

  pageItemCount(pageIndex) {
    if (pageIndex < 0 || pageIndex >= this.pageCount()) {
      return -1;
    }
    if (pageIndex === this.pageCount() - 1) {
      return this.collection.length % this.itemsPerPage || this.itemsPerPage;
    }
    return this.itemsPerPage;
  }

  pageIndex(itemIndex) {
    if (itemIndex < 0 || itemIndex >= this.collection.length) {
      return -1;
    }
    return Math.floor(itemIndex / this.itemsPerPage);
  }
}

module.exports = {
  PaginationHelper,
};
