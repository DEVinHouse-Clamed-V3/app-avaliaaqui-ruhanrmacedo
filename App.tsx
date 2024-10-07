import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

export default function App({ navigation }) {
  const [products, setProducts] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.103:3000/products');
      setProducts(response.data); 
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const renderProducts = ({ item }) => { 
    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productBrand}>Marca: {item.brand}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Avaliacao', { productId: item.id })}
          >
            <Text style={styles.buttonText}>Avaliar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderProducts} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#e60000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
