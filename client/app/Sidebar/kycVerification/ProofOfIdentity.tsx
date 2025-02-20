import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function ProofOfIdentityScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const router = useRouter();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (selectedDoc && selectedImage) {
      alert('Document uploaded successfully!');
      router.push('/Sidebar/kycVerification/IdCardUpload');
    } else {
      alert('Please select a document type and upload an image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proof of Identity</Text>
      <Text style={styles.subtitle}>Choose the type of document you want to upload.</Text>

      {/* Document Selection */}
      <View style={styles.buttonGroup}>
        {['Passport', 'Driving License', 'Aadhar Card', 'PAN Card'].map((doc) => (
          <TouchableOpacity
            key={doc}
            style={[styles.docButton, selectedDoc === doc && styles.selectedDoc]}
            activeOpacity={0.8}
            onPress={() => setSelectedDoc(doc)}
          >
            <Text style={[styles.docText, selectedDoc === doc && styles.selectedText]}>{doc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={openGallery}>
        <Text style={styles.buttonText}>Upload Document</Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  docButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    margin: 6,
    alignItems: 'center',
  },
  selectedDoc: {
    backgroundColor: '#007BFF',
  },
  docText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  imageContainer: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
