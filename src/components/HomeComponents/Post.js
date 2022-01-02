import React, { useState } from 'react'
import {
    View, Text, Image,
    StyleSheet, ScrollView, Dimensions,
    TouchableOpacity, FlatList
} from 'react-native'
import { BackendServer } from '../Api/BackendServer';
import axios from 'axios';
import Ionicons from "react-native-vector-icons/Ionicons"


const { width, height } = Dimensions.get("screen")
export default function Post(props) {
    //Get all posts
    const [Posts, setPost] = useState(() => {
        axios.get(`${BackendServer}/api/posts/`)
            .then(res => setPost(res.data))
            .catch(function (error) {
                throw (error.response);
            })
    })
    if (!Posts) return <Text>Loading..</Text>

    return (
        <View style={styles.Posts}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={Posts}
                renderItem={({ item, index }) => (
                    <View style={styles.Post} key={index}>
                        <View style={styles.post_header}>
                            <View style={styles.image_profile_name}>
                                <TouchableOpacity
                                    activeOpacity={.6}
                                    onPressIn={() => {
                                        props.navigation && props.navigation.navigate('OthersProfile', {
                                            UserID: item.ProfileItems.id
                                        })
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: item.ProfileItems.image
                                        }}
                                        style={styles.profiletImage}
                                    />
                                </TouchableOpacity>

                                <Text style={styles.profile_name}>
                                    {item.Author}
                                </Text>
                            </View>
                            <Ionicons
                                style={styles.searchIcon}
                                name="ellipsis-horizontal"
                                size={25}
                                color="black"
                            />
                        </View>

                        <ScrollView
                            horizontal={true}
                            pagingEnabled
                        >
                            {item.images.map((image, index) => (
                                <View style={styles.post_img} key={index} >
                                    <Image
                                        source={{
                                            uri: image.image
                                        }}
                                        style={styles.postImage}
                                    />
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.post_bottom}>
                            <View style={styles.like_comment_save}>
                                <View style={styles.like_comment}>
                                    <TouchableOpacity
                                        activeOpacity={.7}
                                    >
                                        <Ionicons
                                            style={styles.post_bottom_Icon}
                                            name="heart-outline"
                                            size={30}
                                            color="black"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={.7}
                                    >
                                        <Ionicons
                                            style={styles.post_bottom_Icon}
                                            name="chatbubble-outline"
                                            size={28}
                                            color="black"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={.7}
                                    >
                                        <Ionicons
                                            style={styles.post_bottom_Icon}
                                            name="paper-plane-outline"
                                            size={30}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={.7}
                                >
                                    <Ionicons
                                        name="bookmark-outline"
                                        size={30}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                marginTop: 13
                            }}>
                                <Text style={styles.liked_by}>
                                    Liked by
                                    <Text style={styles.liked_by_first}> {item.likes.length} </Text>
                                    Peoples
                                </Text>

                                <Text style={styles.post_des_text}>
                                    {item.description.slice(0, 150)}....
                                </Text>

                                <TouchableOpacity
                                    activeOpacity={.6}
                                    style={{ marginLeft: -1 }}
                                    onPressIn={() => {
                                        props.navigation && props.navigation.navigate('PostdDetailScreen', {
                                            PostID: item.id
                                        })
                                    }}
                                >
                                    <Text style={[styles.post_des_text, { fontWeight: "bold" }]}>
                                        More
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                activeOpacity={.7}
                                onPressIn={() => {
                                    props.navigation && props.navigation.navigate('PostdDetailScreen', {
                                        PostID: item.id
                                    })
                                }}
                            >
                                <Text style={[
                                    styles.post_des_text,
                                    { marginTop: 5, color: "#8e8e8e" }
                                ]}>
                                    View all {item.comments.length} comments
                                </Text>
                            </TouchableOpacity>
                            <Text style={[
                                styles.post_des_text,
                                { color: "#8e8e8e", fontSize: 15 }
                            ]}>
                                {item.whenpublished}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    Posts: {
        paddingBottom: 100
    },
    Post: {
        marginBottom: 25,
        marginTop: 20
    },
    profiletImage: {
        width: 55,
        height: 55,
        borderRadius: 100,
    },
    image_profile_name: {
        flexDirection: "row",
    },
    profile_name: {
        alignSelf: "center",
        marginLeft: 15,
        fontSize: 17
    },
    post_header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 17
    },
    searchIcon: {
        alignSelf: "center"
    },
    postImages: {
        width: '100%'
    },
    post_img: {
        width: width
    },
    postImage: {
        width: "100%",
        height: 350,
        resizeMode: "cover"
    },
    post_bottom: {
        paddingHorizontal: 20,
        paddingTop: 18
    },
    like_comment_save: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    like_comment: {
        flexDirection: "row"
    },
    post_bottom_Icon: {
        marginRight: 15
    },
    post_des: {

    },
    post_des_text: {
        fontSize: 17,
        lineHeight: 22,
    },
    liked_by: {
        marginTop: -5,
        marginBottom: 8,
        fontSize: 17
    },
    liked_by_first: {
        fontWeight: 'bold'
    }
});