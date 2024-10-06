import React, { useEffect, useState } from 'react'
import { Button, Card, Text } from 'react-native-paper'
import { ArtProduct } from '@/models/ArtProduct'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { toggleFavorite } from '@/redux/features/favoriteSlice'


interface CardComponentProps {
	ArtProduct: ArtProduct;
}

function CardComponent({ ArtProduct }: CardComponentProps) {

	const dispatch = useDispatch();

	const isFavorite = useSelector((state: RootState) =>
		state.favoriteList.items.some((item) => item.id === ArtProduct.id)
	);


	const handleFavorite = () => {
		dispatch(toggleFavorite(ArtProduct));
	}

	const { artName, brand, image, limitedTimeDeal, price } = ArtProduct;

	return (
		<Card style={styles.card}>
			<Card.Cover source={{ uri: `${image}` }} style={styles.cover} />
			<Card.Title title={artName} />
			<Card.Content>
				<Text style={styles.price}>$ {(price * (1 - limitedTimeDeal)).toFixed(2)}</Text>
				<Text style={styles.deal}>{limitedTimeDeal > 0 ? `-${limitedTimeDeal * 100}%` : ''}</Text>
				<Text style={styles.price}>{brand}</Text>
			</Card.Content>
			<Card.Actions>
				<MaterialCommunityIcons
					onPress={() => { handleFavorite() }}
					name={`${isFavorite ? 'cards-heart' : 'cards-heart-outline'}`}
					size={30}
					color={isFavorite ? 'red' : 'gray'} />
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
