export const getRoomId = (id1: string, id2: string) => {
	const sortId = [id1, id2].sort()
	const roomId = sortId.join('-')

	return roomId
}

export const formatDate = (date: Date): string => {
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		throw new Error('Invalid date provided')
	}

	const day = date.getDate()
	const monthNames: string[] = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	const month = monthNames[date.getMonth()]
	const formattedDate = `${day} ${month}`
	return formattedDate
}

export const isValidUrl = (text: string) => {
	try {
		new URL(text)
		return true
	} catch {
		return false
	}
}
