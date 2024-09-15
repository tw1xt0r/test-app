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

export default function SignIn() {
	const router = useRouter()
	const { login } = useAuth()

	const [loading, setLoading] = useState(false)

	const emailRef = useRef('')
	const passwordRef = useRef('')

	const onLogin = async () => {
		if (!emailRef.current || !passwordRef.current) {
			Alert.alert('Sign In', 'Please fill all the fields')
			return
		}

		setLoading(true)
		const response = await login(emailRef.current, passwordRef.current)
		setLoading(false)
		if (!response.success) {
			Alert.alert('Sign In', response.msg)
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
						source={require('../assets/images/login.jpg')}
					/>
				</View>

				<View className='gap-10'>
					<Text
						style={{ fontSize: hp(4) }}
						className='font-bold tracking-wider text-center text-neutral-800'
					>
						Sign In
					</Text>

					<View className='gap-4'>
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
						<View className='gap-3'>
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

							<Text style={styles.text} className='text-right text-neutral-500'>
								Forgot password?
							</Text>
						</View>

						<TouchableOpacity onPress={onLogin} disabled={loading}>
							<Text
								style={{ height: hp(6.5), fontSize: hp(2.7) }}
								className='font-bold tracking-wider bg-indigo-500 rounded-xl text-center align-middle text-white'
							>
								Sign In
							</Text>
						</TouchableOpacity>

						<View className='flex-row justify-center'>
							<Text style={styles.text} className='text-neutral-500'>
								Don't have an account?{' '}
							</Text>
							<Pressable onPress={() => router.push('/signUp')}>
								<Text style={styles.text} className='text-indigo-500'>
									Sign Up
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
