require('dotenv').config();

import { download, nextLesson, logLesson, showSummary, showDanger } from './switches';

const program = require('commander');

program
    .option('-d, --download-data', '', download)
    .option('-l, --lesson [name]', 'Lesson name', logLesson)
    .option('-n, --next-lesson', '', nextLesson)
    .option('-s, --summary', '', showSummary)
    .option('-w, --dangers', '', showDanger);

program.parse(process.argv);
