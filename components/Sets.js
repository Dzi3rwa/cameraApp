import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import * as SecureStore from 'expo-secure-store';

const Sets = () => {

    const [ip, setIp] = useState()
    const [port, setPort] = useState()
    const [visible, setVisible] = useState(false)
    const [IP, setIP] = useState()
    const [PORT, setPORT] = useState()

    newData = async () => {
        await SecureStore.setItemAsync("ip", ip)
        await SecureStore.setItemAsync("port", port)
    }

    useEffect(async () => {
        const ip = await SecureStore.getItemAsync("ip")
        const port = await SecureStore.getItemAsync("port")
        setIP(ip)
        setPORT(port)
    })

    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Nowy adres ip i port</Dialog.Title>
                <Dialog.Input onChangeText={(text) => setIp(text)} defaultValue={PORT} />
                <Dialog.Input onChangeText={(text) => setPort(text)} defaultValue={IP} />
                <Dialog.Button label="Cancel" onPress={() => {
                    setVisible(false)
                }} />
                <Dialog.Button label="Save" onPress={() => {
                    newData()
                    setVisible(false)
                }} />
            </Dialog.Container>
            <Text
                style={{
                    color: 'lightblue',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 3
                }}>IP: {IP}
            </Text>
            <Text
                style={{
                    color: 'lightblue',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: 3,
                    marginBottom: 200
                }}>PORT: {PORT}
            </Text>
            <TouchableOpacity>
                <Text
                    onPress={() => setVisible(true)}
                    style={{
                        color: 'lightblue',
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 3
                    }}>PODAJ NOWE DANE</Text>
            </TouchableOpacity>
        </View>
    )
}




export default Sets;
