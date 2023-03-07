import portfolios from "./assets/portfolios.js";

const extracted = portfolios.filter((portfolio) => (portfolio['update to current web'].toLowerCase() === 'true'))

console.log(extracted.length)
// console.log(extracted)
