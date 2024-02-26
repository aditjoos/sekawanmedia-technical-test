import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';

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
});

interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface State {
  jsonData: Item[];
}

const Tab = createBottomTabNavigator();

function ProfileScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, color: 'black'}}>Settings</Text>
    </View>
  );
}

class ListScreen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      jsonData: [],
    };
  }

  componentDidMount() {
    // Fetch JSON data from the API
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const jsonData: Item[] = await response.json();
      this.setState({jsonData});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  renderItem = ({item}: {item: Item}) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClick(item)}>
        <View style={styles.listTile}>
          <Text style={styles.listTileTitle}>{item.title}</Text>
          <Text style={styles.listTileSubtitle}>{item.body}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleItemClick = (item: Item) => {
    console.log('Item Clicked:', item);
  };

  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.jsonData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => {
            let iconName;

            if (route.name === 'List') {
              iconName = faHouse;
            } else if (route.name === 'Profile') {
              iconName = faUser;
            }

            return (
              <FontAwesomeIcon icon={iconName} size={size} color={color} />
            );
          },
        })}>
        <Tab.Screen name="List" component={ListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
