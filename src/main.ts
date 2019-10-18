require('dotenv').config();

import downloadData from './downloadData';

const program = require('commander');

function download() {
    downloadData().catch(error => {
        console.log(error);
        process.exit();
    });
}

function logLesson(name: string) {
    console.log('Lesson: ', name);
}

function nextLesson() {
    logLesson('Matematyka');
}

program
    .option('-d, --download-data', '', download)
    .option('-n, --next-lesson', '', nextLesson)
    .option('-l, --lesson [name]', 'Lesson name', logLesson);

program.parse(process.argv);
