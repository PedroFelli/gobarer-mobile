import React, {useState, useEffect} from 'react';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import {Container} from './styles';

import api from '~/services/api';

export default function SelectDateTime({navigation}) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider.id]);
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',
});
