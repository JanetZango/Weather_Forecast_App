import * as React from "react";
import { Image } from "expo-image";
import Logo from "../assets/logo.svg";
import Logo1 from "../assets/logo1.svg";
import Battery from "../assets/battery.svg";
import Wifi from "../assets/wifi.svg";
import Mobilesignal from "../assets/mobile-signal.svg";
import Group3 from "../assets/group3.svg";
import { View, TextInput, Button, Text, FlatList, StyleSheet, TouchableOpacity,Alert, Pressable  } from 'react-native';
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// import MMKVStorage from "react-native-mmkv-storage";


interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}


const SearchSave = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [longitude, setLongitude] = useState<string | number>("");
  const [latitude, setLatitude] = useState<string | number>("");
  const [cityname, setCityName] = useState('');
  const [weatherstatus, setWeatherStatus] = useState('');
  const [humidity, setHumidity] = useState('');
  const [weatherdata, setWeatherData] = useState('');
  const [searchedname, setSearchedName] = useState('');
  const [searchweatherdesription, setSearchedWetherDescription] = useState('');
  const [searchedhumidity, setSearchedHumidity] = useState('');
  const [refreshdata, setrefreshData] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        setLocation(position);
        const getLongitude = position.coords.longitude
        const getLatitude = position.coords.latitude
        const fetchData = async () => {
          const appid = "16ea865e0fb96ed2bbafbef75005c594";
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=${appid}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setCityName(result.name);
            setWeatherStatus(result.weather[0].description);
            setHumidity(result.main.humidity)
            const getcityName = result.name
            console.log(getcityName)
          } catch (err) {
          } finally {
          }
        };
        fetchData();
        const FiveDayForecast = async () => {
          const appid = "16ea865e0fb96ed2bbafbef75005c594";
          // console.log(cityname,getLatitude,"no no")
          try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=midrand&units=metric&cnt=40&appid=${appid}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result.list, "yest")
            const forecastData = result.data.list.slice(0, 40);
            console.log(forecastData)
            setWeatherData(forecastData);
            setWeatherStatus(result.weather[0].description);
            setHumidity(result.main.humidity)
          } catch (err) {
          } finally {
          }
        };
        FiveDayForecast();
      },
      (error) => {
        console.log(error)
        // Alert.alert('Error', error.message);
        // console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const searchCity = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&cnt=10&appid=16ea865e0fb96ed2bbafbef75005c594`
      );
      console.log(response.data.list[0])
      const FavouritCities = response.data.list[0]
      setWeatherData(response.data.list[0]);
      try {
        await AsyncStorage.setItem('FavouritCities', JSON.stringify(FavouritCities));
        console.log('Data saved');
      } catch (error) {
        console.error('Error saving data:', error);
      }

  

    } catch (error) {
      console.error(error);
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('FavouritCities');
      if (value !== null) {
        const user = value != null ? JSON.parse(value) : null;
        // Data is found
        console.log('Retrieved value:', user);
        const searchedname = user.name
        console.log(searchedname)
        const searchedhumidity = user.main.humidity
        const description = user.weather[0].description
        setSearchedName(searchedname)
        setSearchedHumidity(searchedhumidity)
        // searchweatherdesription(description)
        // const showAlert = () => {
          // const showAlert = () => {
            Alert.alert("Hello", "This is an alert");
          // };
        // };
      } else {
        // No value associated with the key
        console.log('No value found for the key');
      }
    } catch (error) {
      console.error('Error reading value:', error);
    }
  };


  useEffect(() => {
    getCurrentLocation();
    getData();

    // searchCity();
    // 
  }, []);
  return (
    <View style={{ padding: 20, backgroundColor: '#4A309F', flex: 1 }}>
      <View>
        <Text style={styles.textFont}>Weather</Text>
        {/* <Icon name="search" size={20} color="#000" style={styles.icon} /> */}
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
          style={{color: 'lightgray'}}
        />
      
           <Pressable 
      onPress={searchCity} 
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#fff' : 'transparent',
        },
        styles.button
      ]}
    >
      <Text style={styles.text}>Press Me</Text>
    </Pressable>
        <View style={styles.card}>
          <Text style={styles.MylocationText}>{searchedname}</Text>
          {/* <Image source={{ uri: iconUrl }} style={styles.icon} /> */}
          <Text style={styles.location}>{cityname}</Text>
          <Text style={styles.location}>{weatherstatus}</Text>
          <Text style={styles.degree}>{searchedhumidity}°</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.MylocationText}>My Location</Text>
          {/* <Image source={{ uri: iconUrl }} style={styles.icon} /> */}
          <Text style={styles.location}>{cityname}</Text>
          <Text style={styles.location}>{weatherstatus}</Text>
          <Text style={styles.degree}>{humidity}°</Text>
        </View>
      </View>



    </View>



  );
};

