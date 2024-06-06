import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet,Button,FlatList,Text, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [tareas, onChangeTareas] = React.useState([{key:1,dato:'Haga click en el boton para cargar tareas'}]);

  const traerLasTareas = () => {
    fetch('https://0dc9-2806-2f0-7481-fa98-4595-da1d-71f3-3c35.ngrok-free.app/traer',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response =>{
      response.json().then((result) => {
        if (response.status === 200){
          Alert.alert(`Solicitud exitosa, status: ${response.status.toString()}`,
            `Los valores fueron recolectados de la base de datos`, 
            [
              {text: 'OK', onPress: () => console.log("la peticion tuvo exito")}
            ]
          );
          var listaDeTareas = result.map(function (obj) {
            var rObj = {};
            rObj['key'] = obj.id;
            rObj['dato'] = obj.todo;
            return rObj;
          });
          onChangeTareas(listaDeTareas);
        }else{
          Alert.alert('Error', `Hay un error con la solicitud: ${response.status.toString()}`, 
            [
              {text: 'OK', onPress: () => console.log(response.status.toString())},
            ]
          );
        }
      })
    })
    .catch(error => {
      Alert.alert('Error', `Hay un error con la solicitud: ${error}`, 
        [
          {text: 'OK', onPress: () => console.log(error)},
        ]
      );
    }) 
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="list" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tareas Pendientes</ThemedText>
      </ThemedView>
      <ThemedText>Esta aplicacion va a traer tareas pendientes de una base de datos.</ThemedText>
      <FlatList
        data={tareas}
        renderItem={
          ({item}) => <Text style={styles.item}>{item.dato}</Text>
        }
      />
      <Button
        title="traer Tareas Pendientes"
        onPress={() => traerLasTareas()}
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    color: 'white',
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'center'
  },
});
