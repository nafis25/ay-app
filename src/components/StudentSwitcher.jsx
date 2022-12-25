import {
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
} from 'react-native';
import React, {memo} from 'react';

import {img_base_url} from '../config';
import {useContext} from 'react';
import {PortalContext} from '../contexts/PortalContext';
import {Image, Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {useRef} from 'react';
import {useState} from 'react';
import {usePortal} from '../requests/queries';

const StudentSwitcher = () => {
  const {data: portalResponse} = usePortal();

  const {
    data: {selected_student},
    setSelectedStudent,
  } = useContext(PortalContext);

  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, w, h, px, py) => {
      setDropdownTop(py + h + 5);
    });
    setVisible(true);
  };

  //   console.log(JSON.stringify(selected_student, null, 2));
  return (
    <Pressable ref={DropdownButton} onPress={toggleDropdown}>
      {visible && (
        <Dropdown
          dropdownTop={dropdownTop}
          setVisible={setVisible}
          setSelectedStudent={setSelectedStudent}
          list={portalResponse?.data.students}
        />
      )}
      <StudentBlip src={selected_student?.details?.profile_thumbnail} />
    </Pressable>
  );
};

const StudentBlip = memo(({src}) => {
  return (
    <StyledImage
      PlaceholderContent={
        <Skeleton animation="pulse" circle width={32} height={32} />
      }
      placeholderStyle={{backgroundColor: '#f5f5f5'}}
      transition
      className="inline-block mr-4 mb-2 h-8 w-8 rounded-full ring-green border-2 border-ay-green"
      source={{
        uri: img_base_url + src,
      }}
    />
  );
});

const Dropdown = ({
  setVisible,
  setSelectedStudent,
  dropdownTop,

  list,
}) => {
  const onItemPress = item => {
    setSelectedStudent(item);
    setVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <Modal transparent animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => setVisible(false)}>
        <View
          className="absolute w-1/2 h-1/5 bg-white shadow rounded"
          style={{top: dropdownTop, right: 15}}>
          <FlatList
            // className="h-20"
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const StyledImage = styled(Image);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default memo(StudentSwitcher);
