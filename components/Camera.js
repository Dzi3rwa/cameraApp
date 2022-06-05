import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const CameraComponent = () => {

    let camera

    const [IP, setIP] = useState()
    const [PORT, setPORT] = useState()
    const [hasCameraPermissionHook, setCameraPermissionHook] = useState(0)
    const [type, setType] = useState(Camera.Constants.Type.back)

    takePhoto = async () => {
        if (camera) {
            let foto = await camera.takePictureAsync()
            let asset = await MediaLibrary.createAssetAsync(foto.uri)
            ToastAndroid.showWithGravity(
                'wykonano zdjęcie',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    changeCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        )
    }

    uploadCamera = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let data = new FormData()
            data.append('photo', {
                uri: result.uri,
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
        }
    }

    useEffect(async () => {
        let { status } = await Camera.requestCameraPermissionsAsync()
        setCameraPermissionHook(status == 'granted')
        const ip = await SecureStore.getItemAsync("ip")
        const port = await SecureStore.getItemAsync("port")
        setIP(ip)
        setPORT(port)
    })

    const { hasCameraPermission } = hasCameraPermissionHook

    if (hasCameraPermission == 0) {
        return <View />
    } else if (hasCameraPermission == false) {
        return <Text>brak dostępu do kamery</Text>
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => {
                        camera = ref
                    }}
                    style={{ flex: 1 }}
                    type={type}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={takePhoto}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                backgroundColor: 'red',
                                opacity: 0.3,
                                marginTop: 300
                            }}>
                            <Text
                                style={{
                                    borderRadius: 50,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    color: 'white',
                                }}>
                                Dodaj
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={changeCamera}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                backgroundColor: 'red',
                                opacity: 0.3
                            }}>
                            <Text
                                style={{
                                    borderRadius: 50,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
                                Zmień kamere
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={uploadCamera}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                backgroundColor: 'red',
                                opacity: 0.3
                            }}>
                            <Text
                                style={{
                                    borderRadius: 50,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
                                Upload
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
}

export default CameraComponent;
