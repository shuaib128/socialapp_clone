import React from 'react'
import {
    View, Text, StyleSheet, ScrollView,
    Image, Dimensions, FlatList
} from 'react-native'
import axios from 'axios';
import HeaderHome from '../components/HeaderComponents/HeaderHome';
import Footer from '../components/FooterComponents/Footer';
import { BackendServer } from '../components/Api/BackendServer';


const { width, height } = Dimensions.get("screen")
export default function PostdDetailScreen(props) {
    const { PostID } = props.route.params
    const [Post, setPost] = React.useState(() => {
        axios.get(`${BackendServer}/api/posts/${PostID}`)
            .then(res => setPost(res.data))
    })
    if (!Post) return <Text>Loading..</Text>

    return (
        <View style={styles.FullView}>
            <HeaderHome />

            <ScrollView>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                >
                    {Post.images.map((image, index) => (
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

                <View style={styles.des_down}>
                    <Text style={styles.post_des}>{Post.description}</Text>

                    <View style={styles.comments_section}>
                        <Text style={{
                            fontSize: 20, fontWeight: "bold", marginBottom: 15
                        }}>
                            Comments
                        </Text>

                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={Post.comments}
                            renderItem={({ item, index }) => (
                                <View
                                    key={index}
                                    style={styles.comment_section}
                                >
                                    <View style={styles.comment_header}>
                                        <Image
                                            source={{
                                                uri: item.ProfileItems.image
                                            }}
                                            style={styles.profiletImage}
                                        />
                                    </View>
                                    <View style={styles.comment_des}>
                                        <Text style={styles.comment_userNAme}>
                                            {item.users.username}
                                        </Text>
                                        <Text style={[styles.post_des, { paddingRight: 15 }]}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
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
        paddingBottom: 50
    },
    post_img: {
        width: width,
        height: height / 2
    },
    postImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    des_down: {
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    post_des: {
        fontSize: 17,
        lineHeight: 22,
        flex: 1,
        flexWrap: 'wrap'
    },
    profiletImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    comments_section: {
        marginTop: 50
    },
    comment_section: {
        marginBottom: 20,
        flexDirection: "row"
    },
    comment_header: {
        width: "15%"
    },
    comment_userNAme: {
        fontSize: 17,
        marginBottom: 10
    },
    comment_des: {
        marginLeft: 20,
        width: "85%"
    }
});