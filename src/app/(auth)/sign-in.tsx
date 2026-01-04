import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native"; // Make sure you have this installed
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    // 1. Keyboard Handling Wrapper
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white justify-center px-6">
          
          {/* 2. Header Section */}
          <View className="mb-8">
            <Text className="text-4xl font-bold text-gray-900 mb-2">Welcome back</Text>
            <Text className="text-gray-500 text-base">
              Enter your details to sign in to your account.
            </Text>
          </View>

          {/* 3. Form Section */}
          <View className="gap-4">
            
            {/* Email Input */}
            <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50">
              <Mail color="#9CA3AF" size={20} />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                onChangeText={setEmailAddress}
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50">
              <Lock color="#9CA3AF" size={20} />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                value={password}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>

            {/* Forgot Password Link (Optional but good UX) */}
            <TouchableOpacity className="items-end mb-2">
              <Text className="text-blue-500 font-medium">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Primary Button */}
            <TouchableOpacity
              className="bg-blue-600 h-14 rounded-2xl items-center justify-center shadow-sm"
              onPress={onSignInPress}
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>

          </View>

          {/* 4. Footer Section */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500 text-base">Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}