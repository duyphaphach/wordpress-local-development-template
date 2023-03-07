import fs from "fs";

// const extracted = jobs.map((job) => ({
//   ...job,
//   post_title: job.post_title.replaceAll(regex2, ''),
//   post_content: job.post_content.replaceAll(regex1, '').replaceAll(regex2, '')
// }))

const jobs = JSON.parse(fs.readFileSync('./jobs.json', {encoding: "utf-8"}))

const empties = jobs.filter(job => {
  return(job.job_description.length === 0 ||
  job.job_benefits.length === 0 ||
  job.job_requirements.length === 0 ||
  job.job_apply.length === 0)
})

console.log(empties.length)
// console.log(job_benefits)
// console.log(job_requirements)
