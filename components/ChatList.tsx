import { CustomUser } from '@/context/types'
import React from 'react'
import { FlatList, View } from 'react-native'
import ChatItem from './ChatItem'
import { router } from 'expo-router'

interface ChatListProps {
	users: CustomUser[]
	currentUser: CustomUser
}

export default function ChatList({ users, currentUser }: ChatListProps) {
	return (
		<View className='flex-1'>
			<FlatList
				data={users}
				contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
				keyExtractor={item => item.userId!}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<ChatItem
						item={item}
						currentUser={currentUser}
						router={router}
						index={index}
						noBorder={index === users.length - 1}
					/>
				)}
			/>
		</View>
	)
}
