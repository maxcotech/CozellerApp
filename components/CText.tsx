import { Text } from "native-base";
import { InterfaceTextProps } from "native-base/lib/typescript/components/primitives/Text/types";
import { ColorType } from "native-base/lib/typescript/components/types";
import { useMemo } from "react";

export type CTextVariant = "heading" | "subheading" | "body1" | "body2" | "body3";
export interface CTextProps extends InterfaceTextProps {
    variant?: CTextVariant,
    color?: ColorType | string
}

export default function CText({
    children, variant = "body1", color = "black", ...props
}:CTextProps){
    const finalProps = useMemo(() => {
        const defaultProps: CTextProps = {fontFamily:"body", color, ...props}
        switch(variant){
            case "body1" : return {...defaultProps, fontSize : "16px"};
            case "body2" : return {...defaultProps, fontSize : "14px"};
            case "body3" : return {...defaultProps, fontSize : "12px"};
            case "heading" : return {...defaultProps, fontSize: "24px", fontWeight: "bold"};
            case "subheading" : return {...defaultProps, fontSize: "18px", fontWeight: "bold"};
            default: return {...defaultProps, fontSize : "16px"};
        }
    },[variant]);

    return (
        <Text {...finalProps}>
            {children}
        </Text>
    )
}