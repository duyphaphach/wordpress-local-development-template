import jobs from "./assets/jobs.js";
import { writeFileSync } from "fs";

const regex1 = /style="[^\"]*"|aria-level="[0-9]*"|<p>.*\[:[a-z]*\]<\/p>/g;
// const regex1 =
// /<\/?b[^>]*>|<\/?span[^>]*>|<\/?strong[^>]*>|style="[^\"]*"|aria-level="[0-9]*"|<p>.*\[:[a-z]*\]<\/p>/g;
const regex2 = /\[:([a-z]{2})?\]/g;

const extracted = jobs.map(({post_content, post_content_ml, ...job}) => {

  const postContent = post_content.replaceAll(regex1, '').replaceAll(regex2, '');

  let job_description = '';
  let job_benefits = '';
  let job_requirements = '';
  let job_apply = '';

  const parts = postContent
    .split('<h3')
    .filter(section => section?.length > 0)
    .map(section => ('<h3' + section).replaceAll(/(?:\\[rn]|[\r\n]+)+/g, "<br />"))
    .forEach((part) => {
      if (/<h3.*description.*h3>/gi.test(part)) {
        job_description = part.replaceAll(/<h3.+h3>/g, '');
        return
      }

      if (/<h3.*compensation.*h3>/gi.test(part)) {
        job_benefits = part.replaceAll(/<h3.+h3>/g, '');
        return
      }

      if (/<h3.*requirements.*h3>/gi.test(part)) {
        job_requirements = part.replaceAll(/<h3.+h3>/g, '');
        return
      }

      if (/<h3.*apply.*h3>/gi.test(part)) {
        job_apply = part.replaceAll(/<h3.+h3>/g, '');
        return
      }
    })

  return ({
    ...job,
    post_title: job.post_title.replaceAll(regex2, ''),
    job_description,
    job_benefits,
    job_requirements,
    job_apply,
  })
})

writeFileSync('./jobs.json', JSON.stringify(extracted))
