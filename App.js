import { useFonts } from 'expo-font';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Audio } from 'expo-av';

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
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
    let text = enterWord.toLowerCase().trim()
    setNewWord(text)
  }

  const getInfo = async () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;
    try {
      const response = await fetch(url)
      const fetchData = await response.json()
      // console.log(fetchData)
      if (response.status === 200) {
        // successfull response
        setData(fetchData);

        let word = fetchData[0]?.word || "no word found";
        setCheckedWord(word);
        
        let def = fetchData[0]?.meanings[0]?.definitions[0]?.definition || "no definitions found";
        setDefinition(def);

        let eg = fetchData[0]?.meanings[0]?.definitions[0]?.example || "no example found"
        setExample(eg);

        // clear any previous error
        setErrors(null);
      } else {
        // api response indicates an error
        setErrors("word not found in the database");

        // Automatically clear the erro after 3 seconds
        setTimeout(() => {setErrors(null), 3000})
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrors("An error occurred while fetching data");
      setTimeout(() => {setErrors(null);}, 3000);
    }
  }
  
  const playAudio = async () => {
    if (data && data[0].phonetics && data[0].phonetics[0] && data[0].phonetics[0].audio) {
      if (sound) {
        await sound.unloadAsync()
      }

      const audioUri = data[0].phonetics[0].audio
      // const audioUriText = data[0].definition[0].definition
      // console.log("from play audio", audioUri)

      const {sound, status} = await Audio.Sound.createAsync({uri: audioUri})

      if (status.isLoaded) {
        setSound(sound);
        await sound.playAsync()
      }
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
              <Text style={{
                color: 'red',
                fontFamily: "PlaypenSans-bold",
                fontSize: 20,
                textDecorationLine: "underline"
              }}>Definintion:</Text> {definition}
            </Text>
            <Text style={styles.resultText}>
              <Text style={{
                color: "blue",
                fontFamily: "PlaypenSans-bold",
                fontSize: 20,
                textDecorationLine: "underline"
              }}
              >Example:</Text> {example}
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