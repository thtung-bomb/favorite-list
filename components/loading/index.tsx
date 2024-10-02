import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loading = () => (
	<ActivityIndicator animating={true} color={MD2Colors.green400} size='large' />
);

export default Loading;