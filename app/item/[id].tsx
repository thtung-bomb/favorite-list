import { useColorScheme } from '@/components/useColorScheme.web';
import { api } from '@/config/api';
import { ArtProduct } from '@/models/ArtProduct';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/redux/features/favoriteSlice';
import { RootState } from '@/redux/store';
import { matchCommentsToArtProducts } from '@/utils/matchCommentsToArtProducts ';
import { comments } from '@/models/Comment';
import { AirbnbRating } from 'react-native-ratings';
import { Surface } from 'react-native-paper';

function DetailPage() {
	const colorScheme = useColorScheme();
	const [item, setItem] = useState<ArtProduct | null>();
	const [loading, setLoading] = useState(false);
	const [selectedRating, setSelectedRating] = useState<number | null>(null);
	const [selected, setSelected] = useState(false);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const isFavorite = useSelector((state: RootState) => {
		return state.favoriteList.items.some((check) => check.id === item?.id);
	})

	const { id } = useLocalSearchParams<{ id: string }>();

	const fetchItembyId = async (id) => {
		try {
			setLoading(true);
			const response = await api.get(`FavoriteList/${id}`);
			setItem(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchItembyId(id);
	}, [id]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: item ? item.artName : 'Loading...',
		});
	}, [navigation, item]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	const handleFavorite = () => {
		if (item) {
			dispatch(toggleFavorite(item));
		}
	}


	if (!item) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Item not found</Text>
			</View>
		);
	}

	const updatedArtProducts = matchCommentsToArtProducts([item], comments);
	const matchedComments = updatedArtProducts[0].comments || [];

	const moveCommentsOwnerToTop = [
		...matchedComments.filter(comment => comment.user.id === 5),
		...matchedComments.filter(comment => comment.user.id !== 5),
	]

	const ratingCounts = (comments: any[]) => {
		const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

		comments.forEach(comment => {
			if (comment.rating >= 1 && comment.rating <= 5) {
				counts[comment.rating]++;
			}
		});

		return counts;
	};

	const counts = ratingCounts(matchedComments);

	const handleSelectRating = (rate) => {
		setSelectedRating(rate === selectedRating ? null : rate);
	}

	return (
		<ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
			<ScrollView style={styles.container} indicatorStyle='black'>
				<Text style={styles.header}>{item.artName}</Text>
				<Image source={{ uri: item.image }} style={styles.image} />
				<Text style={styles.description}>{item.description}</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>${(item.price * (1 - item.limitedTimeDeal)).toFixed(2)}</Text>
					{item.limitedTimeDeal > 0 && (
						<Text style={styles.discount}><Text style={{ textDecorationLine: 'line-through' }}>-${(item.price).toFixed(2)}</Text> (Save {item.limitedTimeDeal * 100}%)</Text>
					)}
				</View>
				<View>
					<View>
						<Text style={styles.brand}>Brand: {item.brand}</Text>
						<Text style={styles.surface}>{item.glassSurface ? 'Suitable for glass surface' : 'Unsuitable for glass surface'}</Text>
					</View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }} >
						<MaterialCommunityIcons
							onPress={() => { handleFavorite() }}
							name={`${isFavorite ? 'cards-heart' : 'cards-heart-outline'}`}
							size={60}
							color={isFavorite ? 'red' : 'gray'} />
					</View>
				</View>
				<View style={{ marginTop: 30 }}>
					<Text style={{ fontWeight: '700', fontSize: 21, textAlign: 'center' }}>Filter by rating:</Text>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
						{[5, 4, 3, 2, 1].map(star => (
							<Surface
								key={star}
								style={[styles.surfaces, selectedRating === star && styles.surfaceSelected]} // Updated condition
								elevation={4}
								onTouchEnd={() => handleSelectRating(star)}
							>
								<View>
									<Text style={{ alignSelf: 'center' }}>{star} <Entypo name='star' size={21} color='#ceda12' /></Text>
									<Text>({counts[star]})</Text>
								</View>
							</Surface>
						))}
					</View>
				</View>
				<View style={styles.commentsContainer}>
					<Text style={styles.commentsHeader}>Ratings and Reviews</Text>
					{moveCommentsOwnerToTop.length === 0 ? (
						<Text>No comments available for this product.</Text>
					) : (

						moveCommentsOwnerToTop
							.filter(comment => selectedRating ? comment.rating === selectedRating : true)
							.map((comment, index) => (
								<View key={index} style={styles.comment}>
									<Text style={styles.commentUser}>@{comment.user.name === 'Thanh Tung' ? `${comment.user.name} (you)` : `${comment.user.name}`}:</Text>
									<Text style={{ fontSize: 21 }}>{comment.feedback.join(' ')}</Text>
									<AirbnbRating
										isDisabled={comment.user.id !== 5}
										count={5}
										defaultRating={comment.rating}
										size={10}
									/>
								</View>
							))
					)}
				</View>
			</ScrollView>

		</ThemeProvider >
	);
}

export default DetailPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		fontSize: 18,
		color: 'red',
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	image: {
		width: '100%',
		height: 200,
		resizeMode: 'contain',
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		marginBottom: 16,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
		marginRight: 8,
		color: 'red',
	},
	discount: {
		fontSize: 15,
		color: 'gray',
	},
	brand: {
		fontSize: 16,
		marginBottom: 8,
	},
	surface: {
		fontSize: 16,
		marginBottom: 16,
	},
	button: {
		backgroundColor: '#007BFF',
		padding: 12,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	favoriteIcon: {
		alignSelf: 'flex-end',
		marginBottom: 8,
	},
	commentsContainer: {
		marginTop: 20,
	},
	commentsHeader: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	comment: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: 30,
	},
	commentUser: {
		fontWeight: 'bold',
		color: '#999999'
	},
	surfaces: {
		height: 80,
		width: 80,
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	surfaceSelected: {
		backgroundColor: '#8f93a9'
	},
});
