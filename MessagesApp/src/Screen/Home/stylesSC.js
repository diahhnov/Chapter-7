import {StyleSheet} from 'react-native';
import {COLORS} from '../../Component/Constant/Color';

const stylesSC = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTextInput: {
    backgroundColor: COLORS.theme,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    justifyContent: 'space-evenly',
  },
  textInput: {
    backgroundColor: COLORS.white,
    width: '80%',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    paddingHorizontal: 15,
    color: COLORS.black,
  },
  iconSend: {
    color: COLORS.white,
    fontSize: 19,
  },
});
export default stylesSC;
