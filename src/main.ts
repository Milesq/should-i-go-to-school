require('dotenv').config();

import { download, nextLesson, getSummary, filterDanger, logLesson } from './switches';

const program = require('commander');

program
    .option('-d, --download-data', '', download)
    .option('-l, --lesson [name]', 'Lesson name', logLesson)
    .option('-n, --next-lesson', '', nextLesson)
    .option('-s, --summary', '', () => console.log(getSummary()))
    .option('-d, --dangers', '', () => console.log(getSummary().filter(filterDanger)));

program.parse(process.argv);
