import React from 'react';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
}