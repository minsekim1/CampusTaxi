import * as MailComposer from 'expo-mail-composer';

export default async function sendEmailAsync(subject_text, body_text) {
    let result = await MailComposer.composeAsync({
        recipients: ['campustaxi@naver.com'],
        subject: subject_text,
        body: body_text //"사용하지는 기종이 무엇입니까? \n결론이 무엇인가요? \n구체적으로 설명부탁드립니다. : "
    })
}