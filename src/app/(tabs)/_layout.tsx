import { Tabs } from "expo-router";
import { House, InboxIcon, MessageCircleMoreIcon, PlusCircle, Users } from "lucide-react-native";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Reddit",
          headerTintColor: "#ff5700",
          title: "Home",
          tabBarIcon: ({ color }) => <House strokeWidth={2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: "Chat",
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MessageCircleMoreIcon strokeWidth={2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerTitle: "Create",
          title: "Create",
          tabBarIcon: ({ color }) => (
            <PlusCircle strokeWidth={2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerTitle: "Inbox",
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <InboxIcon strokeWidth={2} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="communities"
        options={{
          headerTitle: "Communities",
          title: "Communities",
          tabBarIcon: ({ color }) => (
            <Users strokeWidth={2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
