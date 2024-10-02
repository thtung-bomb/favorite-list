import { FlatList, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { Link } from 'expo-router';
import CardComponent from '@/components/Card';

export default function TabTwoScreen() {

  const favorite = useSelector((store: RootState) => store.favoriteList.items);

  useEffect(() => {
    console.log("list favorite", favorite);
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={favorite}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable key={item.id}>
            <Link key={item.id} href={{ pathname: `/item/${item.id}` }}>
              <View>
                <CardComponent ArtProduct={item} />
              </View>
            </Link>
          </Pressable>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
