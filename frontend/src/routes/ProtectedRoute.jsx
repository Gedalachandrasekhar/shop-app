export default function ProtectedRoute({ role, children }) {
  const { token, userRole } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (Array.isArray(role)) {
    if (!role.includes(userRole)) return <Navigate to="/login" />;
  } else {
    if (userRole !== role) return <Navigate to="/login" />;
  }

  return children;
}