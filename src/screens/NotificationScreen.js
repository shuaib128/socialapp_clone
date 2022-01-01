import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Header Components
import HeaderHome from '../components/HeaderComponents/HeaderHome';
//Footer Components
import Footer from '../components/FooterComponents/Footer';

export default function NotificationScreen(props) {
    return (
        <View style={styles.FullView}>
            <HeaderHome />

            <Text>NotificationScreen</Text>

            <Footer
                navigation={props.navigation}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    FullView: {
        position: "relative",
        backgroundColor: "#fff",
        flex: 1,
    }
});