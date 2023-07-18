import { decode } from 'html-entities';


export const formatNumber = (value: number, currencyCode?: string | null, currencySym?: string | null, maxFraction = 2, minFraction = 0): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction
    });
    if (currencySym) {
        return decode(currencySym) + formatter.format(value);
    }
    else if (currencyCode) {
        return formatter.format(value) + ` ${currencyCode}`;
    } else {
        return formatter.format(value);
    }

}

export const getLastUrlSegment = (val: string) => {
    if (!!val === false || val.length < 1) return "";
    const urlSegments = val.split('/');
    return urlSegments[urlSegments.length - 1];
}