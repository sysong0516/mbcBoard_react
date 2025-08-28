import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ auth, children }) {
  if (!auth) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }
  return children;
}
