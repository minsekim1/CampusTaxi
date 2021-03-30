import Clipboard from "@react-native-clipboard/clipboard";
import { showToast, showToastWithGravity } from "../layout/Toast";

export const copyToClipboard = (text?: string, message?:string) => {
	(text) ?
		Clipboard.setString(text)
		: showToast("복사할 텍스트가 없습니다.");
	(message) ? showToast(message) : null;
   };