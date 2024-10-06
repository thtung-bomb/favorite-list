import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ArtProduct } from '@/models/ArtProduct';
import CardComponent from '@/components/Card';
import { api } from '@/config/api';
import Loading from '@/components/loading';
import Filter from '@/components/chip';
import { brands } from '@/models/Brand';
import SearchBarComponent from '@/components/search';

export default function TabOneScreen() {

  const [products, setProducts] = useState<ArtProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterBrandArt = selectedBrands.length > 0
    ? products.filter(
      (product) =>
        selectedBrands.includes(product.brand) &&
        product.artName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products.filter((product) =>
      product.artName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleBrandSelection = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter((b) => b !== brand);
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('FavoriteList');
      const data = response.data;
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <>
      <View style={styles.searchBar}>
        <SearchBarComponent onSearch={setSearchQuery} />
      </View>
      <FlatList
        data={brands}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleBrandSelection(item.name)}>
            <Filter
              icon=""
              label={item.name}
              isSelected={selectedBrands.includes(item.name)}
            />
          </Pressable>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        numColumns={1}
      />
      <FlatList
        data={filterBrandArt}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable key={item.id}>
            <Link key={item.id} href={{ pathname: `/item/${item.id}` }}>
              <View style={styles.width}>
                <CardComponent ArtProduct={item} />
              </View>
            </Link>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginHorizontal: 'auto',
    gap: 15
  },
  width: {
    width: Dimensions.get('window').width,
  },
  filterList: {
    display: 'flex',
    margin: 'auto',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 0,
  },
  searchBar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  }
});
