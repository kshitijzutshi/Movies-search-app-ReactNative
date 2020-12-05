import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';

export default function App() {
  const apiURL = "http://www.omdbapi.com/?apikey=82f423db";
  const [state, setState] = useState({
    s: "Enter a movie..",
    results: [],
    selected: {}
  })

  const search = () => {
    axios(apiURL + "&s=" + state.s).then( ({data}) => {
      let results = data.Search
      setState(prevState => {
        return { ...prevState, results: results}
      })
    })
  }
// tt2975590
  const openPopup = (id) => {
    axios(apiURL + "&i=" + id).then( ({data}) => {
      let result = data
      console.log(result);
      setState(prevState => {
        return { ...prevState, selected: result}
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieDB Search</Text>
      <TextInput
      style={styles.searchBox}
      onChangeText= { text => setState(prevState => {
        return {...prevState, s: text}
      })}
      onSubmitEditing={search}
      value={state.s}
      />
      <ScrollView styles = {styles.results}>
      
      {state.results.map(result => {
        return(
          <TouchableHighlight key={result.imdbID} onPress={() => openPopup(result.imdbID)}>
            <View style={styles.result}>
              <Image source={{ uri: result.Poster}} style={{ width: '100%', height: 300}} resizeMode="cover" />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        
        )
      })}
      </ScrollView>
      <Modal animationType="fade" transparent={false} visible={(typeof state.selected.Title != "undefined")}>
        <View style={styles.popup}>
        <Text style={styles.poptitle}>{state.selected.Title}</Text>
        <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
        <Text>{state.selected.Plot}</Text>
        </View>
        
        <TouchableHighlight onPress={() => setState(prevState => {
          return {...prevState, selected: {}}
        })}>
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>

      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    textAlign: "center",
    fontWeight: '700',
    marginBottom: 20,
    width: "100%"
  },
  searchBox:{
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20
  },
  heading: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  popup: {
    padding: 20
  },
  poptitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  closeBtn: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: "#2484C4",
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    width: '100%'
  }
});




// import React, { useState } from "react";
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View
// } from "react-native";

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>

//             <TouchableHighlight
//               style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>

//       <TouchableHighlight
//         style={styles.openButton}
//         onPress={() => {
//           setModalVisible(true);
//         }}
//       >
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5
//   },
//   openButton: {
//     backgroundColor: "#F194FF",
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   }
// });

// export default App;