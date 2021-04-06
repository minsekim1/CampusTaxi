import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { NotificationMessageIcon } from '../../components/icon/notification/NotificationMessageIcon';
import { NotificationStackParamList } from './NotificationNavigation';

type NotificationScreenNavigationProp = StackNavigationProp<
  NotificationStackParamList,
  'NotificationScreen'
>;

type Props = {
  navigation: NotificationScreenNavigationProp;
};

type Data = {
  id: number;
  title: string;
  time: string;
  description: string;
};
export const NotificationScreen: React.FC<Props> = () => {
  const [datas, setData] = useState<Data[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/notifications/`).then((response) => {
      if (response.data.results) {
        setData(response.data.results);
      }
    });
  }, []);
  return (
    <Container>
      <ScrollView>
        {datas.map((data) => (
          <DataContainer key={data.id}>
            <Card>
              <CardHeaderContainer>
                <LeftContainer>
                  <NotificationMessageIcon />
                  <Title>{data.title}</Title>
                </LeftContainer>
                <Time>{data.time}</Time>
              </CardHeaderContainer>
              <Description>{data.description}</Description>
            </Card>
            <Line />
          </DataContainer>
        ))}
      </ScrollView>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
`;

const DataContainer = styled.View``;

const Card = styled.View`
  background-color: #ffffff;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
`;

const CardHeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const Time = styled.Text`
  color: #b6b6bf;
  font-size: 11px;
`;

const Description = styled.Text`
  color: #585864;
  margin-left: 30px;
`;

const Line = styled.View`
  align-self: center;
  width: 80%;
  height: 1px;
  background-color: #e5e5e8;
`;