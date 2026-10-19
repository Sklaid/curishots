// src/screens/GameScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useGame } from '../context/GameContext';
import cardsData from '../data/cards_data.json';
import { Card as CardType } from '../types';
import Card from '../components/Card';

// logos para el init
import initLogo from '../assets/images/cards/logo.png';
import altLogo  from '../assets/images/cards/niggachu.png';
// logos para el footer
import footerLogo1 from '../assets/images/cards/logo2.png';
import footerLogo2 from '../assets/images/cards/Eniggachu2.png';

export default function GameScreen() {
  const { state, dispatch } = useGame();
  const { started, players, currentPlayerIndex, deck, used } = state;
  const currentPlayer = players[currentPlayerIndex]?.name ?? '';
  const currentCard = deck[0] ?? null;

  // --- Estado y lógica de triple tap para el init logo ---
  const [initLogoSrc, setInitLogoSrc]   = useState(initLogo);
  const [initTapCount, setInitTapCount] = useState(0);

  const handleInitTap = () => {
    const next = initTapCount + 1;
    if (next >= 3) {
      setInitLogoSrc(altLogo);
      setInitTapCount(0);
    } else {
      setInitTapCount(next);
      setInitLogoSrc(initLogo);
    }
  };

  // --- Estado y lógica de triple tap para el footer logo ---
  const [footerLogoSrc, setFooterLogoSrc] = useState(footerLogo1);
  const [footTapCount, setFootTapCount]   = useState(0);

  const handleFooterTap = () => {
    const next = footTapCount + 1;
    if (next >= 3) {
      setFooterLogoSrc(footerLogo2);
      setFootTapCount(0);
    } else {
      setFootTapCount(next);
      setFooterLogoSrc(footerLogo1);
    }
  };

  // al cambiar de carta, si es PICANTE forzamos footerLogo2
  useEffect(() => {
    if (currentCard?.level === 'PICANTE') {
      setFooterLogoSrc(footerLogo2);
    } else {
      setFooterLogoSrc(footerLogo1);
      setFootTapCount(0);
    }
  }, [currentCard]);

  // --- Game actions ---
  const onStart = () => {
    const shuffled = cardsData.cards
      .map((c, i) => ({ id: i + 1, ...c }))
      .sort(() => Math.random() - 0.5);

    dispatch({ type: 'START_GAME', payload: shuffled as CardType[] });
  };
  const onDrawCard = () => dispatch({ type: 'DRAW_CARD' });
  const onReset    = () => dispatch({ type: 'RESET_GAME' });
  // Función para obtener el color del título según el nivel de la carta
  const getTitleColor = () => {
    if (!currentCard) return '#fff'; // Color por defecto cuando no hay carta
    
    const LEVEL_COLORS: Record<CardType['level'], string> = {
      VERDE:    '#00cc66',
      AMARILLA: '#ffcc00',
      ROJA:     '#ff4444',
      PICANTE:  '#ff3300ff',
      CELESTE:  '#66ccff',
    };
    
    return LEVEL_COLORS[currentCard.level] || '#fff';
  };
  return (
    <View style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: getTitleColor() }]}>#CURISHOTS</Text>
        {started && <Text style={styles.turnText}>Turno: {currentPlayer}</Text>}
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.cardContainer}>
        {!started ? (
          <>
            <TouchableOpacity onPress={handleInitTap} activeOpacity={0.7}>
              <Image source={initLogoSrc} style={styles.initLogo} />
            </TouchableOpacity>
            <Button title="Iniciar juego" onPress={onStart} />
          </>
        ) : currentCard ? (
          <Card card={currentCard} />
        ) : (
          <Text style={styles.noCardsText}>¡No quedan cartas!</Text>
        )}
      </View>

      {/* ===== FOOTER ===== */}
      {started && (
        <View style={styles.footerContainer}>
          <View style={styles.buttonRow}>
            <Button title="Sacar carta" onPress={onDrawCard} />
            <View style={styles.spacer} />
            <Button title="Reiniciar" onPress={onReset} />
          </View>
          <Text style={styles.countText}>
            Cartas usadas: {used.length} / {used.length + deck.length}
          </Text>

          <TouchableOpacity onPress={handleFooterTap} activeOpacity={0.7}>
            <Image source={footerLogoSrc} style={styles.bottomLogo} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Koulen-Regular',
    marginTop: 20,
  },
  turnText: {
    fontSize: 24,
    color: '#fff',
    marginTop: 4,
    fontFamily: 'Koulen-Regular',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initLogo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  noCardsText: {
    fontSize: 20,
    color: '#ff5555',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 24,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  spacer: {
    width: 16,
  },
  countText: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
  bottomLogo: {
    width: 169,
    height: 125,
    resizeMode: 'contain',
  },
});
