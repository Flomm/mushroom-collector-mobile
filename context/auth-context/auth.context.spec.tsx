// import { mockSignInData } from '@/__mocks__/mock-constants';
// import { isNil } from '@/functions/is-nil';
// import { render } from '@testing-library/react-native';
// import type { ReactElement } from 'react';
// import { Pressable, Text, View } from 'react-native';
// import { AuthProvider, useAuthContext } from './auth.context';

// const renderWithContext = (children: ReactElement) => render(<AuthProvider>{children}</AuthProvider>);

// const AuthTestComponent = (): ReactElement => {
//   const { authStateData, signIn, signOut, signUp } = useAuthContext();
//   if (!isNil(authStateData.authError)) {
//     return <Text testID='auth-test-error'>{authStateData.authError}</Text>;
//   }
//   if (!authStateData.loggedIn) {
//     return (
//       <View>
//         <Pressable testID='auth-test-user-button' onPress={() => signIn(mockSignInData)}>
//           <Text testID='auth-test-no-user'>{'auth-test-no-user'}</Text>
//         </Pressable>
//       </View>
//     );
//   }
//   return (
//     <View>
//       <Pressable testID='auth-test-user-refetch' onPress={signOut}></Pressable>
//     </View>
//   );
// };
// describe('AuthContext', () => {
//   //   it('should provide correct value to children with light', () => {
//   //     useColorSchemeSpy.mockReturnValue('light');
//   //     renderWithContext(<ThemedTestComponent />);
//   //     const testText = screen.getByTestId('theme-test');
//   //     expect(testText).toHaveTextContent('false');
//   //   });
// });
