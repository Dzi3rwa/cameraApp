import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import * as SecureStore from 'expo-secure-store';

const BigPhoto = (props) => {

    const windowWidth = Dimensions.get("window").width
    const [IP, setIP] = useState()
    const [PORT, setPORT] = useState()

    shareImage = async () => {
        await Sharing.shareAsync(props.route.params.uri)
        props.navigation.goBack()
    }

    deleteImage = async () => {
        await MediaLibrary.deleteAssetsAsync(props.route.params.id)
        props.navigation.goBack()
    }

    useEffect(async () => {
        const ip = await SecureStore.getItemAsync("ip")
        const port = await SecureStore.getItemAsync("port")
        setIP(ip)
        setPORT(port)
    })

    uploadImage = () => {
        let data = new FormData()
        data.append('photo', {
            uri: props.route.params.uri,
            type: 'image/jpeg',
            name: 'test'
        })
        const body = data
        fetch(`http://${IP}:${PORT}/getPhoto`, {
            method: 'POST',
            body,
        })
        ToastAndroid.showWithGravity(
            'zdjecie przeslane',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
        //zmień adres ip
    }

    return (
        <View>
            <Image
                style={{
                    width: windowWidth - 40,
                    height: windowWidth,
                    borderRadius: 10,
                    margin: 20,
                    marginTop: 40
                }}
                source={{ uri: props.route.params.uri }}
            />
            <TouchableOpacity>
                <Text
                    onPress={shareImage}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 20
                    }}>SHARE</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={deleteImage}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 20
                    }}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={uploadImage}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 20
                    }}>UPLOAD</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BigPhoto;
