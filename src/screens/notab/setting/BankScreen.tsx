import styled from "@emotion/native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bank } from "../../../contexts/Bank";
import { copyToClipboard } from "../../../components/button/CopyToClipboard";
type BankProps = {
  bank: string;
  num: string;
  host: string;
};
const ListView = styled.TouchableOpacity`
  margin: 5px 20px;
  padding: 10px 20px;
  background-color: rgba(50, 50, 50, 0.04);
  border-radius: 10px;
`;
export const BankScreen: React.FC = () => {
  const User = useAuthContext().User;
  const [bank, setBank] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [host, setHost] = useState<string>(User.name);
  const [bankList, setBankList] = useState<BankProps[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("bank").then((banks) => {
      if (!!banks) setBankList(JSON.parse(banks));
    });
  }, []);

  const AddBtnOnPress = () => {
    if (!bank || !num || !host) return;
    const result = [
      {
        bank: bank,
        num: num,
        host: host,
      },
      ...bankList,
    ];
    setBankList(result);
    setBank("");
    setNum("");
    setHost("");
    AsyncStorage.setItem("bank", JSON.stringify(result));
  };

	const ListViewOnPress = (d: BankProps) => { 
		    copyToClipboard(
      d.bank + d.num + " 예금주:" + d.host,
      "클립보드에 복사되었습니다."
    );
	}
  return (
    <Container>
      <Scroll>
        <Header>
          해당 기능은 서버에 계좌를 등록하지 않습니다. {"\n"}따라서 어플 삭제시
          계좌 목록은 삭제됩니다.
        </Header>

        {bankList.map((d, i) => (
					<ListView key={i} onPress={()=>ListViewOnPress(d)}>
            <Row>
              <BankName>은행명</BankName>
              <BankInput value={d.bank} />
            </Row>
            <Row>
              <AccountNum>계좌번호</AccountNum>
              <AccountInput value={d.num} />
            </Row>
            <Row>
              <Host>예금주</Host>
              <HostInput value={d.host} />
            </Row>
          </ListView>
        ))}
        <AddView>
          <Row>
            <BankName>은행명</BankName>
            <BankInput
              value={bank}
              onChangeText={(t) => setBank(t)}
              placeholder={"은행명을 입력해주세요."}
            />
          </Row>
          <Row>
            <AccountNum>계좌번호</AccountNum>
            <AccountInput
              value={num}
              onChangeText={(t) => setNum(t)}
              placeholder={"계좌번호를 입력해주세요."}
            />
          </Row>
          <Row>
            <Host>예금주</Host>
            <HostInput
              value={host}
              onChangeText={(t) => setHost(t)}
              placeholder={"예금주를 입력해주세요."}
            />
          </Row>
          <AddBtn onPress={() => AddBtnOnPress()}>
            <AddTitle>추가하기</AddTitle>
          </AddBtn>
        </AddView>
      </Scroll>
    </Container>
  );
};

//# 전체적인 View
const Container = styled.SafeAreaView``;
const Scroll = styled.ScrollView`
  background-color: white;
`;

//# Add View
const AddView = styled.View`
  padding: 14px 20px;
  border-width: 1px;
  border-color: rgba(100, 100, 100, 0.3);
`;
const Header = styled.Text`
  padding: 20px;
  line-height: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BankName = styled.Text`
  width: 70px;
`;
const AccountNum = styled.Text`
  width: 70px;
`;
const Host = styled.Text`
  width: 70px;
`;
const BankInput = styled.TextInput`
  font-size: 15px;
  color: black;
  padding: 0;
  margin: 0;
`;
const AccountInput = styled.TextInput`
  font-size: 15px;
  color: black;
  padding: 0;
  margin: 0;
`;
const HostInput = styled.TextInput`
  font-size: 15px;
  color: black;
  padding: 0;
  margin: 0;
`;
const AddTitle = styled.Text`
  text-align: center;
  color: #579fee;
`;
const AddBtn = styled.TouchableOpacity`
  background-color: rgba(240, 240, 240, 0.3);
  padding: 10px 0;
  margin: 10px 0 0 0;
`;
