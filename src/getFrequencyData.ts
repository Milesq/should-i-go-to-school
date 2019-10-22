import { readFileSync } from 'fs';
import Lesson from './Lesson';
import { frequencyPercentage } from './switches';

const unNeeded = ['Wychowanie fizyczne', 'Godzina  z wychowawcą'];

export const getFrequencyData = (): Lesson[] => {
    const frequencyData: Lesson[] = JSON.parse(readFileSync('./data.json', 'utf-8'));
    return frequencyData.filter(
        lesson => frequencyPercentage(lesson) > 0 && unNeeded.every(el => lesson.type !== el)
    );
};
