import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet,Button,FlatList,Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [tareas, onChangeTareas] = React.useState([{key:1,dato:'Haga click en el boton para cargar tareas'}]);
  const traerLasTareas = () => {
    var listaDeTareas = [
      {key:1,dato:'Ir por naranjas'},
      {key:2,dato:'Comprar cloro'},
      {key:3,dato:'Hacer ejercicio'},
      {key:4,dato:'Terminar tarea de programacion'},
      {key:5,dato:'Limpiar el baño'},
      {key:6,dato:'Comprar soporte para la TV'},
      ];
    onChangeTareas(listaDeTareas);
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

