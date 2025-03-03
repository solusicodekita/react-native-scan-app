import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RouterProps} from '@routes/types';

export type AuthStackParamList = {
  LoginScreen: undefined;
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
};

export type WelcomeScreenProps = CompositeScreenProps<
  StackScreenProps<AuthStackParamList, 'WelcomeScreen'>,
  RouterProps
>;

export type LoginScreenProps = CompositeScreenProps<
  StackScreenProps<AuthStackParamList, 'LoginScreen'>,
  RouterProps
>;

export type SignUpScreenProps = CompositeScreenProps<
  StackScreenProps<AuthStackParamList, 'SignUpScreen'>,
  RouterProps
>;
