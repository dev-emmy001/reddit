import posts from "@/assets/data/posts.json";
import { formatDistanceToNowStrict } from "date-fns";
import {
    ArrowBigDown,
    ArrowBigRight,
    ArrowBigUp,
    Award,
    MessageCircle,
} from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function PostCard() {
  const post = posts[0];
  return (
    <View className="p-4 border-b-gray-300 border-b">
      {/* userprofile / post date / joinbutton section */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2.5 items-center">
          <Image
            source={{ uri: post.group.image }}
            className="w-8 h-8 rounded-lg"
          />
          <Text className="font-bold">{post.group.name}</Text>
          <Text className="text-gray-500">
            {formatDistanceToNowStrict(new Date(post.created_at))}
          </Text>
        </View>
        <Text className="bg-blue-900 text-white py-1 px-2.5 rounded-full font-bold">
          Join
        </Text>
      </View>
      {/* Post text and content */}
      <View className="gap-2.5 mt-2.5">
        <Text className="font-bold text-lg">{post.title}</Text>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            className="w-full rounded-lg"
            style={{ aspectRatio: 4 / 3 }}
          />
        )}
        <Text numberOfLines={4}>{post.description}</Text>
      </View>
      {/* // Post interaction section // */}
      <View className="flex-row justify-between items-center mt-4">
        {/* // votes and comments // */}
        <View className="flex-row items-center gap-4">
          {/* // upvote and downvote // */}
          <View className="flex-row items-center border-hairline border-gray-400  rounded-full p-2 gap-3">
            <ArrowBigUp size={18} strokeWidth={1.5} />
            <Text>{post.upvotes}</Text>
            <ArrowBigDown size={18} strokeWidth={1.5} />
          </View>
          {/* // comment // */}
          <View className="flex-row items-center border-hairline border-gray-400  rounded-full p-2 gap-1">
            <MessageCircle size={18} strokeWidth={1.5} />
            <Text>{post.upvotes}</Text>
          </View>
        </View>
        {/* // award and share // */}
        <View className="flex-row items-center gap-4">
          {/* // award // */}
          <View className="flex-row items-center border-hairline border-gray-400 rounded-full p-2 gap-1">
            <Award size={18} strokeWidth={1.5} />
          </View>
          {/* // share // */}
          <View className="flex-row items-center border-hairline border-gray-400  rounded-full p-2 gap-1">
            <ArrowBigRight size={18} strokeWidth={1.5} />
          </View>
        </View>
      </View>
    </View>
  );
}
