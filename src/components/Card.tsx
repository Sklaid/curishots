// src/components/Card.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Card as CardType } from '../types';

// logos
import miniLogo from '../assets/images/cards/minilogo.png';
import miniLogo2 from '../assets/images/cards/minilogo2.png';

const LEVEL_COLORS: Record<CardType['level'], string> = {
  VERDE:    '#00cc66',
  AMARILLA: '#ffcc00',
  ROJA:     '#ff4444',
  PICANTE:  '#ff3300ff',
  CELESTE:  '#66ccff',
};

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  const headerColor = LEVEL_COLORS[card.level] || '#fff';

  // elegir mini-logo según nivel
  const footerLogo: ImageSourcePropType =
    card.level === 'PICANTE' ? (miniLogo2 as any) : (miniLogo as any);

  // Función para formatear el texto de la carta
  const formatCardText = (text: string, drinks: number) => {
    // Si el texto ya contiene "BEBE" o "BEBEN", extraemos la instrucción
    if (text.includes('BEBE') || text.includes('BEBEN')) {
      // Buscamos patrones como "O BEBE X TRAGOS", "O BEBEN X TRAGOS", etc.
      const patterns = [
        /\s+O\s+BEBE\s+\d+\s+TRAGOS?/i,
        /\s+O\s+BEBEN\s+\d+\s+TRAGOS?/i,
        /\s+O\s+BEBE\s+\d+/i,
        /\s+O\s+BEBEN\s+\d+/i,
        /\s+BEBE\s+\d+\s+TRAGOS?/i,
        /\s+BEBEN\s+\d+\s+TRAGOS?/i,
        /\s+BEBE\s+\d+/i,
        /\s+BEBEN\s+\d+/i
      ];
      
      // Removemos la parte del castigo
      let cleanText = text;
      for (const pattern of patterns) {
        cleanText = cleanText.replace(pattern, '');
      }
      
      // Limpiamos espacios extra y conectores
      cleanText = cleanText.replace(/\s+O\s*$/, '').trim();
      
      // Si hay drinks, agregamos el castigo
      if (drinks > 0) {
        return `${cleanText} O BEBE ${drinks} ${drinks === 1 ? 'TRAGO' : 'TRAGOS'}`;
      }
      
      return cleanText;
    }
    
    // Si no tiene castigo y hay drinks, lo agregamos
    if (drinks > 0) {
      return `${text} O BEBE ${drinks} ${drinks === 1 ? 'TRAGO' : 'TRAGOS'}`;
    }
    
    return text;
  };
  return (
    <View style={styles.cardWrapper}>
      {/* Header coloreado */}
      <View style={[styles.cardHeader, { backgroundColor: headerColor }]}>
        <Text style={styles.cardHeaderText}>{/*card.ALGO*/}</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          {formatCardText(card.text, card.drinks)}
          </Text>
      </View>

      {/* Mini-logo variante */}
      <Image
        source={footerLogo}
        style={styles.miniLogo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: 300,
    height: 400,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  cardHeader: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#161616',
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#161616',
    fontFamily: 'Koulen-Regular',
  },
  miniLogo: {
    width: 65,
    height: 56,
    position: 'absolute',
    bottom: 0,
    right: -12,
    resizeMode: 'contain',
  },
});
