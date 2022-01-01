import React from 'react'
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity
} from 'react-native'
import HeaderHome from '../components/HeaderComponents/HeaderHome';
import Footer from '../components/FooterComponents/Footer';
import ImagePicker from 'react-native-image-crop-picker';
import { BackendServer } from '../components/Api/BackendServer';


export default function NewPostScreen(props) {
    const profile_image = props.ProfileItems.image

    const pickPicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true
        }).then(image => {
            console.log(image);
        });
    };


    return (
        <View style={styles.FullView}>
            <HeaderHome />

            <View style={styles.add_post_view}>
                <View style={styles.addPostField}>
                    <Image
                        source={{
                            uri: BackendServer + profile_image
                        }}
                        style={styles.profile_image_homepage}
                    />
                </View>

                <TouchableOpacity onPress={pickPicture}>
                    <Text>Select CoverPhoto</Text>
                </TouchableOpacity>

            </View>

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
    },
    add_post_view: {
        marginTop: 17
    },
    addPostField: {
        paddingHorizontal: 20
    },
    profile_image_homepage: {
        width: 50,
        height: 50,
        borderRadius: 100
    }
});