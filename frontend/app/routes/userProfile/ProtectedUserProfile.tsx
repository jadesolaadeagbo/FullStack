import ProtectedRoute from "../ProtectedRoute";
import UserProfile from "./userProfile";

export default function ProtectedUserProfile() {
    return (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    );
  }