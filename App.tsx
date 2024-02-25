import * as React from 'react';
import {
  FlatList,
  // Alert,
  // Animated,
  StyleSheet,
  // TouchableOpacity,
  Text,
  View,
} from 'react-native';
// import {BottomNavigation} from 'reactjs-bottom-navigation';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import Icons from 'react-native-vector-icons/FontAwesome5';
// import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatListContent: {
    flexGrow: 1, // Allow FlatList to grow to fill its parent
  },
  flatList: {
    width: '100%', // Fill the parent's width
  },
});

const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Devina'},
          {key: 'Dana'},
          {key: 'Dominica'},
          {key: 'Jacksona'},
          {key: 'Jamesa'},
          {key: 'Joela'},
          {key: 'Johna'},
          {key: 'Jilliana'},
          {key: 'Jimmya'},
          {key: 'Juliea'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings</Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="List" component={HomeScreen} />
        <Tab.Screen name="Profile" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
