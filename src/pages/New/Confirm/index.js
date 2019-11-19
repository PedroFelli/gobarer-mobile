import React, {useMemo} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {TouchableOpacity} from 'react-native';
import Background from '~/components/Background';

import api from '~/services/api';

import {Container, Avatar, Name, Time, SubmitButton} from './styles';

export default function Confirm({navigation}) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAppAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? `http://192.168.1.3:3333/files/${provider.avatar.path}`
              : `https://api.adorable.io/avatars/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAppAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',
});
