import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";

const Main = (props) => {

    const [fontloaded, setFontloaded] = useState(false)

    useEffect(async () => {
        await Font.loadAsync({
            'myfont': require('../fonts/aller.ttf'),
        });
        setFontloaded(true)
    })

    return (
        fontloaded
            ?
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => props.navigation.navigate("gallery")}
                >
                    <Text style={{
                        fontFamily: 'myfont',
                        fontSize: 80,
                        color: 'white',
                        backgroundColor: 'lightblue',
                        textAlign: 'center',
                        flex: 1,
                        paddingTop: 100
                    }}>Camera App</Text>
                    <Text style={{
                        fontFamily: 'myfont',
                        fontSize: 30,
                        color: 'white',
                        backgroundColor: 'lightblue',
                        textAlign: 'center',
                    }}>
                        take picture from camera
                    </Text>
                    <Text style={{
                        fontFamily: 'myfont',
                        fontSize: 30,
                        color: 'white',
                        backgroundColor: 'lightblue',
                        textAlign: 'center',
                    }}>
                        save photo to device
                    </Text>
                    <Text style={{
                        fontFamily: 'myfont',
                        fontSize: 30,
                        color: 'white',
                        backgroundColor: 'lightblue',
                        textAlign: 'center',
                        flex: 1,
                    }}>
                        delete photos from device
                    </Text>
                </TouchableOpacity>
            </View>
            :
            null
    )

}

export default Main;
