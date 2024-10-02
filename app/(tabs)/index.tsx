import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ArtProduct } from '@/models/ArtProduct';
import CardComponent from '@/components/Card';
import { api } from '@/config/api';
import Loading from '@/components/loading';

interface TabOneScreenProps {
  ArtProduct: ArtProduct;
}

export default function TabOneScreen() {

  const [products, setProducts] = useState<ArtProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
    <FlatList
      data={products}
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
      numColumns={1}
    />
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginHorizontal: 10,
    gap: 15
  },
  width: {
    width: Dimensions.get('window').width,
  }
});
