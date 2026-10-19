// src/screens/AddPlayersScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useGame } from '../context/GameContext';
import { Player } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type AddNavProp = StackNavigationProp<RootStackParamList, 'AddPlayers'>;

export default function AddPlayersScreen({
  navigation,
}: {
  navigation: AddNavProp;
}) {
  const { state, dispatch } = useGame();
  const [name, setName] = useState('');

  const addPlayer = () => {
    if (!name.trim()) return;
    const newPlayer: Player = { id: Date.now().toString(), name: name.trim() };
    dispatch({ type: 'ADD_PLAYERS', payload: [...state.players, newPlayer] });
    setName('');
  };

  const removePlayer = (id: string) => {
    // filtrar al jugador y volver a despachar ADD_PLAYERS
    const filtered = state.players.filter((p) => p.id !== id);
    dispatch({ type: 'ADD_PLAYERS', payload: filtered });
  };

  const startGame = () => {
    navigation.replace('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jugadores</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addPlayer}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state.players}
        keyExtractor={(p) => p.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.player}>{item.name}</Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removePlayer(item.id)}
            >
              <Text style={styles.removeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={[
          styles.startBtn,
          state.players.length < 2 && styles.startBtnDisabled,
        ]}
        disabled={state.players.length < 2}
        onPress={startGame}
      >
        <Text style={styles.startBtnText}>Iniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#161616',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 6,
    paddingHorizontal: 12,
    color: '#fff',
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: '#1585e7e0',
    borderRadius: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#161616',
    fontSize: 24,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  player: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  removeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  removeBtnText: {
    color: '#e72e15e0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startBtn: {
    backgroundColor: '#1585e7e0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  startBtnDisabled: {
    backgroundColor: '#888',
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#161616',
  },
});
