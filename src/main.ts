require('dotenv').config();
const Select = require('select-option-cli/selectOne');
import { createInterface } from 'readline';

import { download, logLesson, showSummary, showDanger } from './switches';
import { getLesson } from './getLesson';

const program = require('commander');

program
    .option('-d, --download-data', '', download)
    .option('-l, --lesson <name>', 'Lesson name', logLesson)
    .option('-s, --summary', '', showSummary)
    .option('-w, --dangers', '', showDanger);

program.parse(process.argv);

const options = ['downloadData', 'lesson', 'summary', 'dangers'];

if (!options.some(option => program[option])) {
    const io = createInterface(process.stdin, process.stdout);
    const options = [
        'Pobieranie danych',
        'Wybieranie lekcji',
        'Podsumowanie',
        'Pokaż gdzie mniej niż 50%'
    ];

    new Select('Wybierz opcję:', options, io).then(async (resp: string) => {
        switch (resp) {
            case options[0]:
                download();
                break;

            case options[1]:
                logLesson(await getLesson(io));
                break;

            case options[2]:
                showSummary();
                break;

            case options[3]:
                showDanger();
                break;
        }

        io.close();
    });
}
