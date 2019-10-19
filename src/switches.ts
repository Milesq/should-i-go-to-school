import { readFileSync } from 'fs';

import downloadData from './downloadData';
import Lesson from './Lesson';

function frequencyPercentage({ presence, absence }: Lesson): number {
    return (presence / (absence + presence)) * 100;
}

export function download() {
    downloadData().catch(error => {
        console.log(error);
        process.exit();
    });
}

export function nextLesson() {
    logLesson('Matematyka');
}

export function getSummary() {
    const frequencyData = JSON.parse(readFileSync('./data.json', 'utf-8'));
    return frequencyData.map((el: Lesson) => {
        return Math.round(frequencyPercentage(el) * 100) / 100 + '%\t\t|\t\t', el.type;
    });
}

export function filterDanger(lesson: Lesson): boolean {
    return frequencyPercentage(lesson) <= 50;
}

export function logLesson(name: string) {
    console.log('Lesson: ', name);
}
