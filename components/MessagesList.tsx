import { CustomUser } from '@/context/types'
import { DocumentData } from 'firebase/firestore'
import React, { LegacyRef } from 'react'
import { ScrollView, Text } from 'react-native'
import MessageItem from './MessageItem'

interface IMessagesList {
	messages: DocumentData[]
	currentUser: CustomUser
	scrollViewRef: LegacyRef<ScrollView> | undefined
}

export default function MessagesList({
	messages,
	currentUser,
	scrollViewRef,
}: IMessagesList) {
	return (
		<ScrollView
			ref={scrollViewRef}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingTop: 10 }}
		>
			{messages.map((message, index) => {
				return (
					<MessageItem
						message={message}
						key={index}
						currentUser={currentUser}
					/>
				)
			})}
		</ScrollView>
	)
}
