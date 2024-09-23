import { useFonts } from 'expo-font';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Audio } from 'expo-av';

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("success");
  const [definition, setDefinition] = useState("The achievement of one's aim or goal.");
  const [example, setExample] = useState("His third attempt to pass the entrance exam was a success.");
  const [sound, setSound] = useState();
  const [data, setData] = useState();
  const [error, setErrors] = useState(null);

  const [loaded, errors] = useFonts({
    'PlaypenSans': require('./assets/fonts/PlaypenSans-Regular.ttf'),
    'PlaypenSans-medium': require('./assets/fonts/PlaypenSans-Medium.ttf'),
    'PlaypenSans-bold': require('./assets/fonts/PlaypenSans-Bold.ttf'),
    'PlaypenSans-light': require('./assets/fonts/PlaypenSans-ExtraLight.ttf'),
  });

  const searchWord = (enterWord) => {
    setNewWord(enterWord)
  }

  const getInfo = async () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;
    const response = await fetch(url)
    const fetchData = await response.json()
    console.log(response)
  }
  
  const playAudio = async () => {
    const audioUri = "https://api.dictionaryapi.dev/media/pronunciations/en/success-us.mp3"

    const {sound, status} = await Audio.Sound.createAsync({uri: audioUri})
    if (status.isLoaded) {
      setSound(sound)
      await sound.playAsync()
    }
  }

  const clear = async () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
    if(sound) {
      await sound.unloadAsync()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dictionary App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search...'
          onChangeText={(text) => searchWord(text)}
         />
        <TouchableOpacity 
          style={styles.button}
          onPress={() => getInfo()}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text>{newWord}</Text>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {checkedWord && !error && (
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.word}>{checkedWord}</Text>
          <TouchableOpacity 
          style={styles.playButton}
          onPress={() => playAudio()}
          >
            <AntDesign name="sound" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.resultTextContainer}>
            <Text style={styles.resultText}>
              Definintion: {definition}
            </Text>
            <Text style={styles.resultText}>
              Example: {example}
            </Text>
          </View>
        </ScrollView>)}
        <TouchableOpacity
        style={styles.clearButton}
        onPress={() => clear()}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
    </View>
  );
}