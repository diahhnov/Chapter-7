import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../Component/Constant/Color';
import {FONTS} from '../../Component/Constant/Font';

const stylesLogin = StyleSheet.create({
  container: {flex: 1},
  textLogin: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(50),
  },
  containInput: {
    marginBottom: moderateScale(50),
    padding: moderateScale(20),
  },
  unContainInput: {
    marginVertical: moderateScale(10),
    paddingVertical: moderateScale(50),
  },
  wrapperInput: {
    flex: 1,
    marginVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.black,
    fontSize: 18,
    fontFamily: FONTS.Regular,
  },
  buttonSec: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},

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
    marginBottom: 10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.button,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  icon: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  smallTxt: {
    fontSize: moderateScale(15),
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: 0.5,
    textAlign: 'center',
  },
  register: {
    fontSize: moderateScale(15),
    fontFamily: FONTS.Bold,
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
  Login: {
    alignSelf: 'center',
    fontFamily: FONTS.Medium,
    color: COLORS.textInput,
    fontSize: 20,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  wrapperButtom: {
    paddingHorizontal: 10,
    marginTop: moderateScale(15),
  },
  toRegister: {marginLeft: 4},
});
export default stylesLogin;
