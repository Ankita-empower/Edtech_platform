import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import './App.scss';
import Navbar from './components/navbar/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from './components/alert/Alert';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import store from './redux/store/store';
import AppRoutes from './components/routes/Routes';

function App() {

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");
  
    return isAuthenticated && token ? children : <Navigate to="/login" />;
  };

  const [isSidePanelOpen, setSidePanelOpen] = useState(true);
  const location = useLocation();
  
  const dispatch = useDispatch();

  const validRoutes = [
    "/home",
    "/browse-course",
    "/create-course",
    "/create-lessons",
    "/upload-file",
    "/user-profile",
    "/course-overview",
    "/my-courses",
    "/course/:courseId",
    "/course-details",
    "/lesson-details",
    "/view-course-detail",
    "/search/course/:id",
  ];
  
  const isValidRoute = validRoutes.some((route) => location.pathname.startsWith(route));
  
  const hideNavbarAndSidePanel = !isValidRoute;
  
  // const hideNavbarAndSidePanel = ['/login', '/signup', '/forget-pwd', "*", "/", "/localhost:5173", "/verify-otp","/reset-password", "/*"].includes(location.pathname) || location.pathname.startsWith("/404") || location.pathname === "*";

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat", 
      fontSize: 14,
      h5: {
        fontWeight: 700, 
      },
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        color: '#717171', 
      },
    },
    palette: {
      primary: {
        main: '#ff6b4a', 
        contrastText: '#fff', 
      },
      secondary: {
        main: '#2e7d32', 
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            boxShadow: 'none', // Remove shadow
            '&:hover': {
              boxShadow: 'none', // Remove shadow on hover as well
            },
          },
          outlined: {
            borderWidth: '2px', // Set border to 2px
            borderStyle: 'solid', // Ensure it's solid
            '&:hover': {
              borderWidth: '2px', // Keep it 2px on hover
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {!hideNavbarAndSidePanel && <Navbar />}

        <div className="content">
          <main className={`main-content ${isSidePanelOpen && !hideNavbarAndSidePanel ? '' : 'full-width'}`}>
            <AppRoutes/>
          </main>
        </div>

        {/* Global Alert Component */}
        <Alert />
      </div>
    </ThemeProvider>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default AppWrapper;
