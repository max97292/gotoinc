function groupBy(array, grouping, filter = null) {
  const group = (arr, criterion) => {
    return arr.reduce((result, item) => {
      let key;

      if (typeof criterion === "function") {
        key = criterion(item);
      } else if (typeof criterion === "string") {
        key = item[criterion];
      } else {
        key = undefined;
      }

      key = key !== undefined ? key : "undefined";

      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
  };

  if (typeof filter === "function") {
    array = array.filter(filter);
  }

  if (Array.isArray(grouping)) {
    return grouping.reduce((result, criterion) => {
      const recurse = (grouped) => {
        if (Array.isArray(grouped)) {
          return group(grouped, criterion);
        } else {
          for (const key in grouped) {
            grouped[key] = recurse(grouped[key]);
          }
          return grouped;
        }
      };
      return recurse(result);
    }, array);
  }

  return group(array, grouping);
}

const data = [
  { name: "Alice", age: 25, city: "New York", country: "USA" },
  { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
  { name: "Charlie", age: 25, city: "London", country: "UK" },
  { name: "David", age: 35, city: "New York", country: "USA" },
  { name: "Eve", age: 35, cities: "Paris", country: "France" },
];

// console.log(groupBy(data, "city"));
// console.log(groupBy(data, ["country", "city"]));
// console.log(
//   groupBy(data, (person) => (person.age >= 30 ? "30 and above" : "Below 30"))
// );
console.log(groupBy(data, ["country", "city"], (person) => person.age >= 30));
