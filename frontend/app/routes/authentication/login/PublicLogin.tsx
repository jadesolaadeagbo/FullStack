import PublicRoute from '../../PublicRoute';
import Login from './login';

export default function PublicLogin() {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
}
