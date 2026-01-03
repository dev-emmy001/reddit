import { Tabs } from "expo-router";
import {
  Bell,
  House,
  InboxIcon,
  MessageCircleMore,
  PlusCircle,
} from "lucide-react-native";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "black" , tabBarStyle: { borderTopWidth: 0, elevation: 0 }}}>
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
        name="answers"
        options={{
          headerTitle: "Answers",
          title: "Answers",
          tabBarIcon: ({ color }) => (
            <InboxIcon strokeWidth={2} color={color} />
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
        name="chat"
        options={{
          headerTitle: "Chat",
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MessageCircleMore strokeWidth={2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerTitle: "Inbox",
          title: "Inbox",
          tabBarIcon: ({ color }) => <Bell strokeWidth={2} color={color} />,
        }}
      />
    </Tabs>
  );
}
