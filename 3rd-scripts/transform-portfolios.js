import portfolios from "./assets/portfolios.js";
import fs from "fs";


const wrapURLs = function (text, new_window) {
  if (text.trim().length <= 0) return text

  const url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
  const target = new_window === true ? '_blank' : '';

  return text.replace(url_pattern, function (url) {
    const protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
    const href = protocol_pattern.test(url) ? url : 'http://' + url;
    // return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    return `<a href='${href}'${new_window ? ` target='_blank'` : ''}>${url}</a>`
  });
};

const newPorts = portfolios.map((portfolio => ({
  ...portfolio,
  url: wrapURLs(portfolio?.url ?? "", true)
})))

fs.writeFileSync('./portfolios.json', JSON.stringify(newPorts), {encoding: "utf-8"})

