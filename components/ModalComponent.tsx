import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import DialogComponent from './DialogComponent';
import { ArtProduct } from '@/models/ArtProduct';

interface ModalComponentProps {
	bodyMessage: string;
	visible: boolean;
	onHideModal: () => void;
	ArtProduct: ArtProduct;
}

const containerStyle = { backgroundColor: 'white', padding: 20 };

function ModalComponent({ bodyMessage, visible, onHideModal, ArtProduct }: ModalComponentProps) {

	const [isShowDialog, setIsShowDialog] = useState(false);

	const onConfirm = () => {
		setIsShowDialog(true);
		onHideModal();
	}

	const handleHideDialog = () => {
		setIsShowDialog(false);
	}

	const toggleColor = () => {
		const message = bodyMessage.toLowerCase();
		if (message.includes('remove') || message.includes('delete')) {
			return { color: 'red' };
		}
		return { color: 'black' };
	}

	useEffect(() => {
		toggleColor();
		console.log(toggleColor());
	}, [bodyMessage])

	return (
		<>
			<View style={styles.container}>
				<Portal>
					<Modal
						style={styles.modal}
						visible={visible}
						onDismiss={onHideModal}
						contentContainerStyle={containerStyle}
					>
						<Pressable onPress={
							onConfirm
						}>
							<Text style={toggleColor()}>
								{bodyMessage}
							</Text>
						</Pressable>
					</Modal>
				</Portal>
			</View>
			<DialogComponent
				title='Removed from Favorites'
				isShowDialog={isShowDialog}
				message='This item has been removed from your favorites list, but you can easily add it back anytime!'
				onHideDialog={handleHideDialog}
				item={ArtProduct}
			/>
		</>
	)
}

export default ModalComponent


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		justifyContent: 'flex-end',
		marginBottom: 0,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		marginHorizontal: 0,
	},
})