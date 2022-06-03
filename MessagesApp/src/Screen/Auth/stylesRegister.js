import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Component/Constant/Color';
import {FONTS} from '../../Component/Constant/Font';

const stylesRegister = StyleSheet.create({
  areaRegister: {flex: 1},
  textRegis: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(50),
  },
  buttonSec: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  icon: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
  },
  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.black,
    paddingLeft: moderateScale(5),
    marginHorizontal: moderateScale(10),
    fontFamily: FONTS.Regular,
  },
  inputContainer: {
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginTop: moderateScale(-20),
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  wrapperinputRegis: {
    flex: 1,
    marginVertical: moderateScale(95),
    paddingVertcal: moderateScale(100),
  },
  smallTxt: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
  login: {
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.white,
    textDecorationLine: 'underline',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.SemiBold,
    fontSize: 14,
    marginTop: 2,
  },
  btn: {
    backgroundColor: COLORS.theme,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperRegisterBtn: {
    paddingHorizontal: 10,
    marginTop: moderateScale(15),
  },
  cardView: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  toLogin: {marginLeft: 4},
  key: {
    padding: moderateScale(20),
  },
});
export default stylesRegister;
