import {View, Text, Pressable, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntD from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const Counter = ({updateQty}) => {
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
    <>
      <View className="flex flex-row items-center">
        <Pressable
          onPress={() => decrementQty()}
          className={`p-3 ${
            minusBtnActive
              ? 'bg-ay-green border-green-700'
              : 'bg-gray-500 border-gray-700'
          } rounded border-2`}>
          <AntD name="minus" color={'white'} />
        </Pressable>
        <TextInput
          className="bg-gray-100 w-11 py-3 text-center font-gilroy font-bold"
          value={qty.toString()}
          editable={false}
        />
        <Pressable
          onPress={() => incrementQty()}
          className={`p-3 ${
            plusBtnActive
              ? 'bg-ay-green border-green-700'
              : 'bg-gray-500 border-gray-700'
          } rounded border-2`}>
          <AntD name="plus" color={'white'} />
        </Pressable>
      </View>
    </>
  );
};

export default Counter;
