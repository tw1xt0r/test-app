import { ios } from '@/constants/constants'
import { PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

interface ICustomKeyboard {
	children: React.ReactNode
	inChat?: boolean
}

export default function CustomKeyboardView({
	children,
	inChat = false,
}: ICustomKeyboard) {
	let config = {}
	let scrollConfig = {}

	if (inChat) {
		config = { keyboardVerticalOffset: 90 }
		scrollConfig = { contentContainerStyle: { flex: 1 } }
	}
	return (
		<KeyboardAvoidingView
			behavior={ios ? 'padding' : 'height'}
			style={{ flex: 1 }}
			{...config}
		>
			<ScrollView
				style={{ flex: 1 }}
				{...scrollConfig}
				bounces={false}
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
