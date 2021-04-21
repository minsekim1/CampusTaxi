import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { API_URL } from "../../constant";

export const CustomAxios = (
  method: "POST" | "GET" | "PUT" | "PATCH",
  url: string,
    // | "https://api.campustaxi.net/api/v1/accounts/me/"
    // | "https://api.campustaxi.net/api/v1/accounts/token/refresh/",
    resetToken: Dispatch<SetStateAction<any>>,
    refreshToken: string | undefined,
    token: string  | undefined,
    logTitle: string  | undefined,
    params: any  | undefined,
    onResponse: (d:any)=>void,
) => {
  if (token)
    axios({
      method: method,
      url: url,
      data: { ...params },
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    })
      .then((d) => {
        if (logTitle)
          console.log(logTitle, ":", d.data, url);
        onResponse(d.data);
      })
      .catch((e) => {
        //#region 401문제가 생기면, 만료된 토큰 새로 발급 (리프레시 토큰이 유효=>백엔드에서 검사)
        if (e.message == "Request failed with status code 401")
          axios
            .post(
              `${API_URL}/v1/accounts/token/refresh/`,
              {
                refresh: refreshToken,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
              }
            )
            .then((d) => {
              console.info("RESET TOKEN", d.data.access);
              resetToken(d.data.access);
            })
            .catch((e) =>
              console.info("axios auth error:" + JSON.stringify(e.response))
            );
        //#endregion
      });
  else console.log("NO TOKEN");
};
