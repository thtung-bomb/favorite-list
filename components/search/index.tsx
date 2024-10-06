import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarComponentProps {
	onSearch: (query: string) => void;
}

const SearchBarComponent = ({ onSearch }: SearchBarComponentProps) => {
	const [searchQuery, setSearchQuery] = React.useState('');

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
		onSearch(query);
	}

	return (
		<Searchbar
			placeholder="Find Art"
			onChangeText={onChangeSearch}
			value={searchQuery}
		/>
	);
};

export default SearchBarComponent;