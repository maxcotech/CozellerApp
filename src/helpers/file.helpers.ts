import {ImagePickerAsset} from "expo-image-picker";

export interface FileDetails {
    uri: string,
    type: string,
    name: string
}
export const getFileNameDetails = (asset: ImagePickerAsset) => {
    let name = asset.uri.split('/').pop();
    let match = /\.(\w+)$/.exec(name);
    let type = match ? `${asset.type}/${match[1]}` : `${asset.type}`;
    return {uri: asset.uri, type, name} as FileDetails;
}
