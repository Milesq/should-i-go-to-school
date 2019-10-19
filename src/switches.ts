import { readFileSync } from 'fs';

import downloadData from './download/downloadData';
import Lesson from './Lesson';

function frequencyPercentage({ presence, absence }: Lesson): number {
    return (presence / (absence + presence)) * 100;
}

export function download(): void {
    downloadData().catch(error => {
        console.log(error);
        process.exit();
    });
}

export function nextLesson(): void {
    logLesson('Matematyka');
}

function parseSummary(frequencyData: Lesson[]): string {
    return frequencyData
        .map(
            (el: Lesson) => `${Math.round(frequencyPercentage(el) * 100) / 100}%\t\t|\t\t${el.type}`
        )
        .join('\n');
}

let frequencyData: Lesson[] = JSON.parse(readFileSync('./data.json', 'utf-8'));
frequencyData = frequencyData.filter(
    lesson => frequencyPercentage(lesson) > 0 && lesson.type != 'Wychowanie fizyczne'
);

export function showSummary(): void {
    console.log(parseSummary(frequencyData));
}

export function showDanger(): void {
    const filtered = frequencyData.filter(lesson => frequencyPercentage(lesson) <= 50);

    console.log(parseSummary(filtered), '\n', filtered.length);
}

export function logLesson(name: string): void {
    const lesson = frequencyData.find(({ type }) => type.toLowerCase() === name.toLowerCase());
    console.log(parseSummary([lesson]));
}
