import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#9DD3D9",
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1
    },
    contentView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        marginVertical: 10,
        fontWeight: '300'
    }
});

export const primaryButtonStyle = {
    buttonStyle: {
        backgroundColor: '#FF513F',
        borderColor: 'transparent',
    }
};

export const secondaryButtonStyle = {
    titleStyle: {
        color: 'white'
    }
};