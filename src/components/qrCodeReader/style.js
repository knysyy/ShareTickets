import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#9DD3D9",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrCodeView: {
        padding: 15,
        backgroundColor: 'white'
    },
    textView: {
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 40
    }
});

export const footerFixedButton = {
    buttonStyle: {
        backgroundColor: '#FF513F',
        borderColor: 'transparent',
    }
};