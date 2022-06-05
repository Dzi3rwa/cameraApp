import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const FotoItem = (props) => {
    const [bool, setBool] = useState(false)
    return (
        <View>
            <TouchableOpacity
                onPress={() => props.nav("bigPhoto", { uri: props.item.uri, id: props.item.id })}
                onLongPress={() => {
                    setBool(!bool)
                    if (bool == false)
                        props.removeTabFunction(props.item.id, props.item.uri)
                    else
                        props.removeFromTabFunction(props.item.id, props.item.uri)
                }}>
                <Image
                    style={{
                        width: props.width,
                        height: props.height,
                        borderRadius: 10,
                        margin: 5,
                        opacity: bool ? 0.3 : 1
                    }}
                    source={{ uri: props.item.uri }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default FotoItem;
