import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Avaliacao({ route, navigation }) {
    const { productId, productName, productImage } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [recommend, setRecommend] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://192.168.1.103:3000/evaluations?productId=${productId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Erro ao buscar avaliações: ', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const submitEvaluation = async () => {
        if (!name || !email || !feedback || rating === 0) {
            alert('Preencha todos os campos');
            return;
        }


        setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.103:3000/evaluations', {
                productId,
                name,
                email,
                feedback,
                experience: rating === 1 ? 'Ruim' : rating === 2 ? 'Médio' : 'Bom',
                recommend,
            });
            console.log(response.data);
            alert('Avaliação enviada com sucesso!');
            fetchReviews();
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao enviar avaliação: ', error);
            alert('Erro ao enviar avaliação');
        } finally {
            setLoading(false);
        }
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 3; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Icon
                        name="star"
                        size={30}
                        color={i <= rating ? '#ffd700' : '#ccc'}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            <Text>{item.name}</Text>
            <Text>{item.feedback}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={(
                    <>
                        <Text style={styles.title}>Avaliação do Produto</Text>

                        <Image source={{ uri: productImage }} style={styles.productImage} />
                        <Text style={styles.productName}>{productName}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Feedback"
                            value={feedback}
                            onChangeText={setFeedback}
                        />

                        <View style={styles.starsContainer}>
                            {renderStars()}
                        </View>

                        <View style={styles.recommendation}>
                            <Text>Recomenda este produto?</Text>
                            <Button title={recommend ? "Sim" : "Não"} onPress={() => setRecommend(!recommend)} />
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={submitEvaluation} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Enviar Feedback</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.title}>Últimas Avaliações</Text>
                    </>
                )}
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderReview}
                style={styles.reviewList}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    recommendation: {
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#e60000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewList: {
        marginTop: 20,
    },
    reviewCard: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 10,
    },
    reviewName: {
        fontWeight: 'bold',
    },
    reviewFeedback: {
        marginTop: 5,
    },
});