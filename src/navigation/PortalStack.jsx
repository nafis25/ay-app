import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
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
import {useEffect} from 'react';
import {getInitRoute, getLocalAccessToken} from '../requests/TokenHandler';
import AYWhiteLogo from '../../assets/svgs/logos/alteryouth_white.svg';
import {useNavigation} from '@react-navigation/native';
import StudentSwitcher from '../components/StudentSwitcher';
import {usePortal} from '../requests/queries';
import {isEmpty} from '../utils/functions';
import {PortalContext} from '../contexts/PortalContext';
import {useQueryClient} from 'react-query';
import {AuthContext} from '../contexts/AuthContext';

const Drawer = createDrawerNavigator();

const PortalStack = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {
    isLoading: portalLoading,
    isFetching: portalFetching,
    error: portalError,
    data: portalResponse,
  } = usePortal();
  const {setSelectedStudent} = useContext(PortalContext);
  const {isLoggedIn} = useContext(AuthContext);

  const checkInitRoute = async () => {
    try {
      const route = await getInitRoute();
      if (route) navigation.navigate(route);
    } catch (error) {
      console.log('error retrieving initRoute');
      console.error(error);
    }
  };

  const logoutOnError = async () => {
    const token = await getLocalAccessToken();

    if (portalError && (isLoggedIn || token)) {
      await logout();

      queryClient.removeQueries('portal');
    }
  };

  useEffect(() => {
    checkInitRoute();
  }, []);

  useEffect(() => {
    logoutOnError();
  }, [portalError]);

  useEffect(() => {
    if (!portalLoading && !portalFetching)
      if (!isEmpty(portalResponse?.data.students)) {
        //done loading
        setSelectedStudent(portalResponse.data.students[0]); //setting current selected student
      } else setSelectedStudent({});
  }, [portalLoading, portalFetching]);

  if (portalLoading || portalFetching) {
    console.log('activity from portal tabs');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerActiveTintColor: '#1dc468',
        drawerLabelStyle: {fontFamily: 'gilroy'},
      }}>
      <Drawer.Screen
        name="My Scholarships"
        component={PortalTabs}
        options={{
          headerTintColor: '#1dc468',
          headerTitle: () => <AYWhiteLogo width={150} fill={'#1dc468'} />,
          headerRight: () => <StudentSwitcher />,
          headerRightContainerStyle: {marginRight: -25},
        }}
      />

      {/* Others */}
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

      {/* Hidden */}
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
