import React from 'react'
import {AppBar, Toolbar, styled, InputBase, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../logo.png';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const StyledAppBar = styled(AppBar)({
    background: '#F5F5F5',
    boxShadow: 'none'
})

const SearchWrapper = styled(Box)({
  background:'#EAF1Fb',
  marginLeft: 80,
  borderRadius: 8,
  minWidth: 690,
  maxWidth:720,
  height:48,
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20',
  '& > div':{
    width:'100%',
    padding: '0 10'
  }
})

const OptionWrapper = styled(Box)({
  width:'100%',
  display:'flex',
  justifyContent:'end',
  '& > svg': {
    marginLeft: 20
  }
})

const Header = ({toogleDrawer}) => {
  return (
    <StyledAppBar position="static">
        <Toolbar>
            <MenuIcon color='action' onClick={toogleDrawer} style={{cursor:'pointer'}}/>
            <img src={Logo} alt="logo" style={{width:110, marginLeft:15}} />
            <SearchWrapper>
              <SearchIcon color='action'/>
              <InputBase placeholder='Search Mail'/>
              <TuneIcon color='action'/>
            </SearchWrapper>
            <OptionWrapper>
              <HelpOutlineIcon color='action'/>
              <SettingsOutlinedIcon color='action'/>
              <AppsOutlinedIcon color='action'/>
              <AccountCircleOutlinedIcon color='action'/>
            </OptionWrapper>
        </Toolbar>
    </StyledAppBar>
  )
}

export default Header;