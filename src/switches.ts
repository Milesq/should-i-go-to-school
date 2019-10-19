import { readFileSync } from 'fs';

import downloadData from './download/downloadData';
import Lesson from './Lesson';
import { getFrequencyData } from './getFrequencyData';

export function frequencyPercentage({ presence, absence }: Lesson): number {
    return (presence / (absence + presence)) * 100;
}

export function download(): void {
    downloadData().catch(error => {
        console.log(error);
        process.exit();
    });
}

function parseSummary(frequencyData: Lesson[]): string {
    return frequencyData
        .map((el: Lesson) => {
            let howManyTo50 = ' ';

            if (frequencyPercentage(el) < 50) {
                const { absence, presence }: Lesson = el;
                howManyTo50 = absence - presence + '';
            }

            return `${Math.round(frequencyPercentage(el) * 100) / 100}%\t\t${howManyTo50}|\t${
                el.type
            }`;
        })
        .join('\n');
}

const frequencyData = getFrequencyData();

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
