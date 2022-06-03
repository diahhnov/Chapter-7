import {Icon} from 'native-base';
import React, {useEffect} from 'react';
import {View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import MsgComponent from '../../Component/Chat/MsgComponent';
import {COLORS} from '../../Component/Constant/Color';
import ChatHeader from '../../Component/Header/ChatHeader';
import MaterialIcons from 'react-native-vector-icons//MaterialIcons';
import moment from 'moment';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import stylesSC from './stylesSC';

export default function SingleChat(props) {
  const {userData} = useSelector(state => state.User);
  const {dataReceiver} = props.route.params;

  console.log('Data: ', dataReceiver);

  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + dataReceiver.chatRoomId)
      .on('child_added', snapshot => {
        setallChat(state => [snapshot.val(), ...state]);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref('/messages' + dataReceiver.chatRoomId)
        .off('child_added', onChildAdd);
  }, [dataReceiver.chatRoomId]);

  const msgValid = text => text && text.replace(/\s/g, '').length;

  const sndMessage = () => {
    if (msg == '' || msgValid(msg) == 0) {
      SimpleToast.show('texting something...');
      return false;
    }
    setdisabled(true);
    const chatData = {
      chatRoomId: dataReceiver.chatRoomId,
      message: msg,
      from: userData?.id,
      to: dataReceiver.id,
      sendTime: moment().format(''),
      messageType: 'text',
    };
    const newReference = database()
      .ref('/messages/' + dataReceiver.chatRoomId)
      .push();
    chatData.id = newReference.key;
    newReference.set(chatData).then(() => {
      const chatRoomIdUpdate = {
        lastMessage: msg,
        sendTime: chatData.sendTime,
      };
      database()
        .ref('/chatRoom/' + dataReceiver?.id + '/' + userData?.id)
        .update(chatRoomIdUpdate)
        .then(() => console.log('Data Update: ', chatData));
      console.log("'/chatRoom/' + userData?.id + '/' + data?.id", dataReceiver);
      database()
        .ref('/chatRoom/' + userData?.id + '/' + dataReceiver?.id)
        .update(chatRoomIdUpdate)
        .then(() => console.log('Data Update: ', chatRoomIdUpdate));

      setMsg('');
      setdisabled(false);
    });
  };

  return (
    <View style={stylesSC.container}>
      <ChatHeader data={dataReceiver} />
      <FlatList
        style={{flex: 1}}
        data={allChat}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        inverted
        renderItem={({item}) => {
          return <MsgComponent sender={item.from == userData.id} item={item} />;
        }}
      />

      <View style={stylesSC.containerTextInput}>
        <TextInput
          style={stylesSC.textInput}
          placeholder="type a message"
          placeholderTextColor={COLORS.black}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />

        <TouchableOpacity disabled={disabled} onPress={sndMessage}>
          <Icon style={stylesSC.iconSend} name="send" as={MaterialIcons} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
