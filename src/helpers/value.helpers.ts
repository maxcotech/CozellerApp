import { ReviewSummary } from "../config/data_types/product_types";
import { Platform } from 'react-native';

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

export const sumReviewCounts = (val: ReviewSummary) => {
    let sum = 0;
    Object.keys(val).forEach((key) => {
        sum += val[key];
    })
    return sum;
}

