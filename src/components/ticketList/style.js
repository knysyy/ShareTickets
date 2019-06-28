import {StyleSheet} from "react-native";
import * as color from "../style/color";

export const styles = StyleSheet.create({
    dateStyle: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalStyle: {
        backgroundColor: color.BACKGROUND_COLOR,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxStyle: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const buttonStyle = (width) => ({
    buttonStyle: {
        width: width * 0.7,
        backgroundColor: '#FF513F',
        borderColor: 'transparent'
    }
});