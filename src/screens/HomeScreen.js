import React from 'react'
import { View, StyleSheet } from 'react-native'
import Post from '../components/HomeComponents/Post'
import HeaderHome from '../components/HeaderComponents/HeaderHome'
import Footer from '../components/FooterComponents/Footer'

export default function HomeScreen(props) {
    return (
        <View style={styles.FullView}>
            <HeaderHome />
            <Post
                navigation={props.navigation}
            />
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