require('dotenv').config();

import { readFileSync } from 'fs';
import downloadData from './downloadData';
import Lesson from './Lesson';

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

function showSummary() {
    const frequencyData = JSON.parse(readFileSync('./data.json', 'utf-8'));
    frequencyData.forEach((el: Lesson) => {
        const percentage = (el.presence / (el.absence + el.presence)) * 100;
        console.log(Math.round(percentage * 100) / 100 + '%\t\t|\t\t', el.type);
    });
}

program
    .option('-d, --download-data', '', download)
    .option('-n, --next-lesson', '', nextLesson)
    .option('-s, --summary', '', showSummary)
    .option('-l, --lesson [name]', 'Lesson name', logLesson);

program.parse(process.argv);
