import { FC } from 'react';
import { View } from 'react-native';
import { mockTestId } from './mock-constants';

export const TestChildComponent: FC = () => <View testID={mockTestId}></View>;
