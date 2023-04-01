module.exports = function contactLastName(arr) {
  if (arr.length === 0) return "";
  let currentValue = arr[0];
  return currentValue + " " + contactLastName(arr.slice(1));
};

module.exports = function getCategoriesValues(arr) {
  if (arr.length === 0) return [];
  let currentValue = arr[0];
  if (currentValue.id === "category") return currentValue;
  return getCategoriesValues(arr.slice(1));
};
