import { toggleFavorite } from '@/redux/features/favoriteSlice';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

interface DialogComponentProps {
	message: string;
	title: string;
	isShowDialog: boolean;
	onHideDialog: () => void;
	item: any
}

const DialogComponent = ({ item, message, isShowDialog, title, onHideDialog }: DialogComponentProps) => {

	const dispatch = useDispatch();
	const handleFavorite = () => {
		dispatch(toggleFavorite(item));
	};

	return (
		<View style={styles.container}>
			<Portal>
				<Dialog visible={isShowDialog} onDismiss={onHideDialog} style={{ backgroundColor: 'white' }}>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Content>
						<Text variant="bodyMedium">{message}</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={onHideDialog} textColor='black'>Cancel</Button>
						<Button onPress={handleFavorite} textColor='red'>
							Sure
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default DialogComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});