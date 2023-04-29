import { ResourceStatuses } from "../config/enum.config";

export const getResourceStatusColorScheme = (status: ResourceStatuses) => {
    switch(status){
        case ResourceStatuses.Blacklisted:
        case ResourceStatuses.Inactive: return {color: "danger.500", bgColor: "danger.200"};
        case ResourceStatuses.InReview: return {color: "info.500", bgColor: "info.200"};
        case ResourceStatuses.InDraft: return {color: "gray.200", bgColor: "gray.500"};
        case ResourceStatuses.Active:
        default: return {color: "success.200", bgColor: "success.500"}; 
    }
}

export const getResourceStatusText = (status: ResourceStatuses) => {
    switch(status){
        case ResourceStatuses.Blacklisted: return "Blacklisted";
        case ResourceStatuses.Inactive: return "Inactive";
        case ResourceStatuses.InReview: return "In Review";
        case ResourceStatuses.InDraft: return "In Draft";
        case ResourceStatuses.Active: return "Active";
        default: "Unknown";
    }
}