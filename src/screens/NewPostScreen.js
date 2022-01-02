import React, { useState } from 'react'
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity, TextInput, Button
} from 'react-native'
import HeaderHome from '../components/HeaderComponents/HeaderHome';
import Footer from '../components/FooterComponents/Footer';
import ImagePicker from 'react-native-image-crop-picker';
import { BackendServer } from '../components/Api/BackendServer';
import axios from 'axios';


export default function NewPostScreen(props) {
    const profile_image = props.ProfileItems.image
    const [CoverImagePreview, setCoverImagePreview] = useState(null)

    //Post items
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postimage, setPostimage] = useState(null);
    const [coverimage, setCoverimage] = useState(null);
    const Author = props.Username
    const Profile = props.ProfileItems.id

    //Submit Post
    const NewPost = async () => {
        //store and send all data
        URL = `${BackendServer}/mobile/posts/new/post/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        let formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('Author', Author);
        formData.append('Profile', Profile);

        try {
            formData.append('coverImg', coverimage);
        } catch
        {
            console.log('lp');
        }

        try {
            for (const img in postimage) {
                formData.append(`img${img}`, postimage[img].path)
            }
        } catch (error) {
            console.log(error)
        }

        axios
            .post(URL, formData, config)
            .catch((err) => console.log(err));
    }


    //CoverPhoto
    const pickCoverPhoto = () => {
        ImagePicker.openPicker({
        }).then(image => {
            setCoverimage(image.path)
            console.log(image.path);
            setCoverImagePreview(image.path);
        }).catch(err => {
            console.log(err)
        })
    };

    //Post Images Piceker
    const pickPicture = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            setPostimage(images)
        }).catch(err => {
            console.log(err);
        })
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

                <TouchableOpacity onPress={pickCoverPhoto}>
                    <Text>Select coverphoto</Text>
                </TouchableOpacity>

                {CoverImagePreview !== null ?
                    <Image
                        style={styles.profile_image_homepage}
                        source={{
                            uri: CoverImagePreview
                        }}
                    /> :
                    <View></View>
                }

                <TextInput
                    placeholder="User Name"
                    placeholderTextColor="#989898"
                    onChangeText={(text) => {
                        setTitle(text)
                    }}
                />

                <TextInput
                    placeholder="User Name"
                    placeholderTextColor="#989898"
                    onChangeText={(text) => {
                        setDescription(text)
                    }}
                />

                <TouchableOpacity onPress={pickPicture}>
                    <Text>Select Post Images</Text>
                </TouchableOpacity>

                <Button
                    title='Post'
                    onPress={NewPost}
                />
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