const styles = StyleSheet.create({
  button:{
    
  },
  clearButton: {
    backgroundColor: 'transparent', // No background
    // borderWidth: 0, // No border
    // padding: 10,
  },
  text: {
    color: 'blue', // Button text color
    fontSize: 16,
  },

  gradient: {
    flex: 1, // Ensure the gradient takes up the whole screen
  },
  MylocationText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#7843A0', // Background color of the card
    borderRadius: 15,
    padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 320,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
    marginTop: 50
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  location: {
    fontSize: 10,
    // fontWeight: 'bold',
    color: '#fff',
  },
  degree: {
    fontSize: 32,
    color: '#fff',
  },

  searchbar: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#000'
  },
  textFont: {
    color: "#fff",
    fontSize: 40
  },
  logoIconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  l15Typo: {
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  seoulTypo: {
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  pmTypo: {
    letterSpacing: 0.2,
    marginTop: -21.5,
    color: Color.colorWhite,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  notAsWarmTypo: {
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
  },
  textTypo: {
    fontWeight: "300",
    fontSize: FontSize.size_34xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  list1Position: {
    width: 335,
    left: "50%",
    position: "absolute",
  },
  rectanglePosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  l151Layout: {
    top: "73.48%",
    height: "17.08%",
    lineHeight: 20,
    fontWeight: "500",
  },
  myLocationPosition: {
    marginLeft: -151.5,
    left: "50%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  l151Position: {
    left: "50%",
    position: "absolute",
  },
  searchBarLayout: {
    width: 325,
    left: "50%",
  },
  rectangleBg: {
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  text3Typo: {
    opacity: 0.5,
    letterSpacing: 0.6,
    fontSize: FontSize.size_lgi,
    height: "59.02%",
    left: "50%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  iconLayout: {
    height: 11,
    position: "absolute",
  },
  logoIcon: {
    right: "52.28%",
    left: "41.33%",
    maxHeight: "100%",
    bottom: "36.83%",
    top: "60.22%",
    maxWidth: "100%",
    position: "absolute",
  },
  logoIcon1: {
    right: "41.35%",
    left: "52.26%",
    maxHeight: "100%",
    bottom: "36.83%",
    top: "60.22%",
    maxWidth: "100%",
    position: "absolute",
  },
  weatherData: {
    // textDecoration: "underline",
  },
  learnMoreAboutContainer: {
    marginTop: 166,
    width: "70.7%",
    left: "11.95%",
    fontSize: 13,
    letterSpacing: 0.5,
    color: Color.colorGray_100,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    lineHeight: 19,
    top: "50%",
    position: "absolute",
  },
  groupIcon: {
    marginTop: -58.5,
    right: "0%",
    height: 117,
    top: "50%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  l15: {
    width: "11.03%",
    left: "83.27%",
    lineHeight: 20,
    marginTop: 27.5,
    color: Color.colorWhite,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  h29: {
    width: "12.55%",
    left: "68.36%",
    lineHeight: 20,
    marginTop: 27.5,
    color: Color.colorWhite,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  seoul: {
    marginTop: -48.5,
    width: "19.09%",
    fontSize: FontSize.size_6xl,
    letterSpacing: -0.2,
    left: "4.79%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    top: "50%",
    position: "absolute",
  },
  pm: {
    width: "6.58%",
    left: "13.73%",
  },
  // text: {
  //   width: "8.06%",
  //   left: "4.79%",
  // },
  group: {
    marginTop: -58.5,
    right: "0%",
    height: 117,
    top: "50%",
  },
  notAsWarm: {
    marginTop: 8.5,
    width: "58.21%",
    left: "4.79%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
    lineHeight: 19,
    fontSize: FontSize.size_base,
    top: "50%",
  },
  text1: {
    marginTop: -54.5,
    width: "24.79%",
    left: "71.64%",
    letterSpacing: 1.6,
    top: "50%",
    position: "absolute",
  },
  list: {
    marginTop: -47,
    width: "76.74%",
    right: "12.79%",
    left: "10.47%",
    height: 117,
    top: "50%",
    position: "absolute",
  },
  groupIcon1: {
    marginLeft: -167.5,
    width: 335,
    left: "50%",
    position: "absolute",
    maxHeight: "100%",
  },
  l151: {
    marginLeft: 111.5,
    width: 37,
    left: "50%",
    position: "absolute",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    top: "73.48%",
  },
  h291: {
    marginLeft: 61.5,
    width: 42,
    left: "50%",
    position: "absolute",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    top: "73.48%",
  },
  partlyCloudy: {
    width: 94,
    top: "73.48%",
    height: "17.08%",
    lineHeight: 20,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
  },
  myLocation: {
    height: "25.62%",
    top: "8.54%",
    width: 137,
    fontWeight: "700",
    letterSpacing: -0.2,
    fontSize: FontSize.size_6xl,
  },
  seongnamSi: {
    top: "32.43%",
    width: 95,
    height: "17.08%",
    marginLeft: -151.5,
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontWeight: "500",
  },
  text2: {
    height: "53.86%",
    marginLeft: 72.5,
    top: "3.45%",
    letterSpacing: 5.6,
    width: 82,
    fontWeight: "300",
    fontSize: FontSize.size_34xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  list1: {
    height: "14%",
    marginLeft: -170,
    top: "26.11%",
    bottom: "59.89%",
  },
  rectangle: {
    marginLeft: -162.5,
    borderRadius: 10,
    opacity: 0.1,
    width: 325,
    left: "50%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  searchForA: {
    marginLeft: -131.2,
    top: "22.95%",
    width: 207,
  },
  text3: {
    marginLeft: -156.8,
    top: "20.61%",
    width: 22,
  },
  searchBar: {
    height: "4.91%",
    marginLeft: -165,
    top: "17.77%",
    bottom: "77.32%",
    position: "absolute",
  },
  weather: {
    top: 92,
    left: 49,
    fontSize: FontSize.size_18xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  text4: {
    top: 52,
    left: 330,
    fontSize: FontSize.size_5xl,
    width: 74,
    fontWeight: "500",
    color: Color.colorWhite,
    position: "absolute",
  },
  groupIcon2: {
    top: -2,
    left: 78,
    width: 0,
    height: 0,
    position: "absolute",
  },
  batteryIcon: {
    right: 0,
    top: 0,
  },
  wifiIcon: {
    right: 29,
    top: 0,
  },
  mobileSignalIcon: {
    right: 50,
    top: 0,
  },
  group1: {
    top: 17,
    right: 15,
    width: 67,
  },
  groupIcon3: {
    top: 12,
    left: 21,
    position: "absolute",
  },
  darkModetrueTypedefault: {
    right: 10,
    left: 0,
    height: 44,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  rectangle1: {
    top: 7,
    left: 121,
    borderRadius: Border.br_15xl,
    width: 134,
    height: 5,
  },
  frame: {
    bottom: 0,
    height: 20,
    overflow: "hidden",
  },
  searchSaveChild: {
    height: "0.06%",
    marginLeft: -183.2,
    top: "69.41%",
    bottom: "30.53%",
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderTopWidth: 0.5,
    width: 336,
    opacity: 0.3,
  },
  searchSave: {
    backgroundColor: "#000",
    flex: 1,
    height: 870,
    overflow: "hidden",
    width: "100%",
  },
});

export default SearchSave;
