import { useContext } from "react";
import { formatNumber } from "../src/helpers/string.helpers";
import CText, { CTextProps } from "./CText";
import AppContext from "../src/contexts/AppContext";


export interface MoneyProps extends CTextProps {
    children: number | string,
    currencySym?: string,
    useCode?: boolean,
    currencyCode?: string,
    maxFraction?: number
}

export default function Money({children,currencySym,currencyCode,maxFraction = 2,useCode = false,...props}:MoneyProps){
    const appContext = useContext(AppContext);
    const symbol = currencySym ?? appContext.profileData?.currency?.currency_sym;
    const code = currencyCode ?? appContext.profileData?.currency?.currency_code;

    return (
        <CText {...props}>
            {formatNumber(children as number,(useCode)? code:undefined ,(useCode)? undefined: symbol,maxFraction)}
        </CText>
    )
}