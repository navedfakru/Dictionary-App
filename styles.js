import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F5F5F5",
    padding: 20
  },
  errorText: {
    color: "red",
    fontSize: 23,
    marginTop: 10,
    fontFamily: "PlaypenSans"
  },
  heading: {
    fontFamily: "PlaypenSans-medium",
    fontSize: 30,
    color: "#fff",
    backgroundColor: "#3572EF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset:{width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 18,
    fontFamily: "PlaypenSans"
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    marginLeft: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "PlaypenSans-medium"
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    padding: 20,
    height: '100%'
  },
  word: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "PlaypenSans-bold"
  },
  playButton: {
    backgroundColor: "#2ecc71",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20
  },
  resultTextContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "PlaypenSans-medium"
  },
  clearButton: {
    backgroundColor: "#FF4A4A",
    padding: 15,
    marginTop: 20,
    borderRadius: 10
  }
})

export default styles