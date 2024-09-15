import { MenuOption } from 'react-native-popup-menu'
import { Text, View } from 'react-native'
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

interface IPopupProfile {
	text: string
	action: (value: any) => void
	value: any
}

export default function PopupProfile({ text, action, value }: IPopupProfile) {
	return (
		<MenuOption onSelect={() => action(value)}>
			<View className='flex-row justify-between items-center px-5 py2'>
				<Text
					style={{ fontSize: hp(1.8) }}
					className='font-medium text-neutral-700'
				>
					{text}
				</Text>
			</View>
		</MenuOption>
	)
}
