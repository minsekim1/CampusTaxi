import * as MailComposer from "expo-mail-composer";

export default async function sendEmailAsync(subject_text, body_text) {
  let result = await MailComposer.composeAsync({
    recipients: ["campustaxi@naver.com"],
    subject: subject_text,
    body: body_text,
  });
}
