import { blurhash, ios } from '@/constants/constants'
import { useAuth } from '@/context/authContext'
import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from 'react-native-popup-menu'
import PopupProfile from './PopupProfile'
import Underline from './UI/Underline'
import { FontAwesome } from '@expo/vector-icons'
import { isValidUrl } from '@/utils'

export default function HeaderHome() {
	const { user, logout } = useAuth()
	const { top } = useSafeAreaInsets()

	const onProfile = () => {}

	const onLogout = async () => {
		await logout()
	}

	const isUrl = isValidUrl(user!.profileUrl!)

	return (
		<View
			style={{ paddingTop: ios ? top : top + 10 }}
			className='flex-row justify-between rounded-2xl p-4 bg-indigo-500'
		>
			<View>
				<Text style={{ fontSize: hp(3) }} className='font-medium text-white'>
					Chats
				</Text>
			</View>

			<View>
				<Menu>
					<MenuTrigger customStyles={{ triggerWrapper: {} }}>
						{user!.profileUrl && isUrl ? (
							<Image
								style={styles.image}
								source={user!.profileUrl}
								placeholder={blurhash}
								transition={600}
							/>
						) : (
							<FontAwesome
								name='user-circle'
								style={styles.image}
								size={hp(5)}
							/>
						)}
					</MenuTrigger>
					<MenuOptions optionsContainerStyle={styles.popup}>
						<PopupProfile text='Profile' action={onProfile} value={null} />
						<Underline />
						<PopupProfile text='Sign Out' action={onLogout} value={null} />
					</MenuOptions>
				</Menu>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	image: { height: hp(5), aspectRatio: 1, borderRadius: 100 },
	popup: {
		borderRadius: 12,
		borderCurve: 'continuous',
		marginLeft: -35,
		marginTop: 35,
		backgroundColor: 'white',
		width: 170,
	},
})
