import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSiteData} from '../requests/queries';
import {Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {SvgUri} from 'react-native-svg';
import {img_base_url} from '../config';
import {recencyDateFormatter} from '../utils/functions';

const Leaderboard = () => {
  const {data: statResponse, isLoading: statLoading} = useSiteData();

  const [leaderData, setLeaderData] = useState([]);
  const [sliceCount, setSliceCount] = useState(5);
  const [paginateCount, setPaginateCount] = useState(6);

  const handlePaginate = () => {
    if (paginateCount > 0 && paginateCount < 4) {
      setSliceCount(prevSlice => prevSlice + 4);
      setPaginateCount(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    setLeaderData(statResponse?.data.leaderboard.slice(0, sliceCount));
    let canPaginate = Math.ceil(statResponse?.data.leaderboard.length / 5);
    setPaginateCount(canPaginate - 1);
  }, [statLoading]);

  useEffect(() => {
    setLeaderData(statResponse?.data.leaderboard.slice(0, sliceCount));
  }, [sliceCount]);

  if (statLoading) return <Skeleton height={94} />;

  return (
    <View className="flex flex-col gap-4">
      {leaderData?.map((leader, index) => (
        <View
          key={index}
          className="flex flex-row items-center justify-between border border-gray-200 rounded-lg px-5 py-4">
          <View>
            <View className="flex flex-row items-center">
              <View
                className="rounded overflow-hidden mr-1 mb-2"
                style={{height: 17, width: 17}}>
                <SvgUri
                  height={17}
                  width={17}
                  uri={`https://flagicons.lipis.dev/flags/1x1/${leader.country_code.toLowerCase()}.svg`}
                />
              </View>

              <Text className="font-gilroybold mb-2">
                @{leader.invite_code}
              </Text>
            </View>
            <Text className="font-gilroymedium text-gray-400 text-xs">
              Joined {recencyDateFormatter(leader.started_at, 'long')}
            </Text>
          </View>

          <View className="flex flex-row -mr-1">
            {leader.student_imgs
              ?.reverse()
              ?.slice(0, 3)
              ?.map((profile_photo, index) => {
                if (leader.student_imgs.length > 3 && index === 2)
                  return (
                    <View className="flex flex-row -ml-4 bg-gray-200 border-2 border-white h-10 w-10 rounded-full items-center justify-center">
                      <Text className="font-gilroybold text-xs ">
                        +{leader.student_imgs.length - index}
                      </Text>
                    </View>
                  );
                else
                  return (
                    <StyledImage
                      PlaceholderContent={
                        <Skeleton
                          animation="pulse"
                          circle
                          width={40}
                          height={40}
                        />
                      }
                      placeholderStyle={{backgroundColor: '#f5f5f5'}}
                      transition
                      className="h-10 w-10 -ml-4 border-2 border-white rounded-full"
                      source={{
                        uri: img_base_url + profile_photo,
                      }}
                    />
                  );
              })}
          </View>
        </View>
      ))}
      <View className="flex flex-row justify-center mb-2">
        <Pressable onPress={() => handlePaginate()}>
          <Text className="font-gilroybold text-ay-green text-base">
            {paginateCount > 0 ? 'See More' : 'See All'}
          </Text>
        </Pressable>
      </View>

      <View className="bg-ay-green rounded-lg py-6 flex flex-row justify-center">
        <Text className="text-white font-gilroymedium">
          Start your community.{' '}
          <Text className="font-gilroybold underline">Invite a friend</Text>
        </Text>
      </View>
    </View>
  );
};

const CommunitySection = () => {
  return (
    <View className="p-6">
      <Text className="font-gilroybold text-xl mb-5">
        The Scholarship Community
      </Text>
      {/* <Text>CommunitySection</Text> */}
      <Leaderboard />
    </View>
  );
};

const StyledImage = styled(Image);

export default CommunitySection;
