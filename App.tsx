import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.productImages}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s' }}
          style={styles.image}
        />
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92RibS6nXGww1R7R2dYrHb53A0aS9CbjE5w&s' }}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Avalie Aqui</Text>
      <Text style={styles.subtitle}>
        Escolha o produto que você deseja avaliar e compartilhe sua experiência com outros consumidores.
        </Text>

        <Button title="Entrar" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  productImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  }
});
