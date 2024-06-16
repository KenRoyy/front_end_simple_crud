import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UsersContext.jsx";

//global
import { Navigation } from "./components/Navigation.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { NotFound } from "./pages/nofount/NotFound.jsx";
import { SupportPage } from "./pages/SupportPage.jsx";
//user
import { ProfilePage } from "./pages/ProfilePage.jsx";
//admin
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage.jsx";
import { UserFormPage } from "./pages/admin/UserFormPage.jsx";

import { ProtectedRoute } from "./ProtectedRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />}></Route>
              <Route path="/support" element={<SupportPage/>}></Route>
              <Route path="/admin/create" element={<UserFormPage />}></Route>
              <Route path="/admin/:id" element={<UserFormPage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}

export default App