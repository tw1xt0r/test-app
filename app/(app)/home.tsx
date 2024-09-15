import ChatList from '@/components/ChatList'
import { useAuth } from '@/context/authContext'
import { CustomUser } from '@/context/types'
import { userRef } from '@/firebaseConfig'
import { getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Home() {
	const { user } = useAuth()

	const [users, setUsers] = useState<CustomUser[]>([])

	useEffect(() => {
		if (user?.uid) {
			getUsers()
		}
	}, [])

	const getUsers = async () => {
		const q = query(userRef, where('userId', '!=', user?.uid))
		const querySnapshot = await getDocs(q)

		const data: CustomUser[] = querySnapshot.docs.map(doc => ({
			...(doc.data() as CustomUser),
		}))

		setUsers(data)
	}

	return (
		<View className='flex-1 bg-white'>
			<StatusBar barStyle='light-content' />

			{users.length > 0 ? (
				<ChatList currentUser={user} users={users} />
			) : (
				<View style={{ top: hp(35) }} className='flex items-center'>
					<ActivityIndicator size='large' />
				</View>
			)}
		</View>
	)
}
