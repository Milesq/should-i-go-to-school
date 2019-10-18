import Lesson from './Lesson';

export default (data: string): Lesson => {
    let presence: number = 0;
    let absence: number = 0;

    const presenceTypes = [
        'Obecność',
        'Spóźnienie nieusprawiedliwione',
        'Nieobecność z przyczyn szkolnych',
        'Spóźnienie usprawiedliwione',
        'Zwolnienie'
    ];

    JSON.parse(data)
        .data.Statystyki.map(({ NazwaTypuFrekwencji, Razem }: any) => ({
            name: NazwaTypuFrekwencji,
            count: Razem
        }))
        .forEach(({ name, count }: { name: string; count: number }) => {
            if (presenceTypes.indexOf(name) !== -1) {
                presence += count;
            } else {
                absence += count;
            }
        });

    return {
        presence,
        absence
    };
};
