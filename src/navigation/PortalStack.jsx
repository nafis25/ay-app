import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  AboutScreen,
  CheckoutScreen,
  CongoScreen,
  NotificationsScreen,
  SaveBkashScreen,
  SettingsScreen,
  SupportScreen,
} from '../screens';
import PortalTabs from './PortalTabs';
import Menu from '../components/Menu';
import {useState, useEffect} from 'react';
import {getInitRoute} from '../requests/TokenHandler';
import AYWhiteLogo from '../../assets/svgs/logos/alteryouth_white.svg';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const PortalStack = () => {
  const navigation = useNavigation();
  const checkInitRoute = async () => {
    try {
      const route = await getInitRoute();
      navigation.navigate(route ?? 'My Scholarships');
    } catch (error) {
      console.log('error retrieving initRoute');
      console.error(error);
    }
  };

  useEffect(() => {
    checkInitRoute();
  }, []);

  //   useEffect(async () => {
  //     if (portalError && (isLoggedIn || getLocalAccessToken())) {
  //        await logout();

  //        queryClient.removeQueries("portal");

  //        router.replace(
  //           {
  //              pathname: "/login",
  //              query: { loadportal: "failed" },
  //           },
  //           "/login"
  //        );
  //     }
  //  }, [portalError]);

  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerHideStatusBarOnOpen: true,
        drawerActiveTintColor: '#1dc468',
        drawerLabelStyle: {fontFamily: 'gilroy'},
      }}>
      <Drawer.Screen
        name="My Scholarships"
        component={PortalTabs}
        options={{
          headerTintColor: '#1dc468',
          headerTitle: () => <AYWhiteLogo width={150} fill={'#1dc468'} />,
        }}
      />

      <Drawer.Group
        screenOptions={{
          headerTintColor: '#1dc468',
          headerTitleStyle: {
            fontFamily: 'gilroy-bold',
            color: 'black',
            paddingTop: 2,
          },
        }}>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
      </Drawer.Group>

      <Drawer.Group
        screenOptions={{
          swipeEnabled: true,
          headerLeft: () => null,
          headerTitle: () => <AYWhiteLogo width={150} fill={'#1dc468'} />,
          // drawerItemStyle: {display: 'none'},
        }}>
        <Drawer.Screen name="Checkout" component={CheckoutScreen} />
        <Drawer.Screen name="Congratulations" component={CongoScreen} />
        <Drawer.Screen name="SaveBkash" component={SaveBkashScreen} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default PortalStack;
