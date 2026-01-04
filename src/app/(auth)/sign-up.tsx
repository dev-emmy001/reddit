import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Code, Lock, Mail } from 'lucide-react-native'
import * as React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return
    try {
      await signUp.create({
        emailAddress,
        password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // --- RENDER: VERIFICATION STEP ---
  if (pendingVerification) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white justify-center px-6">
            
            <View className="mb-8 text-center">
              <Text className="text-3xl font-bold text-gray-900 mb-2">Check your email</Text>
              <Text className="text-gray-500 text-base">
                We sent a verification code to <Text className="font-bold text-gray-900">{emailAddress}</Text>
              </Text>
            </View>

            <View className="gap-4">
              {/* Verification Code Input */}
              <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 h-14 bg-gray-50">
                <Code color="#9CA3AF" size={20} />
                <TextInput
                  className="flex-1 ml-3 text-base text-gray-900"
                  value={code}
                  placeholder="Verification Code"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  onChangeText={setCode}
                />
              </View>

              <TouchableOpacity
                className="bg-blue-600 h-14 rounded-2xl items-center justify-center shadow-sm mt-2"
                onPress={onVerifyPress}
              >
                <Text className="text-white text-lg font-bold">Verify Email</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }

  // --- RENDER: SIGN UP STEP ---
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white justify-center px-6">
          
          <View className="mb-8">
            <Text className="text-4xl font-bold text-gray-900 mb-2">Create Account</Text>
            <Text className="text-gray-500 text-base">
              Sign up to get started with your journey.
            </Text>
          </View>

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

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-blue-600 h-14 rounded-2xl items-center justify-center shadow-sm mt-2"
              onPress={onSignUpPress}
            >
              <Text className="text-white text-lg font-bold">Sign Up</Text>
            </TouchableOpacity>

          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-500 text-base">Already have an account? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-bold text-base">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}