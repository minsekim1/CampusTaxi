import styled from '@emotion/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BottomButton } from '../../../../components/button/BottomButton';
import { SimpleCheckBox } from '../../../../components/checkbox/SimpleCheckBox';
import { LoginStackParamList } from '../LoginNavigation';

type LoginNavigation = NavigationProp<LoginStackParamList, 'AgreeScreen'>;

export const AgreeScreen: React.FC = ({}) => {
  const { navigate } = useNavigation<LoginNavigation>();
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [location, setLocation] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleCheckAll = () => {
    if (terms && privacy && location && marketing) {
      setTerms(false);
      setPrivacy(false);
      setLocation(false);
      setMarketing(false);
    } else {
      setTerms(true);
      setPrivacy(true);
      setLocation(true);
      setMarketing(true);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <CheckboxContainer>
          <Checkbox>
            <SimpleCheckBox
              value={terms && privacy && location && marketing}
              setValue={handleCheckAll}
            />
            <Content onPress={handleCheckAll}>캠퍼스 택시의 모든 운영원칙에 동의</Content>
          </Checkbox>
        </CheckboxContainer>
        <CheckboxContainer style={{marginLeft:20}}>
          <Checkbox>
            <SimpleCheckBox value={terms} setValue={setTerms} />
            <Content>서비스 이용약관 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate('TermsScreen');
            }}>
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={privacy} setValue={setPrivacy} />
            <Content>개인정보 처리방침 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate('PrivacyScreen');
            }}>
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox>
            <SimpleCheckBox value={location} setValue={setLocation} />
            <Content>위치정보 이용약관 (필수)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate('GeoScreen');
            }}>
            자세히보기
          </Description>
        </CheckboxContainer>
        <CheckboxContainer style={{ marginLeft: 20 }}>
          <Checkbox >
            <SimpleCheckBox   value={marketing} setValue={setMarketing} />
            <Content>마케팅 정보 수신 (선택)</Content>
          </Checkbox>
          <Description
            onPress={() => {
              navigate('MarketingScreen');
            }}>
            자세히보기
          </Description>
        </CheckboxContainer>
        <Note>※ 선택 약관에 동의하지 않아도 회원가입이 가능합니다.</Note>
      </ContentContainer>
      <BottomButton
        disable={!(terms && privacy && location)}
        onPress={() => {
          if (terms && privacy && location) {
            navigate('RegisterScreen');
          }
        }}>
        다 음
      </BottomButton>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
`;

const ContentContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 24px;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.Text`
  margin-left: 18px;
`;

const Checkbox = styled.View`
  flex-direction: row;
`;

const Description = styled.Text`
  color: #8b8b8b;
  border-bottom-width: 1px;
  border-bottom-color: #BFBFBF;
  padding: 3px 0px 3px 0px;
`;

const Note = styled.Text`
  color: #8b8b8b;
`;
