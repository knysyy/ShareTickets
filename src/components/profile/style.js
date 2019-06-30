import { StyleSheet } from "react-native";
import * as color from "../style/color";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: color.BACKGROUND_COLOR,
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1
    },
    contentView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});