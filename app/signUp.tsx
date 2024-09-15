import CustomKeyboardView from '@/components/CustomKeyboard'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
	Image,
	StatusBar,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Pressable,
	Alert,
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default function SignUp() {
	const router = useRouter()
	const { register } = useAuth()

	const [loading, setLoading] = useState(false)

	const emailRef = useRef('')
	const passwordRef = useRef('')
	const usernameRef = useRef('')
	const profileRef = useRef('')

	const onRegister = async () => {
		if (
			!emailRef.current ||
			!passwordRef.current ||
			!usernameRef.current ||
			!profileRef.current
		) {
			Alert.alert('Sign Up', 'Please fill all the fields')
			return
		}
		setLoading(true)

		let response = await register(
			emailRef.current,
			passwordRef.current,
			usernameRef.current,
			profileRef.current
		)
		setLoading(false)

		if (!response.success) {
			Alert.alert('Sign Up', response.msg)
		}
	}

	return (
		<CustomKeyboardView>
			<StatusBar barStyle='dark-content' />
			<View
				style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
				className='flex-1 gap-12'
			>
				<View className='items-center'>
					<Image
						style={{ height: hp(25) }}
						resizeMode='contain'
						source={require('../assets/images/signUp.jpg')}
					/>
				</View>

				<View className='gap-10'>
					<Text
						style={{ fontSize: hp(4) }}
						className='font-bold tracking-wider text-center text-neutral-800'
					>
						Sign Up
					</Text>

					<View className='gap-4'>
						<View
							style={{ height: hp(7) }}
							className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
						>
							<TextInput
								onChangeText={value => (usernameRef.current = value)}
								style={{ fontSize: hp(2) }}
								className='flex-1 font-semibold text-neutral-700 '
								placeholder='Username'
								placeholderTextColor='gray'
							/>
						</View>

						<View
							style={{ height: hp(7) }}
							className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
						>
							<TextInput
								onChangeText={value => (emailRef.current = value)}
								style={{ fontSize: hp(2) }}
								className='flex-1 font-semibold text-neutral-700 '
								placeholder='Email address'
								placeholderTextColor='gray'
							/>
						</View>

						<View
							style={{ height: hp(7) }}
							className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
						>
							<TextInput
								onChangeText={value => (passwordRef.current = value)}
								style={{ fontSize: hp(2) }}
								className='flex-1 font-semibold text-neutral-700 '
								placeholder='Password'
								placeholderTextColor='gray'
								secureTextEntry
							/>
						</View>

						<View
							style={{ height: hp(7) }}
							className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
						>
							<TextInput
								onChangeText={value => (profileRef.current = value)}
								style={{ fontSize: hp(2) }}
								className='flex-1 font-semibold text-neutral-700 '
								placeholder='Profile image url'
								placeholderTextColor='gray'
							/>
						</View>

						<TouchableOpacity onPress={onRegister} disabled={loading}>
							<Text
								style={{ height: hp(6.5), fontSize: hp(2.7) }}
								className='font-bold tracking-wider bg-indigo-500 rounded-xl text-center align-middle text-white'
							>
								Sign Up
							</Text>
						</TouchableOpacity>

						<View className='flex-row justify-center'>
							<Text style={styles.text} className='text-neutral-500'>
								Already have an account?{' '}
							</Text>
							<Pressable onPress={() => router.push('/signIn')}>
								<Text style={styles.text} className='text-indigo-500'>
									Sign In
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</CustomKeyboardView>
	)
}

const styles = StyleSheet.create({
	text: { fontSize: hp(1.8), fontWeight: 'semibold' },
})
