import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);

  const fetchProductReviews = async (productId) => {
    try {
      const response = await axios.get(`http://192.168.1.103:3000/evaluations?productId=${productId}`);
      const reviews = response.data;

      if (reviews.length > 0) {
        const averageRating = reviews.reduce((sum, review) => sum + review.experience === 'Ruim' ? 1 : review.experience === 'Médio' ? 2 : 3, 0) / reviews.length;
        return averageRating;
      }
      return 0; 
    } catch (error) {
      console.error('Erro ao buscar avaliações: ', error);
      return 0;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.103:3000/products');
      const productsWithRating = await Promise.all(response.data.map(async (product) => {
        const averageRating = await fetchProductReviews(product.id);
        return { ...product, averageRating };
      }));
      setProducts(productsWithRating); 
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color={i <= rating ? '#ffd700' : '#ccc'} // Estrela dourada se menor ou igual ao rating médio, senão cinza
        />
      );
    }
    return stars;
  };

  const renderProducts = ({ item }) => { 
    return (
      <View style={styles.productCard}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productBrand}>Marca: {item.brand}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>

          <View style={styles.starsContainer}>
            {renderStars(item.averageRating)}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Avaliacao', { 
              productId: item.id,
              productName: item.name,
              productImage: item.image
            })}
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
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});
