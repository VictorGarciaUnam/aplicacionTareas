import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, Button, Alert } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const hacerPeticion = (texto) => {
  fetch('https://0dc9-2806-2f0-7481-fa98-4595-da1d-71f3-3c35.ngrok-free.app/insert',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      todo: texto,
    }),
  })
  .then((response) => {
    if (response.status != 404){
      Alert.alert(`Solicitud exitosa, status: ${response.status.toString()}`,
        `El siguiente mensaje fue insertado en la base de datos: ${texto}`, 
        [
          {text: 'OK'},
        ]
      );
    }else{
      Alert.alert('Error', `Hay un error con la solicitud: ${response.status.toString()}`, 
        [
          {text: 'OK', onPress: () => console.log(response.status.toString())},
        ]
      );
    }
  })
  .catch(error => {
    Alert.alert('Error', `Hay un error con la solicitud: ${error}`, 
      [
        {text: 'OK', onPress: () => console.log(error)},
      ]
    );
  }) 
}

export default function TabTwoScreen() {
  const [todo, onChangeTodo] = React.useState('');
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="add-circle" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Agregar Tareas</ThemedText>
      </ThemedView>
      <ThemedText>Esta pantalla esta echa para agregar una tarea pendiente a una base de datos.</ThemedText>
      <TextInput
        style={styles.textInput}
        placeholder="todo"
        textContentType="default"
        keyboardType="default"
        onChangeText={(text) => onChangeTodo(text)}
      />
      <Button
        style={styles.button}
        title="Agregar Tarea"
        onPress={() => hacerPeticion(todo)}
      />  
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  textInput: {
    color:'white',
    height: 40,
    padding: 8,
    marginTop:20,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {},
});
