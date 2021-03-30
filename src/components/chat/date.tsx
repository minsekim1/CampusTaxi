import { format } from "date-fns";

export const DateToTime = (date:Date)=> format(new Date(date), 'HH:mm')
export const DateToTDay = (date: Date) => format(new Date(date), 'MM/dd')
export const DateToRecently = (date: Date) =>
	(new Date(date).getDate() == new Date().getDate() && new Date(date).getMonth() == new Date().getMonth())
		? DateToTime(date) : DateToTDay(date)
