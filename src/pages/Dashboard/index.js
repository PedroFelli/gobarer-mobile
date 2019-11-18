import React,{ useEffect, useState} from 'react';
import { View } from 'react-native';
import api from '~/services/api';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const data = [ 1, 2, 3, 4, 5];

export default function Dashboard() {
  const [appoinments, setAppointments] = useState([]);


  useEffect (() => {
    async function loadAppointments(){
      const response = await api.get('appointments')

      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id){
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appoinments.map(appoinment =>
        appoinment.id === id
        ? {
          ...appoinment,
          canceled_at: response.data.canceled_at,
        }
        : appoinment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appoinments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Appointment onCancel={() => handleCancel(item.id)} data={item} />}
          />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions ={
  tabBarLabel: 'Agendametnos',
  tabBarIcon: ({tintColor})=> (<Icon name="event" size={20} color={tintColor} />),
};
