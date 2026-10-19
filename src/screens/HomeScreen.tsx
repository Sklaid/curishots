import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import mainLogo from '../assets/images/cards/logo.png';
//import { Image } from 'react-native/types_generated/index';

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: { navigation: HomeNavProp }) {
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={mainLogo} style={styles.mainLogo} />
      </View>
      <Text style={styles.title}>Si Bebes Juegas</Text>
      <Text style = {style2.title}>¡Bienvenido a CuriShots!</Text>
      <Text style = {style3.title}>Un juego de cartas para beber con amigos</Text>
      <Button title="Comenzar" color = "#1585e7e0" onPress={() => navigation.navigate('AddPlayers')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#161616' },
  title: { fontSize: 34, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  fontFamily: {fontFamily: 'Koulen-Regular'},
    logocontainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -40,
  },
  mainLogo: {
    width: 169,
    height: 125,
    resizeMode: 'contain',
  },
});
const style2 = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  fontFamily: { fontFamily: 'Koulen-Regular' },
});
const style3 = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 14, fontWeight: 'regular', marginBottom: 20, color: '#fff' },
  fontFamily: { fontFamily: 'Koulen-Regular' },
});
