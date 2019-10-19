import { readFileSync } from 'fs';
import Lesson from './Lesson';
import { frequencyPercentage } from './switches';

export const getFrequencyData = (): Lesson[] => {
    const frequencyData: Lesson[] = JSON.parse(readFileSync('./data.json', 'utf-8'));
    return frequencyData.filter(
        lesson => frequencyPercentage(lesson) > 0 && lesson.type != 'Wychowanie fizyczne'
    );
};
