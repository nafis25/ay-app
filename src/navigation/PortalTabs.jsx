import {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  HomeScreen,
  PaymentScreen,
  ScholarshipsScreen,
  SchoolScreen,
  StudentScreen,
} from '../screens';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {usePortal} from '../requests/queries';
import {PortalContext} from '../contexts/PortalContext';
import {isEmpty} from '../utils/functions';

const Tab = createMaterialTopTabNavigator();

const PortalTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        // animationEnabled: false,

        tabBarIndicatorStyle: {
          position: 'absolute',
          top: 0,
          height: 2,
          backgroundColor: '#1dc468',
          width: 40,
          left: (Dimensions.get('window').width / 5 - 40) / 2,
        },
        // tabBarStyle: {paddingBottom: 30},
        tabBarIconStyle: {
          // borderWidth: 1,
          // borderColor: 'green',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 20,
          minWidth: 30,
        },
        tabBarItemStyle: {
          // borderWidth: 1,
          // borderColor: 'yellow',
          padding: 0,
          margin: 0,
        },
        tabBarLabelStyle: {
          // borderWidth: 1,
          fontFamily: 'gilroy-semibold',
          fontSize: 9,
        },
        tabBarActiveTintColor: '#1dc468',
        tabBarInactiveTintColor: '#d2d2d2',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Student"
        component={StudentScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="id-card-alt" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Scholarships"
        component={ScholarshipsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="graduation-cap" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="School"
        component={SchoolScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="school" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="bank" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PortalTabs;
