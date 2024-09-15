import { auth, db } from '@/firebaseConfig'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from 'react'
import { IAuthContext, CustomUser, UserData } from './types'

export const AuthContext = createContext<IAuthContext>({
	user: null,
	isAuthenticated: undefined,
	login: async () => ({ success: false }),
	register: async () => ({ success: false }),
	logout: async () => ({ success: false }),
})

interface Props {
	children: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<CustomUser | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
		undefined
	)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, user => {
			if (user) {
				setIsAuthenticated(true)
				setUser(user as CustomUser)
				updateUserData(user.uid)
			} else {
				setIsAuthenticated(false)
				setUser(null)
			}
		})
		return unsub
	}, [])

	const updateUserData = async (userId: string) => {
		const docRef = doc(db, 'users', userId)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			const data = docSnap.data() as UserData
			setUser(prevUser => ({
				...prevUser!,
				username: data.username,
				profileUrl: data.profileUrl,
				userId: data.userId,
			}))
		}
	}

	const login = async (
		email: string,
		password: string
	): Promise<{ success: boolean; msg?: string }> => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			return { success: true }
		} catch (e: unknown) {
			let msg = 'An unknown error occurred'
			if (e instanceof Error) {
				msg = e.message
				if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email'
				if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong credential'
			}
			return { success: false, msg }
		}
	}

	const logout = async (): Promise<{ success: boolean; msg?: string }> => {
		try {
			await signOut(auth)
			return { success: true }
		} catch (e: unknown) {
			let msg = 'An unknown error occurred'
			if (e instanceof Error) {
				msg = e.message
			}
			return { success: false, msg }
		}
	}

	const register = async (
		email: string,
		password: string,
		username: string,
		profileUrl: string
	): Promise<{ success: boolean; data?: CustomUser; msg?: string }> => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			await setDoc(doc(db, 'users', response.user.uid), {
				username,
				profileUrl,
				userId: response.user.uid,
			})

			const registeredUser: CustomUser = {
				...response.user,
				username,
				profileUrl,
				userId: response.user.uid,
			}
			return { success: true, data: registeredUser }
		} catch (e: unknown) {
			let msg = 'An unknown error occurred'
			if (e instanceof Error) {
				msg = e.message
				if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email'
				if (msg.includes('(auth/email-already-in-use)'))
					msg = 'This email is already in use'
			}
			return { success: false, msg }
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const value = useContext(AuthContext)

	if (!value) {
		throw new Error('useAuth must be wrapped inside AuthContextProvider')
	}
	return value
}
