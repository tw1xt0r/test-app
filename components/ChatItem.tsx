import { blurhash } from '@/constants/constants'
import { CustomUser } from '@/context/types'
import { db } from '@/firebaseConfig'
import { formatDate, getRoomId } from '@/utils'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import {
	doc,
	collection,
	query,
	orderBy,
	onSnapshot,
	DocumentData,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

interface ChatItemProps {
	item: CustomUser
	router: any
	noBorder: boolean
	index: number
	currentUser: CustomUser
}

export default function ChatItem({
	item,
	router,
	noBorder,
	currentUser,
}: ChatItemProps) {
	const [lastMessage, setLastMessage] = useState<DocumentData | undefined>(
		undefined
	)

	const onChatRoom = () => {
		router.push({ pathname: '/(app)/chat', params: item })
	}

	useEffect(() => {
		let roomId = getRoomId(currentUser.userId!, item.userId!)
		const docRef = doc(db, 'rooms', roomId)
		const messagesRef = collection(docRef, 'messages')
		const q = query(messagesRef, orderBy('createdAt', 'desc'))

		let unsub = onSnapshot(q, snapshot => {
			let allMessages = snapshot.docs.map(doc => doc.data())

			setLastMessage(allMessages[0] ? allMessages[0] : undefined)
		})

		return unsub
	}, [])

	const renderTime = () => {
		if (lastMessage) {
			let date = lastMessage?.createdAt
			return formatDate(new Date(date?.seconds * 1000))
		}
	}

	const renderLastMessage = () => {
		if (typeof lastMessage === 'undefined') 'Loading...'
		if (lastMessage) {
			if (currentUser.userId === lastMessage.userId) `You: ${lastMessage.text}`
			return lastMessage.text
		} else {
			return 'Say Hi!'
		}
	}

	return (
		<TouchableOpacity onPress={onChatRoom}>
			<View
				className={`flex-row justify-between mx-4 items-center gap-3 py-1  ${
					noBorder ? '' : 'border-b border-b-neutral-200'
				}`}
			>
				<Image
					source={item?.profileUrl}
					style={{
						height: hp(6),
						width: hp(6),
						aspectRatio: 1,
						borderRadius: 100,
					}}
					placeholder={blurhash}
				/>

				<View className='flex-1 gap-1'>
					<View className='flex-row justify-between'>
						<Text
							style={{ fontSize: hp(1.8) }}
							className='font-semibold, text-neutral-800'
						>
							{item?.username}
						</Text>
						<Text
							style={{ fontSize: hp(1.6) }}
							className='font-medium, text-neutral-600'
						>
							{renderTime()}
						</Text>
					</View>
					<Text
						style={{ fontSize: hp(1.6) }}
						className='font-medium, text-neutral-600'
					>
						{renderLastMessage()}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}
