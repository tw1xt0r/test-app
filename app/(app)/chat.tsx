import CustomKeyboardView from '@/components/CustomKeyboard'
import HeaderChat from '@/components/HeaderChat'
import MessagesList from '@/components/MessagesList'
import Underline from '@/components/UI/Underline'
import { useAuth } from '@/context/authContext'
import { CustomUser } from '@/context/types'
import { db, userRef } from '@/firebaseConfig'
import { getRoomId } from '@/utils'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
	setDoc,
	doc,
	Timestamp,
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
	DocumentData,
} from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import {
	Alert,
	Keyboard,
	ScrollView,
	StatusBar,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

export default function Chat() {
	const { user } = useAuth()
	const item = useLocalSearchParams() as Partial<CustomUser>
	const router = useRouter()

	const [messages, setMessages] = useState<DocumentData[]>([])

	const textRef = useRef<string | undefined>('')
	const inputRef = useRef<TextInput>(null)
	const scrollViewRef = useRef<ScrollView>(null)

	useEffect(() => {
		createRoomIfNotExists()

		let roomId = getRoomId(user!.userId!, item.userId!)
		const docRef = doc(db, 'rooms', roomId)
		const messagesRef = collection(docRef, 'messages')
		const q = query(messagesRef, orderBy('createdAt', 'asc'))

		let unsub = onSnapshot(q, snapshot => {
			let allMessages = snapshot.docs.map(doc => doc.data())

			setMessages([...allMessages])
		})

		const KeyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			updateScrollView
		)

		return () => {
			unsub()
			KeyboardDidShowListener.remove()
		}
	}, [])

	useEffect(() => {
		updateScrollView()
	}, [messages])

	const updateScrollView = () => {
		setTimeout(() => {
			scrollViewRef!.current!.scrollToEnd({ animated: true })
		}, 100)
	}

	const createRoomIfNotExists = async () => {
		let roomId = getRoomId(user!.userId!, item.userId!)

		await setDoc(doc(db, 'rooms', roomId), {
			roomId,
			createdAt: Timestamp.fromDate(new Date()),
		})
	}

	const onSendMessage = async () => {
		let message = textRef.current?.trim()

		if (!message) return

		try {
			let roomId = getRoomId(user!.userId!, item.userId!)
			const docRef = doc(db, 'rooms', roomId)
			const messageRef = collection(docRef, 'messages')

			textRef.current = ''
			if (inputRef) inputRef.current?.clear()

			const newDoc = await addDoc(messageRef, {
				userId: user?.userId,
				text: message,
				profileUrl: user?.profileUrl,
				senderName: user?.username,
				createdAt: Timestamp.fromDate(new Date()),
			})
		} catch (e) {
			let msg = 'An unknown error occurred'
			if (e instanceof Error) {
				msg = e.message
				Alert.alert('Message', msg)
			}
		}
	}

	return (
		<CustomKeyboardView inChat={true}>
			<View className='flex-1 bg-white'>
				<StatusBar barStyle='dark-content' />
				<HeaderChat item={item} router={router} />
				<Underline />
				<View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
					<View className='flex-1'>
						<MessagesList
							scrollViewRef={scrollViewRef}
							messages={messages}
							currentUser={user!}
						/>
					</View>
					<View style={{ marginBottom: hp(3) }} className='pt-2'>
						<View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-3'>
							<TextInput
								ref={inputRef}
								onChangeText={value => (textRef.current = value)}
								placeholder='Type message...'
								style={{ fontSize: hp(2) }}
								className='flex-1 mr-2'
							/>
							<TouchableOpacity onPress={onSendMessage}>
								<View
									style={{ width: hp(4), aspectRatio: 1 }}
									className='bg-neutral-200 p2 mr-px rounded-full items-center justify-center'
								>
									<Feather name='send' size={hp(2.7)} />
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</CustomKeyboardView>
	)
}
