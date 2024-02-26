import React, {useState, useEffect, useCallback} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Button,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {IMAGENAME} from '../MyTestApp/src/image/index';

const styles = StyleSheet.create({
  listTile: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listTileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listTileSubtitle: {
    color: 'black',
  },
  postContainer: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  postDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  postDetailSubtitle: {
    fontSize: 18,
    color: 'black',
  },
  imageStyle: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  profileTexts: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PostList = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostComments', {item})}>
      <View style={styles.listTile}>
        <Text style={styles.listTileTitle}>{item.title}</Text>
        <Text style={styles.listTileSubtitle}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const PostComments = ({route}) => {
  const {item} = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + item.id + '/comments')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, [item.id]);

  const renderItem = ({item}) => (
    <View style={styles.listTile}>
      <Text style={styles.listTileTitle}>{item.name}</Text>
      <Text style={styles.listTileSubtitle}>{item.email}</Text>
      <Text style={styles.listTileSubtitle}>{item.body}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.postContainer}>
        <Text style={styles.postDetailTitle}>{item.title}</Text>
        <Text style={styles.postDetailSubtitle}>{item.body}</Text>
      </View>
      <Text style={{color: 'black', padding: 10}}>Comments:</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item2 => item2.id.toString()}
      />
    </View>
  );
};

function PostsScreen() {
  return (
    <Stack.Navigator initialRouteName="PostList">
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="PostComments" component={PostComments} />
    </Stack.Navigator>
  );
}

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Exception to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

function ProfileScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{paddingLeft: 10, paddingRight: 10}}>
      <ScrollView>
        <Image source={IMAGENAME} style={styles.imageStyle} />
        <Text style={styles.profileTexts}>
          Perkenalkan nama saya Bagus Aditama Pramana Putra, panggil saya Adit.
          Saya adalah seorang spesialis pengembangan aplikasi perangkat mobile
          menggunakan Flutter.
        </Text>
        <Text style={styles.profileTexts}>Links:</Text>
        <View style={{marginBottom: 10}}>
          <OpenURLButton url="https://aditjoos.github.io">
            Website Portofolio
          </OpenURLButton>
        </View>
        <View style={{marginBottom: 10}}>
          <OpenURLButton url="https://github.com/aditjoos">
            GitHub
          </OpenURLButton>
        </View>
        <View style={{marginBottom: 10}}>
          <OpenURLButton url="https://instagram.com/aditjoos_">
            instagram
          </OpenURLButton>
        </View>
        <Text style={styles.profileTexts}>
          Aplikasi ini merupakan syarat untuk menyelesaikan tahap technical Test pada lowongan posisi Mobile Developer di Sekawan Media.
        </Text>
        <Text style={styles.profileTexts}>
          Source Code aplikasi ini tersedia di:
        </Text>
        <View style={{marginBottom: 10}}>
          <OpenURLButton url="https://github.com/aditjoos/sekawanmedia-technical-test">
            GitHub Repository
          </OpenURLButton>
        </View>
      </ScrollView>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => {
            let iconName;

            if (route.name === 'Posts') {
              iconName = faHouse;
            } else if (route.name === 'Profile') {
              iconName = faUser;
            }

            return (
              <FontAwesomeIcon icon={iconName} size={size} color={color} />
            );
          },
        })}>
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
