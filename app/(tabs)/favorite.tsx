import { Button, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import { View } from '@/components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Link } from 'expo-router';
import { Checkbox, Text } from 'react-native-paper';
import CardFavorite from '@/components/CardFavorite';
import { removeAllFavorites, toggleFavorite } from '@/redux/features/favoriteSlice';
import { Dialog, Portal } from 'react-native-paper';

type actionModal = 'REMOVE_ALL' | 'REMOVE_SELECTED';



export default function TabTwoScreen() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const favorite = useSelector((store: RootState) => store.favoriteList.items);
  const dispatch = useDispatch();
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [actionModal, setActionModal] = useState<actionModal | null>(null);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const onConfirm = () => {
    switch (actionModal) {
      case 'REMOVE_ALL':
        handleRemoveAll();
        break;
      case 'REMOVE_SELECTED':
        handleRemoveSelected();
        break;
      default:
        setIsShowDialog(false);
    }
  }

  const handleHideDialog = () => {
    setIsShowDialog(false);
  }

  const oncancel = () => {
    setIsShowDialog(false);
  }

  const handleCheckboxToggle = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleCheckAll = () => {
    setIsCheckAll(true);
    if (selectedItems.length === favorite.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(favorite.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((id) => {
      const item = favorite.find((product) => product.id === id);
      if (item) {
        dispatch(toggleFavorite(item));  // Pass the ArtProduct object
      }
    });
    setSelectedItems([]); // Clear selection after removal
    setIsShowDialog(false);
  };

  // Remove all items
  const handleRemoveAll = () => {
    dispatch(removeAllFavorites());
    setIsShowDialog(false);
  };

  return (
    <View style={styles.container}>
      {favorite.length > 0 ?
        (
          <>
            {selectedItems.length > 0 ?
              <View>
                <Button
                  title="Remove"
                  color='red'
                  onPress={() => { setActionModal('REMOVE_SELECTED'); setIsShowDialog(true) }}
                  disabled={selectedItems.length === 0}
                />

                {/* <Button
                  color='red'
                  disabled={selectedItems.length === 0}
                  title="Remove All"
                  onPress={() => { setActionModal('REMOVE_ALL'); setIsShowDialog(true) }}
                /> */}
              </View> : ''}

            <Text>Selected ({selectedItems.length})</Text>
            {
              selectedItems.length > 0 ? (
                <Checkbox
                  status={selectedItems.length === favorite.length ? 'checked' : 'unchecked'}
                  onPress={handleCheckAll}
                />
              ) : ''
            }
            <FlatList
              data={favorite}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Link key={item.id} href={{ pathname: `/item/${item.id}` }}>
                  <View>
                    <Text>
                      {selectedItems.length > 0 && (
                        <Checkbox
                          status={selectedItems.includes(item.id) ? 'checked' : 'unchecked'}
                          onPress={() => handleCheckboxToggle(item.id)}
                        />
                      )}
                    </Text>
                    <CardFavorite key={item.id} ArtProduct={item} id={item.id} setToggleCheckbox={handleCheckboxToggle} />
                  </View>
                </Link>
              )}
            />
          </>
        )
        :
        <Text style={{ margin: 10, textAlign: 'center' }} variant="titleLarge">
          Your favorites list is currently empty. Start adding items to your collection!
        </Text>
      }

      <Portal>
        <Dialog visible={isShowDialog} onDismiss={handleHideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={oncancel} title='Cancel' />
            <Button onPress={onConfirm} title='Sure' />
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
