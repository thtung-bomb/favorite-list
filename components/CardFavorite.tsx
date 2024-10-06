import { ArtProduct } from '@/models/ArtProduct';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import ModalComponent from './ModalComponent';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";


interface CardFavoriteProps {
	id: string;
	ArtProduct: ArtProduct;
}

function CardFavorite({ ArtProduct, id }: CardFavoriteProps) {
	const [visible, setVisible] = useState(false);
	const navigation = useNavigation();
	const router = useRouter();

	const handleShowModal = () => {
		setVisible(true);
	};

	const handleHideModal = () => {
		setVisible(false);
	};

	const { artName, description, image } = ArtProduct;

	return (
		<>
			<Card style={styles.card} onPress={() => router.push({
				pathname: `/item/${id}`
			})} onLongPress={handleShowModal}>
				<Card.Title
					title={artName}
					subtitle={description}
					left={(props) => <Avatar.Image {...props} source={{ uri: image }} />}
				/>
			</Card>
			<ModalComponent
				bodyMessage="Remove From Favorite List"
				visible={visible}
				onHideModal={handleHideModal}
				ArtProduct={ArtProduct}
			/>
		</>
	);
}

export default CardFavorite;

const styles = StyleSheet.create({
	card: {
		width: Dimensions.get('window').width - 20,
		margin: 6,
	},
});
