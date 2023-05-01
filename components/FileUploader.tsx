import { AspectRatio, Center, Image, Spinner, View } from "native-base";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import { FileDetails, getFileNameDetails } from "../src/helpers/file.helpers";
import { APP_COLOR } from './../src/config/constants.config';

export interface FileUploaderProps {
    ratio?: number,
    source?: ImageSourcePropType,
    width?: string | number,
    onFileChange: (val: FileDetails, iloader: (val: boolean) => void) => void
}


export default function FileUploader({ratio = 4/3, source, width, onFileChange}:FileUploaderProps){
    const [image,setImage] = useState<string>(null);
    const [loading,setLoading] = useState(false);
    const onPickImageImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        })
        if(!result.canceled){
            const file = result.assets[0];
            if(file){
                setImage(file.uri);
                const fileDetails = getFileNameDetails(file);
                if(onFileChange) onFileChange(fileDetails, setLoading);
            }
        }
        
    }

    return (
        <TouchableOpacity onPress={onPickImageImage} >
            <AspectRatio overflow={"hidden"} borderRadius={"8px"} ratio={ratio} width={width} >
                {
                    (loading)?
                    <Center flex={1}>
                        <Spinner color={APP_COLOR} />
                    </Center>:
                    <Image alt="Upload Files Indicator" width="full" height="full" source={(image)? {uri: image} : ((source)? source: require("../assets/placeholder-image.jpg"))}  />

                }
            </AspectRatio>
        </TouchableOpacity>
    )
}