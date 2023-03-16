import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Book from './scenes/book';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Form } from './scenes/book/Form';
import LoginPage from './scenes/auth/LoginPage';
import RegisterPage from './scenes/auth/RegisterPage';
import AdminPage from './scenes/auth/AdminPage';
import RequireUser from './guards/requireUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* Private Route */}
              <Route element={<RequireUser allowedRoles={['USER', 'ADMIN']} />}>
                <Route path="/book" element={<Book />} />
                <Route path="/book/:bookId" element={<Form />} />
                <Route path="/team" element={<Team />} />
                <Route path="/create-book" element={<Form />} />
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route element={<RequireUser allowedRoles={['ADMIN']} />}>
                <Route path="admin" element={<AdminPage />} />
              </Route>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
