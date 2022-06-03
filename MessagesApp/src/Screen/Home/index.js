import {Container, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {COLORS} from '../../Component/Constant/Color';
import {FONTS} from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import Navigation from '../../Service/Navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import stylesHome from './stylesHome';

export default function Home() {
  const {userData} = useSelector(state => state.User);
  const [chatRoom, setChatRoom] = useState([]);

  useEffect(() => {
    getChatRoom();
  }, []);

  const getChatRoom = async () => {
    database()
      .ref('/chatRoom/' + userData?.id)
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setChatRoom(Object.values(snapshot.val()));
        }
      });
  };

  const renderItem = ({item}) => (
    <ListItem
      containerStyle={{
        paddingVertical: 8,
        marginVertical: 0,
      }}
      onPress={() => Navigation.navigate('SingleChat', {dataReceiver: item})}>
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
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 12}}
          numberOfLines={1}>
          {item.lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={stylesHome.containerHome}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatRoom}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={stylesHome.allUser}
        onPress={() => Navigation.navigate('AllUser')}>
        <Icon name="users" as={FontAwesome} style={stylesHome.iconUsers} />
      </TouchableOpacity>
    </View>
  );
}
