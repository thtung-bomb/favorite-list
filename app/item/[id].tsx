import { useColorScheme } from '@/components/useColorScheme.web';
import { api } from '@/config/api';
import { ArtProduct } from '@/models/ArtProduct';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, toggleFavorite } from '@/redux/features/favoriteSlice';
import { RootState } from '@/redux/store';


function DetailPage() {
	const colorScheme = useColorScheme();
	const [item, setItem] = useState<ArtProduct | null>();
	const [loading, setLoading] = useState(false);
	// const [isFavorite, setIsFavorite] = useState(false);
	const navigation = useNavigation();

	const dispatch = useDispatch();

	const isFavorite = useSelector((state: RootState) => {
		return state.favoriteList.items.some((check) => check.id === item?.id);
	})

	const handleAddtoFavoriteList = () => {
		dispatch(toggleFavorite(item));
	}

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
			title: item ? item.id : 'Loading...', // Set the header title
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

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<View style={styles.container}>
				<Text style={styles.header}>{item.artName}</Text>
				<Image source={{ uri: item.image }} style={styles.image} />
				<Text style={styles.description}>{item.description}</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>${item.price}</Text>
					{item.limitedTimeDeal > 0 && (
						<Text style={styles.discount}>-${(item.price).toFixed(2)} (Save {item.limitedTimeDeal * 100}%)</Text>
					)}
				</View>
				<Text style={styles.brand}>Brand: {item.brand}</Text>
				<Text style={styles.surface}>{item.glassSurface ? 'Suitable for glass surface' : 'Unsuitable for glass surface'}</Text>
				<Ionicons
					style={styles.favoriteIcon}
					name={isFavorite ? 'heart' : 'heart-outline'}
					size={24}
					color="red"
					onPress={() => { handleFavorite() }}
				/>
			</View>
		</ThemeProvider>
	);
}

export default DetailPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
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
	},
	discount: {
		fontSize: 14,
		color: 'red',
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
});
