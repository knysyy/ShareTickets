import * as color from '../style/color';
import {StyleSheet} from "react-native";

export const commonStyle = StyleSheet.create({
    container: {
        backgroundColor: color.BACKGROUND_COLOR,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingStyle: {
        color: 'white',
        fontSize: 30,
        marginVertical: 10,
        fontWeight: '300'
    }
});

export const primaryButtonStyle = {
    buttonStyle: {
        backgroundColor: color.PRIMARY,
        borderColor: 'transparent',
    }
};

export const secondaryButtonStyle = {
    titleStyle: {
        color: color.SECONDARY
    }
};