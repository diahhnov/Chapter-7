import {StyleSheet} from 'react-native';
import {COLORS} from '../../Component/Constant/Color';

const stylesHome = StyleSheet.create({
  iconUsers: {color: COLORS.white, fontSize: 15},
  allUser: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  containerHome: {flex: 1, backgroundColor: COLORS.white},
});
export default stylesHome;
