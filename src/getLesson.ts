import { Interface } from 'readline';
const Select = require('select-option-cli/selectOne');
import { getFrequencyData } from './getFrequencyData';

export async function getLesson(rli: Interface): Promise<string> {
    const lessons = getFrequencyData().map(lesson => [lesson.type]);
    return (await new Select('Wybierz lekcję', lessons, rli))[0];
}
