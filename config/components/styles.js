import styled from "styled-components";
import { Dimensions } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;
const windowHeight = Dimensions.get("window").height;

export const Colors = {
  primary: "#ffffff",
  dark: "#020202",
  secondary: "#e5e7eb",
  tertiary: "#1f2937",
  darkLight: "#9ca3af",
  brand: "#66bb6a",
  bgLight: "#b5f69a",
  green: "#10b981",
  red: "#e57373",
  blue: "#1a9eeb",
  subtitle: "#D4B565",
  yellow: "#FFD966",
};

const {
  primary,
  dark,
  secondary,
  tertiary,
  darkLight,
  brand,
  green,
  red,
  blue,
  bgLight,
  subtitle,
  yellow,
} = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  height: ${windowHeight + StatusBarHeight}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  align-self: center;
  padding: ${StatusBarHeight + 50}px 0px 0px 0px;
  background-color: transparent;
`;
export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
`;
export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 0px;
`;
export const SubTitle = styled.Text`
  font-size: 32px;
  margin-bottom: 10px;
  margin-top: 10px
  letter-spacing: 1px;
  font-weight: bold;
  color: ${subtitle};
`;

export const StyledFormArea = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${primary};
  padding: 15px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 50px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  border-radius: 50px;
  margin-vertical: 10px;
  align-items: center;
  height: 60px;

  ${(props) =>
    props.iconButton &&
    `
    
    background-color: ${yellow};
    flex-direction: row;
    justify-content: flex-start;
    border-radius: 20px;
    height: 17%;
    width: 90%;
    elevation: 5;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  font-weight: bold;

  ${(props) =>
    props.iconButton &&
    `
    font-size: 24px;
    font-weight: 200;
    padding: 20px;
    color: ${dark};
  `}
`;

export const MsgBox = styled.Text`
  font-size: 13px;
  text-align: center;
`;

export const SimpleButton = styled.TouchableOpacity`
  padding: 0px;
  justify-content: center;
  align-items: center;
  right: 0px;
`;

export const SimpleButtonText = styled.Text`
  color: ${tertiary};
  font-size: 16px;
  text-align: left;

  ${(props) =>
    props.link == true &&
    `
        color: ${darkLight}
        font-size: 16px;
        padding: 20px 0px 20px 0;
    `}
`;

export const SignOptionsView = styled.View`
  height: 50px;
  margin-top: 10px;
  flex-direction: row;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  font-size: 15px;
  color: ${tertiary};
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const IconContainer = styled.View`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

export const Banner = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const BannerLogo = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
`;

export const BannerTitle = styled.Image`
  height: 100px;
  margin-bottom: 20px;
`;

export const Hamburger = styled.TouchableOpacity`
  align-items: flex-end;
  margin: 15px;
`;

export const DrawerItemView = styled.View`
  background-color: ${brand};
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 10px;
  height: 30px;
  margin-right: 10px;
`;

export const TransparentButton = styled.TouchableOpacity`
  padding: 30px;
  justify-content: center;
  align-items: center;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  width: 100%;
  margin-vertical: 5px;
  background-color: ${yellow};
  elevation: 5;
  border-radius: 20px;
`;

export const ItemText = styled.Text`
  font-size: 18px;
  text-align: left;
  align-self: flex-start;
`;

export const PageHeader = styled.Text`
  font-size: 15px;
  margin-top: 10px
  letter-spacing: 1px;
  font-weight: bold;
  color: ${dark};
  align-self: flex-start;
  padding-left: 30px;
`;

export const Card = styled.View`
  background-color: transparent;
  margin-bottom: 10px;
  width: 100%;
  elevation: 5;
  border-radius: 20px;
  border: 1px;
`;

export const CardText = styled.Text`
  font-size: 20px;
  color: ${dark};
  font-weight: bold;
  text-align: center;
`;

export const CardButton = styled.TouchableOpacity`
  background-color: ${yellow};
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const HistoryBar = styled.View`
  padding: 15px 30px 40px 30px;
  background-color: #f3f2f2;
  height: 30%;
  width: 100%;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  elevation: 5;
  shadow-radius: 8px;
  margin-top: auto;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: transparent;
  align-items: center;
  margin-horizontal: 5px;
  justify-content: space-around;
`;
