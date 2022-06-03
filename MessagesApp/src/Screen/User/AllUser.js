import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {COLORS} from '../../Component/Constant/Color';
import {FONTS} from '../../Component/Constant/Font';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import styles from './styles';

export default function AllUser() {
  const {userData} = useSelector(state => state.User);
  const [search, setsearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBack, setAllUserBack] = useState([]);

  const getAllData = () => {
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', Object.values(snapshot.val()));
        setAllUser(
          Object.values(snapshot.val()).filter(
            index => index.id != userData.id,
          ),
        );
        setAllUserBack(
          Object.values(snapshot.val()).filter(
            index => index.id != userData.id,
          ),
        );
      });
  };

  const searchUser = val => {
    setsearch(val);
    setAllUser(allUserBack.filter(index => index.name.match(val)));
  };

  const createChat = data => {
    database()
      .ref('/chatRoom/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          const chatRoomId = uuid.v4();
          const myDataChat = {
            chatRoomId,
            id: userData.id,
            name: userData.name,
            img: userData.img,
            emailId: userData.emailId,
            lastMessage: '',
          };
          database()
            .ref('/chatRoom/' + data.id + '/' + userData.id)
            .update(myDataChat)
            .then(() => console.log('Data Update: '));

          delete data['password'];
          data.lastMessage = '';
          data.chatRoomId = chatRoomId;

          database()
            .ref('/chatRoom/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data Update: '));

          Navigation.navigate('SingleChat', {dataReceiver: data});
        } else {
          Navigation.navigate('SingleChat', {dataReceiver: snapshot.val()});
        }
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const renderItem = ({item}) => (
    <ListItem
      onPress={() => createChat(item)}
      bottomDivider
      containerStyle={{paddingVertical: 7, marginVertical: 2}}>
      <Avatar
        source={{uri: item.img}}
        rounded
        title={item.name}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.Medium, fontSize: 14}}>
          {item.name}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.containnerSearch}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SearchBar
        placeholder="Search by name..."
        onChangeText={val => searchUser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </View>
  );
}
