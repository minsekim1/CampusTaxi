import styled from "@emotion/native";
import React from "react";
import { Alert } from "react-native";
import Mailer from "react-native-mail";
import { copyToClipboard } from "../button/CopyToClipboard";
import { GenderColor } from "../color/GenderColor";
import { DottedLine } from "../icon/chat/DottedLine";
import { MarkerSVG } from "../icon/chat/MarkerSVG";

export const EmailSend = (
	 //	이메일 제목
	subject?: string,
	// 이메일을 수신하는 이메일의 리스트
	recipients?: string[],
	// cc로 수신하는 이메일의 리스트
	ccRecipients?: string[],
	// bcc로 수신하는 이메일의 리스트
	bccRecipients?: string[],
	// 이메일의 본문
	body?: string,
	// 이메일의 본문이 HTML 형식인지 여부
  isHTML?: string,
)=>{
    Mailer.mail(
      {
        subject: (subject)? subject : "[캠퍼스택시문의]:본인닉네임",
        recipients: ["campustaxi@naver.com"],
        bccRecipients: ["tkarnrwl78627862@gmail.com"],
        body: "<p>제목에 본인닉네임을 바꿔주세요.</p>\
         <p>내용을 입력해주세요.</p>\
         <p>만약 캡쳐가 있다면 사진을 꼭 전송해주세요.</p>\
         <p>상대방 채팅 신고는 상대방의 이름을 반드시 알아야합니다.</p> ",
        isHTML: true,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: "확인",
              onPress: () => console.log("OK: Email Error Response"),
            },
            {
              text: "취소",
              onPress: () => console.log("CANCEL: Email Error Response"),
            },
          ],
          { cancelable: true }
        );
      }
    );
};
