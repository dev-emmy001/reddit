import { formatDistanceToNowStrict } from "date-fns";
import { Image, StyleSheet, Text, View } from "react-native";
import posts from "../../../assets/data/posts.json";
export default function Homepage() {
  const post = posts[0];
  return (
    <View style={{ padding: 16 }}>
        {/* userprofile / post date / joinbutton section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image
            source={{ uri: post.group.image }}
            style={styles.profileimage}
          />
          <Text style={{ fontWeight: "bold" }}>{post.group.name}</Text>
          <Text style={{ color: "gray" }}>
            {formatDistanceToNowStrict(new Date(post.created_at))}
          </Text>
        </View>
        <Text style={styles.joinbutton}>Join</Text>
      </View>
      {/* Post text and content */}
        <View style={{gap:10, marginTop:10}}>
                  <Text style={{ fontWeight: "bold", fontStyle:"17"}}>{post.title}</Text>
      <Image source={{uri: post.image}} style={{width: "100%", aspectRatio: 4 / 3, borderRadius: 10}}/>
      <Text numberOfLines={4}>{post.description}</Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  joinbutton: {
    backgroundColor: "#0d469b",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    fontWeight: "bold",
  },
  profileimage: { width: 30, height: 30, borderRadius: 10 },
});
