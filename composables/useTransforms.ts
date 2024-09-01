export default function useTransformSchedule() {
    const transformSchedule = (time: string) => {
        if (time) {
            const sliced = time.split(':');
            return `<span>${sliced[0]}<sup>${sliced[1]}</sup></span>`
        }
        return ''
    };

    return {
        transformSchedule,
    };
}
