import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Box, Typography, Avatar, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Loader from "../loader/Loading";

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f9f9f9">
      <Card sx={{ width: 400, padding: 3, textAlign: "center", boxShadow: 3 }}>
        {user.loading ? (
          <Loader message="Loading User Profile..."/>
        ) : (
          <>
            <Avatar sx={{ width: 80, height: 80, margin: "0 auto", bgcolor: "#ff6b4a" }}>
              <PersonIcon sx={{ fontSize: 40, color: "#fff" }} />
            </Avatar>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" mt={2}>
                <strong>User ID:</strong> {user.userId}
              </Typography>
            </CardContent>
          </>
        )}
      </Card>
    </Box>
  );
};

export default UserProfile;
