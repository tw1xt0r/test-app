import { Stack } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { CustomUser } from '@/context/types'

interface IHeaderChat {
	item: Partial<CustomUser> | null
	router: any
}

export default function HeaderChat({ item, router }: IHeaderChat) {
	return (
		<Stack.Screen
			options={{
				title: '',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: '#6366f1' },
				headerLeft: () => (
					<View className='flex-row items-center gap-4'>
						<TouchableOpacity onPress={() => router.back()}>
							<Entypo name='chevron-left' size={hp(4)} />
						</TouchableOpacity>
						<View className='flex-row items-center gap-3'>
							<Image
								source={item?.profileUrl}
								style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
							/>
							<Text
								style={{ fontSize: hp(2) }}
								className='text-white font-medium'
							>
								{item?.username}
							</Text>
						</View>
					</View>
				),
				headerRight: () => (
					<View className='flex-row items-center gap-5'>
						<Ionicons name='call' size={hp(2.5)} />
						<Ionicons name='videocam' size={hp(2.5)} />
					</View>
				),
			}}
		/>
	)
}
