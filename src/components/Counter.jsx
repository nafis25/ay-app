import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntD from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const Counter = ({updateQty, small}) => {
  const jamAt = 10;
  const [qty, setQty] = useState(1);
  const [minusBtnActive, setminusBtnActive] = useState();
  const [plusBtnActive, setplusBtnActive] = useState();

  function decrementQty() {
    if (qty > 1) {
      setQty(prev_qty => prev_qty - 1);
      updateQty(prev_qty => prev_qty - 1);
    }
  }

  function incrementQty() {
    if (qty < jamAt) {
      setQty(prev_qty => prev_qty + 1);
      updateQty(prev_qty => prev_qty + 1);
    }
    if (qty == jamAt && jamAt <= 10) {
      Toast.show({
        type: 'error',
        text1: 'Scholarship limit reached ⚠️',
        text2: 'Limit reached for current scholarship session',
      });
    }
  }

  useEffect(() => {
    if (qty > 1 && qty < jamAt) {
      setminusBtnActive(true);
      setplusBtnActive(true);
    } else if (qty === 1) {
      setminusBtnActive(false);
      setplusBtnActive(true);
    } else {
      setminusBtnActive(true);
      setplusBtnActive(false);
    }
  }, [qty, jamAt]);

  return (
    <View className="flex flex-row items-center">
      <Pressable
        onPress={() => decrementQty()}
        className={`${
          minusBtnActive
            ? 'bg-ay-green border-green-700'
            : 'bg-gray-500 border-gray-700'
        } rounded border-2`}>
        <AntD style={{padding: small ? 8 : 12}} name="minus" color={'white'} />
      </Pressable>
      <TextInput
        className={`bg-gray-100 ${
          small ? 'w-8 py-2' : 'w-11 py-3'
        } text-center font-gilroy font-bold text-xs`}
        value={qty.toString()}
        editable={false}
      />
      <Pressable
        onPress={() => incrementQty()}
        className={`${
          plusBtnActive
            ? 'bg-ay-green border-green-700'
            : 'bg-gray-500 border-gray-700'
        } rounded border-2`}>
        <AntD style={{padding: small ? 8 : 12}} name="plus" color={'white'} />
      </Pressable>
    </View>
  );
};

export default Counter;
