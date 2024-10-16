import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, push, set } from 'firebase/database';
import { auth } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Đồ ăn');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Quyền truy cập thư viện ảnh bị từ chối');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !type || !price || !image) {
      Alert.alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }

    const uid = auth.currentUser.uid;
    const productRef = ref(getDatabase(), `products/${uid}`);
    const newProductRef = push(productRef);

    try {
      await set(newProductRef, {
        name,
        type,
        price,
        image,
      });
      Alert.alert('Thêm sản phẩm thành công!');
      setName('');
      setType('Đồ ăn');
      setPrice('');
      setImage(null);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Tên sản phẩm:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>Loại sản phẩm:</Text>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Áo" value="Áo" />
          <Picker.Item label="Quần" value="Quần" />
          <Picker.Item label="Giày" value="Giày" />
          <Picker.Item label="Phụ kiện" value="Phụ kiện" />
        </Picker>
        <Text style={styles.label}>Giá:</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Chọn hình ảnh</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
          <Text style={styles.submitButtonText}>Thêm sản phẩm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: '#e9ecef',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#343a40',
  },
  input: {
    borderWidth: 1,
    borderColor: '#adb5bd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderColor: '#adb5bd',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
