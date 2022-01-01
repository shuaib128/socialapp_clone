import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, 
    TouchableOpacity, ScrollView
} from 'react-native'
import jwt_decode from "jwt-decode";
import { BackendServer } from '../components/Api/BackendServer';
import ProfilePosts from '../components/ProfilePageComponents/ProfilePosts';

//Header Components
import HeaderHome from '../components/HeaderComponents/HeaderHome';
//Footer Components
import Footer from '../components/FooterComponents/Footer';

export default function ProfileScreen(props) {
    const [PostNum, setPostNum] = useState(0)
    const content_decoded = jwt_decode(props.AuthToken)
    const profile_image = props.ProfileItems.image

    return (
        <View style={styles.FullView}>
            <HeaderHome />

            <ScrollView>
                <View style={styles.profile_up}>
                    <Image 
                        source={{
                            uri: BackendServer + profile_image
                        }}
                        style={styles.profile_image_homepage}
                    />

                    <View style={styles.profile_des_edit}>
                        <Text style={styles.profile_des_name}>
                            {props.ProfileItems && props.ProfileItems.first_name}
                        </Text>

                        <TouchableOpacity
                            activeOpacity={.6}
                        >
                            <Text style={styles.profile_des_edit_button}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.post_count_followers}>
                    <View style={styles.follow_block}>
                        <Text>{PostNum}</Text>
                        <Text style={{color: "#8e8e8e"}}>posts</Text>
                    </View>

                    <View style={styles.follow_block}>
                        <Text>{props.ProfileItems.Followes.length}</Text>
                        <Text style={{color: "#8e8e8e"}}>followers</Text>
                    </View>
                </View>

                <ProfilePosts
                    navigation={props.navigation}
                    content_decoded={content_decoded}
                    setPostNum={setPostNum}
                />
            </ScrollView>

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
    profile_up:{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    profile_image_homepage:{
        width: 100,
        height: 100,
        borderRadius: 100
    },
    profile_des_edit:{
        alignSelf: "center",
        marginLeft: 25
    },
    profile_des_name:{
        fontSize: 25
    },
    profile_des_edit_button:{

    },
    post_count_followers:{
        flexDirection: "row",
        justifyContent: "center",
        borderTopColor: "#dbdbdb",
        borderTopWidth: 1,
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginTop: 20
    },
    follow_block:{
        alignItems: "center",
        marginRight: 30
    }
});