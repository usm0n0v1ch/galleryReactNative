import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Alert, TextInput, Button, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/The_American_Museum_journal_%28c1900-%281918%29%29_%2818160717405%29.jpg/225px-The_American_Museum_journal_%28c1900-%281918%29%29_%2818160717405%29.jpg";
  
  const [photos, setPhotos] = useState([
    { id: 1, src: src },
    { id: 2, src: src },
    { id: 3, src: src },

  ]);

  const [newPhotoUrl, setNewPhotoUrl] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleAddPhoto = () => {
    if (newPhotoUrl) {
     
      setIsLoading(true);

 
      setTimeout(() => {
        const newId = photos.length ? photos[photos.length - 1].id + 1 : 1; 
        setPhotos((prevPhotos) => [{ id: newId, src: newPhotoUrl }, ...prevPhotos]); 
        setNewPhotoUrl(""); 
        setIsLoading(false); 
      }, 10000); 
    }
  };

  const handleDelete = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const showDeleteAlert = (id) => {
    Alert.alert(
      "Удалить фото?",
      "Вы уверены, что хотите удалить это фото?",
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => handleDelete(id),
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Photos</Text>
        </View>

        <View style={styles.addPhotoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Вставьте URL фото"
            value={newPhotoUrl}
            onChangeText={setNewPhotoUrl} 
          />
          <Button title="Добавить фото" onPress={handleAddPhoto} />
        </View>


        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            {photos.map((photo) => (
              <TouchableHighlight 
                key={photo.id}
                onLongPress={() => showDeleteAlert(photo.id)}
              >
                <Image
                  source={{ uri: photo.src }}
                  style={styles.image}
                />
              </TouchableHighlight>
            ))}
          </ScrollView>
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 80, 
  },
  image: {
    width: 100,
    height: 100,
    margin: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    margin: 20,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  addPhotoContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
    backgroundColor:'black',
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
