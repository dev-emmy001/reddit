import posts from "@/assets/data/posts.json";
import PostCard from "@/src/components/Postcard";
import { FlatList, View } from "react-native";
export default function Homepage() {
 
  return (
    <View className="bg-white">
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <PostCard post={item} />}
        />
    </View>
  );
}