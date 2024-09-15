import { User } from 'firebase/auth'

export interface UserData {
	username: string
	profileUrl: string
	userId: string
}

export interface CustomUser extends User {
	username?: string
	profileUrl?: string
	userId?: string
	emailVerified: boolean
	isAnonymous: boolean
}

export interface IAuthContext {
	user: CustomUser | null
	isAuthenticated: boolean | undefined
	login: (
		email: string,
		password: string
	) => Promise<{ success: boolean; msg?: string }>
	register: (
		email: string,
		password: string,
		username: string,
		profileUrl: string
	) => Promise<{ success: boolean; data?: CustomUser; msg?: string }>
	logout: () => Promise<{ success: boolean; msg?: string }>
}
