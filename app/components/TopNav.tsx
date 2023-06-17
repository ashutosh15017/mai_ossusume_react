import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Avatar from "@mui/material/Avatar";

function TopNav(props: { user: any; pathname: any }) {
  const { user, pathname } = props;
  const pages = ["home", "profile", "users"];
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignout = () => {
    router.replace("/");
    window.location.reload();
    localStorage.removeItem("userObject");
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Container maxWidth="xl" sx={{ width: "100%" }}>
          <Toolbar
            disableGutters
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <NextLink href={page!="home"?page:"/"}>
                      <Typography component="div" textAlign="center">
                        {page}
                      </Typography>
                    </NextLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
           
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 400,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  paddingInline: 1,
                }}
              >
                {pathname.toUpperCase()}
              </Typography>
            

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <MenuItem key={page}>
                    <NextLink href={page!="home"?page:"/"}>
                      <Typography component="div" textAlign="center">
                        {page}
                      </Typography>
                    </NextLink>
                  </MenuItem>
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <div
                onClick={handleClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  alt="Profile Picture"
                  src={user.profile_pic}
                  sx={{
                    width: 40,
                    height: 40,
                    marginRight: 2,
                    cursor: "pointer",
                  }}
                />
              </div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default TopNav;
