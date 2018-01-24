import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import NotFoundPage from './components/NotFoundPage';
import UserProfilePage from './components/UserProfilePage';

const routes = [
  {
    path: '/',
    exact: true,
    secure: false,
    component: HomePage
  },
  {
    path: '/login',
    secure: false,
    component: SignInPage
  },
  {
    path: '/register',
    secure: false,
    component: SignUpPage
  },
  {
    path: '/forgot-password',
    secure: false,
    component: ForgotPasswordPage
  },
  {
    path: '/reset-password/:token',
    secure: false,
    component: ResetPasswordPage
  },
  {
    path: '/user',
    secure: true,
    component: UserProfilePage
  },
  {
    path: '',
    secure: false,
    component: NotFoundPage
  }
];

export default routes;
