import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface FilterProps {
	icon: IconSource,
	label: String,
	isSelected: boolean;
}

const Filter = ({ icon, label, isSelected }: FilterProps) => (
	<Chip
		style={[styles.chipContainer, isSelected ? styles.selectedChip : null]}
		icon={icon}
	>
		{label}
	</Chip >
);

export default Filter;

const styles = StyleSheet.create({
	chipContainer: {
		height: 33,
		backgroundColor: '#e9ecb9',
	},
	selectedChip: {
		backgroundColor: '#d4e157',
		borderColor: '#000',
		borderWidth: 1,
	},
})