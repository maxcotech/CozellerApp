let timeoutHandler = null;
export const debounced = <T>(val: T, actionFunc: (val: T) => void, timeoutDuration = 1000) => {
    if (timeoutHandler !== null) {
        clearTimeout(timeoutHandler);
        timeoutHandler = null;
    }
    timeoutHandler = setTimeout(() => {
        actionFunc(val);
    }, timeoutDuration)
}

export const enumToArray = (enumme) => {
    const StringIsNumber = value => isNaN(Number(value)) === false;
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key]);
}

export const percentageDiff = (sales: number, regular: number) => {
    const percentage = (sales / regular) * 100;
    return percentage - 100;
}