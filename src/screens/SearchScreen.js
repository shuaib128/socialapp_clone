import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Header Components
import HeaderHome from '../components/HeaderComponents/HeaderHome';
//Footer Components
import Footer from '../components/FooterComponents/Footer';

export default function SearchScreen(props) {
    return (
        <View style={styles.FullView}>
            <HeaderHome />

            <Text>SearchScreen</Text>

            <Footer 
                navigation={props.navigation}
                ProfileItems={props.ProfileItems}
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