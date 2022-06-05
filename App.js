import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Main';
import Gallery from './components/Gallery';
import BigPhoto from './components/BigPhoto';
import Camera from './components/Camera';
import Sets from './components/Sets';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="main"
                    component={Main}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="gallery"
                    component={Gallery}
                    options={{
                        title: 'Zdjęcia',
                        headerStyle: {
                            backgroundColor: 'lightblue',
                        },
                        headerTintColor: '#ffffff',
                    }}
                />
                <Stack.Screen
                    name="bigPhoto"
                    component={BigPhoto}
                    options={{
                        title: 'Wybrane zdjęcie',
                        headerStyle: {
                            backgroundColor: 'lightblue',
                        },
                        headerTintColor: '#ffffff',
                    }}
                />
                <Stack.Screen
                    name="camera"
                    component={Camera}
                    options={{
                        title: 'Kamera',
                        headerStyle: {
                            backgroundColor: 'lightblue',
                        },
                        headerTintColor: '#ffffff',
                    }}
                />
                <Stack.Screen
                    name="sets"
                    component={Sets}
                    options={{
                        title: 'Ustawienia',
                        headerStyle: {
                            backgroundColor: 'lightblue',
                        },
                        headerTintColor: '#ffffff',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;