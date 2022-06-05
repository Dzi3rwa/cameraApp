import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import { ToastAndroid } from "react-native";
import * as SecureStore from 'expo-secure-store';

import FotoItem from './FotoItem';

const Gallery = (props) => {

    const [numColumns, setNumColumns] = useState(0)
    const [photos, setPhotos] = useState()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [click, setClick] = useState(false)
    const [bool, setBool] = useState(false)
    const [removeTab, setRemoveTab] = useState([])
    const [removeTabUri, setRemoveTabUri] = useState([])
    const [IP, setIP] = useState()
    const [PORT, setPORT] = useState()

    useEffect(async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        } else {
            const album = await MediaLibrary.getAlbumAsync("DCIM")
            const obj = await MediaLibrary.getAssetsAsync({
                album: album,
                first: 20,
                mediaType: ['photo'],
            })

            const string = JSON.stringify(obj.assets, null, 4)
            const object = JSON.parse(string)
            setPhotos(object)

            if (!bool) {
                const windowWidth = Dimensions.get("window").width
                setWidth((windowWidth / 5) - 10)
                setHeight((windowWidth / 5) - 10)
                setNumColumns(5)
                setBool(true)
                const ip = await SecureStore.getItemAsync("ip")
                const port = await SecureStore.getItemAsync("port")
                setIP(ip)
                setPORT(port)
            }
        }
    })

    gridList = () => {
        const windowWidth = Dimensions.get("window").width
        if (click) {
            setWidth((windowWidth / 5) - 10)
            setHeight((windowWidth / 5) - 10)
            setNumColumns(5)
        } else {
            setWidth(windowWidth - 10)
            setHeight(windowWidth - 200)
            setNumColumns(1)
        }
        setClick(!click)
    }

    removeTabFunction = (img, uri) => {
        const newTab = [...removeTab]
        newTab.push(img)
        setRemoveTab(newTab)
        const newTab2 = [...removeTabUri]
        newTab2.push(uri)
        setRemoveTabUri(newTab2)
    }

    removeFromTabFunction = (img, uri) => {
        let newTab = []
        removeTab.forEach(e => {
            if (e != img)
                newTab.push(e)
        })
        setRemoveTab(newTab)
        newTab.length = 0
        newTab = []
        removeTabUri.forEach(e => {
            if (e != uri)
                newTab.push(e)
        })
        setRemoveTabUri(newTab)
    }

    removeSelected = async () => {
        if (removeTab.length > 0) {
            await MediaLibrary.deleteAssetsAsync(removeTab)
            setRemoveTab([])
            ToastAndroid.showWithGravity(
                'usunięto',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    uploadSelected = () => {
        if (removeTab.length > 0) {
            let data = new FormData()
            removeTabUri.forEach(e => {
                data.append('photo', {
                    uri: e,
                    type: 'image/jpeg',
                    name: 'test'
                })
            })
            console.log(IP)
            const body = data
            fetch(`http://${IP}:${PORT}/getPhoto`, {
                method: 'POST',
                body,
            })
            ToastAndroid.showWithGravity(
                'przesłano wiele zdjęć',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
            setRemoveTabUri([])
        }
    }

    return (
        <View>
            <TouchableOpacity>
                <Text
                    onPress={gridList}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>GRID/LIST</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={() => props.navigation.navigate("camera")}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>OPEN CAMERA</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={removeSelected}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>REMOVE SELECTED</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={uploadSelected}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>UPLOAD SELECTED</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    onPress={() => props.navigation.navigate("sets")}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>SETS</Text>
            </TouchableOpacity>
            <FlatList
                style={{
                    marginBottom: 120
                }}
                numColumns={numColumns}
                key={numColumns}
                data={photos}
                renderItem={({ item, index }) => <FotoItem key={index} item={item} width={width} height={height} nav={props.navigation.navigate} removeTabFunction={removeTabFunction} removeFromTabFunction={removeFromTabFunction} />}
            />
        </View >
    )
}

export default Gallery;
