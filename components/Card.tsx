import React, { useState } from 'react'
import { View } from './Themed'
import { Avatar, Button, Card, Icon, Text } from 'react-native-paper'
import { ArtProduct } from '@/models/ArtProduct'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const LeftContent = props => <Avatar.Icon {...props} icon="" />

interface CardComponentProps {
	ArtProduct: ArtProduct;
}

function CardComponent({ ArtProduct }: CardComponentProps) {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavorite = () => {
		setIsFavorite(!isFavorite);
	}

	const { artName, brand, image, limitedTimeDeal, price } = ArtProduct;

	return (
		<Card style={styles.card}>
			<Card.Cover source={{ uri: `${image}` }} style={styles.cover} />
			<Card.Title title={artName} />
			<Card.Content>
				<Text style={styles.price}>$ {price}</Text>
				<Text style={styles.deal}>time deal: <Text>{limitedTimeDeal}</Text></Text>
				<Text style={styles.price}>{brand}</Text>
			</Card.Content>
			<Card.Actions>
				<Button style={[styles.heartButton, styles.noBorder]} onPress={handleFavorite} labelStyle={styles.heartIcon}>
					<MaterialCommunityIcons
						name={`${isFavorite ? 'cards-heart' : 'cards-heart-outline'}`}
						size={21}
						color={isFavorite ? 'red' : 'gray'} />
				</Button>
			</Card.Actions>
		</Card>
	)
}

export default CardComponent

const styles = StyleSheet.create({
	card: {
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3,
	},
	cover: {
		height: 180,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
	},
	price: {
		marginTop: 8,
		fontSize: 16,
		fontWeight: '600',
		color: '#6200ee',
	},
	deal: {
		marginTop: 4,
		fontSize: 14,
		fontWeight: 'bold',
		color: 'red',
	},
	heartButton: {
		alignSelf: 'flex-end',
	},
	heartIcon: {
		fontSize: 24,
	},
	noBorder: {
		borderWidth: 0,
		backgroundColor: 'transparent',
		padding: 0,
		margin: 0,
	},
});
