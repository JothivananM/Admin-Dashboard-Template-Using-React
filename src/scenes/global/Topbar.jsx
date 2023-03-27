import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
    setIsToggleClicked(!isToggleClicked);

  }

  props.setIsSidebar(open);

  return (
    <div style={{ "position": "sticky", "top": 0, "zIndex": "99999" }}>
      <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.greenAccent[900]}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          visibility="visible"
          borderRadius="3px"
        >
          <IconButton sx={{ ml: 1, flex: 1 }}>
            {
              !isToggleClicked ?
                <KeyboardDoubleArrowLeftIcon onClick={toggleSidebar} /> :
                <KeyboardDoubleArrowRightIcon onClick={toggleSidebar} />
            }

            {/* <KeyboardDoubleArrowLeftIcon /> */}
          </IconButton>
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
        </Box>


        {/* ICONS */}
        <Box display="flex">
          {/* <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton> */}
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </div>

  );
};

export default Topbar;
