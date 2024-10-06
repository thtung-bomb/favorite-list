import { FlatList, Pressable, StyleSheet } from 'react-native';
import * as React from 'react';

import { View } from '@/components/Themed';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { Link } from 'expo-router';
import CardComponent from '@/components/Card';
import { Text } from 'react-native-paper';
import CardFavorite from '@/components/CardFavorite';


export default function TabTwoScreen() {

  const favorite = useSelector((store: RootState) => store.favoriteList.items);
  return (
    <View style={styles.container}>
      {favorite.length > 0 ?
        <FlatList
          data={favorite}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link key={item.id} href={{ pathname: `/item/${item.id}` }}>
              <View>
                <CardFavorite key={item.id} ArtProduct={item} id={item.id} />
              </View>
            </Link>
          )}
        /> : <Text style={{ margin: 10, textAlign: 'center' }} variant="titleLarge">
          Your favorites list is currently empty. Start adding items to your collection!</Text>
      }
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
