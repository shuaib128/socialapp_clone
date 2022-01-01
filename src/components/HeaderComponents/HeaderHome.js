import React from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity

} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"

export default function HeaderHome(props) {
    const iconSizes = 30

    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('All Posts')
                }}
            >
                <Ionicons style={styles.searchIcon} name="camera-outline" size={iconSizes} color="black" />
            </TouchableOpacity>

            <Text style={styles.logo_text}>Instragram</Text>

            <TouchableOpacity
                activeOpacity={.7}
                onPressIn={() => {
                    props.navigation && props.navigation.navigate('All Posts')
                }}
            >
                <Ionicons style={styles.searchIcon} name="paper-plane-outline" size={iconSizes} color="black" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        width: "100%",
        // backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: 1.5,
        zIndex: 2,
    },
    logo_text: {
        fontSize: 22,
        alignSelf: "center",
        fontWeight: 'bold'
    }
});
