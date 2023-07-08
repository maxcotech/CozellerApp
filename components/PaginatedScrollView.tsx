import React, { useState, useCallback } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { PaginatedData } from "../src/config/data_types/general.types";
import { ScrollView } from "native-base";
import { APP_COLOR } from "../src/config/constants.config";
import { InterfaceScrollViewProps } from "native-base/lib/typescript/components/basic/ScrollView/types";


export const LoadingRow = ({ title = "Load More", params, onLoadNewPage }) => {
    const [loading, setLoading] = useState(false);

    return (
        <TouchableOpacity onPress={() => onLoadNewPage(params, setLoading)} style={[{ paddingVertical: 10, paddingHorizontal: 15 }]} >
            {
                (loading) ?
                    <ActivityIndicator color="red" /> :
                    <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center", color: APP_COLOR }}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export interface PaginatedScrollParams<T, C> extends InterfaceScrollViewProps {
    pageParams?: C,
    prevTitle?: string,
    nextTitle?: string,
    children: React.ReactNode,
    paginationData?: PaginatedData<T>,
    onLoadNewPage: (params: C, iloader: (loading: boolean) => void) => void
}

export default function PaginatedScrollView<T, C>({ pageParams = {} as C, prevTitle = "Load Previous", nextTitle = "Load More", children, paginationData, onLoadNewPage, ...others }: PaginatedScrollParams<T, C>) {
    const hasNext = useCallback(() => {
        const currentPage = paginationData?.current_page ?? 0;
        const totalPages = paginationData?.last_page ?? 1;
        if (totalPages > 0 && currentPage < totalPages) {
            return true;
        }
        return false;
    }, [paginationData])

    const hasPrevious = useCallback(() => {
        const currentPage = paginationData?.current_page ?? 0;
        const totalPages = paginationData?.last_page ?? 1;
        if (totalPages > 0 && currentPage > 1) {
            return true;
        }
        return false;
    }, [paginationData])

    return (
        <ScrollView  {...others}>
            {
                (hasPrevious()) ?
                    <LoadingRow params={{ ...pageParams, page: (paginationData?.current_page ?? 1) - 1 }} onLoadNewPage={onLoadNewPage} title={prevTitle} /> : <></>
            }
            {children}
            {
                (hasNext()) ?
                    <LoadingRow params={{ ...pageParams, page: (paginationData?.current_page ?? 0) + 1 }} onLoadNewPage={onLoadNewPage} title={nextTitle} /> : <></>
            }
        </ScrollView>
    )
}