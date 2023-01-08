import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNotifications, usePortal} from '../requests/queries';
import {Flow} from 'react-native-animated-spinkit';
import {isEmpty, recencyDateFormatter} from '../utils/functions';
import {Badge} from '@rneui/base';
import {ScrollView as RNScrollView} from 'react-native';
import {updateNotifications} from '../requests/PortalRequests';
import {useContext} from 'react';
import {PortalContext} from '../contexts/PortalContext';
import {styled} from 'nativewind';

const Notifications = ({navigation}) => {
  const {
    data: nootyResponse,
    isLoading: nootyLoading,
    isFetching: nootyFetching,
    refetch,
  } = useNotifications();

  const {data: portalResponse} = usePortal();

  const {setSelectedStudent} = useContext(PortalContext);

  const handleNotification = notification => {
    const navMap = new Map([
      ['1', 'Home'],
      ['2', 'Student'],
      ['3', 'Scholarship'],
      ['4', 'School'],
      ['5', 'Payment'],
    ]);

    try {
      const nooty = JSON.parse(notification.payload);

      if (nooty.id) {
        let student = portalResponse?.data.students.find(
          student => student.id === nooty.id,
        );

        setSelectedStudent(student);
      }

      if (!notification.is_seen) {
        updateNotifications({id: notification.id, is_seen: true});
        refetch();
      }

      navigation.navigate('My Scholarships', {screen: navMap.get(nooty.step)});
    } catch (error) {
      console.error('error parsing notification payload');
    }
  };

  if (nootyLoading || nootyFetching)
    return (
      <View className="flex-1 justify-center items-center bg-white h-screen">
        <Flow color="#1dc468" size={38} />
      </View>
    );

  return (
    <ScrollView className="bg-white" contentContainerStyle="px-6 py-5">
      {isEmpty(nootyResponse?.data) ? (
        <Text className="fw-bold">No notifications to show</Text>
      ) : (
        <View className="flex flex-col-reverse gap-4">
          {nootyResponse?.data.map((notification, index) => (
            <Pressable
              key={index}
              onPress={() => handleNotification(notification)}
              className="rounded-lg border border-gray-200 px-5 py-6">
              <Text
                className={`${
                  notification.is_seen ? 'text-gray-400' : 'text-current'
                } font-gilroybold mb-2`}>
                {notification.title}
                {!notification.is_seen && (
                  <Badge
                    containerStyle={{marginLeft: 5, marginBottom: 1}}
                    badgeStyle={{backgroundColor: '#1dc468'}}
                  />
                )}
              </Text>
              <Text
                className={`${
                  notification.is_seen ? 'text-gray-400' : 'text-current'
                } font-gilroymedium mb-4 leading-5`}>
                {notification.body}
              </Text>

              <Text
                className={
                  notification.is_seen
                    ? 'text-gray-400 font-gilroymedium'
                    : 'text-ay-green font-gilroybold'
                }>
                {recencyDateFormatter(notification.created_at, 'nooty')}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const ScrollView = styled(RNScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

export default Notifications;
