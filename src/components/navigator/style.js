export const theme = width => ({
    Input: {
        containerStyle: {
            width: width - 50,
        },
        inputContainerStyle: {
            borderRadius: 40,
            borderWidth: 1,
            borderColor: 'rgba(110, 110, 110, 1)',
            height: 50,
            marginVertical: 10
        },
        placeholderTextColor: 'rgba(110, 110, 110, 1)',
        inputStyle: {
            marginLeft: 10,
            color: 'white'
        },
        keyboardAppearance: 'light',
        blurOnSubmit: false
    },
    Button: {
        containerStyle: {
            width: width - 80
        },
        buttonStyle: {
            borderRadius: 40,
            marginVertical: 10
        }
    }
});

export const headerStyle = {
    title: 'ShareTickets',
    headerStyle: {
        backgroundColor: '#234D51'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        color: '#ffffff',
        textAlign: 'center',
        flex: 1
    }
};