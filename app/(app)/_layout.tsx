import HeaderHome from '@/components/HeaderHome'
import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen
				name='home'
				options={{
					header: () => <HeaderHome />,
				}}
			/>
		</Stack>
	)
}
