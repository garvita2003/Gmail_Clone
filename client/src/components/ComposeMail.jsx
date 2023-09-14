import React from 'react'
import { Dialog, Box, Typography, InputBase, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import styled from '@emotion/styled';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/Api.urls';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    cursor:'pointer',
    '& > p':{
        fontSize:14,
        fontWeight:600
    }
})

const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& > div':{
        fontSize:14,
        borderBottom: '1px solid #F5F5F5',
        marginTop:10
    }
})

const Footer =styled(Box)({
    display: 'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    alignItems:'center',
    cursor:'pointer'
})

const SendButton = styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100
})

const ComposeMail = ({openDialog, setOpenDialog}) => {

    const [data, setData] =useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config={
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_USERNAME,
        Password : process.env.REACT_APP_PASSWORD,
        Port:2525
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to: data.to,
            from: 'garvitakesharwani22@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image : '',
            name: 'Garvita Kesarwani',
            starred: false,
            type: 'drafts'
        }
    
        saveDraftService.call(payload);
    
        if(!saveDraftService.error){
            setOpenDialog(false);
            setData({});
        }
    }


const sendMail = (e) => {

    e.preventDefault();

    if(window.Email){
    window.Email.send({
        ...config,
        To : data.to,
        From : "garvitakesharwani22@gmail.com",
        Subject : data.subject,
        Body : data.body
    }).then(
      message => alert(message)
    );
    }

    const payload = {
        to: data.to,
        from: 'garvitakesharwani22@gmail.com',
        subject: data.subject,
        body: data.body,
        date: new Date(),
        image : '',
        name: 'Garvita Kesarwani',
        starred: false,
        type: 'sent'
    }

    sentEmailService.call(payload);

    if(!sentEmailService.error){
        setOpenDialog(false);
        setData({});
    }

    setOpenDialog(false);
}

const deleteMail = () => {
    setOpenDialog(false);
}

const onValueChange = (e) => {
    setData({...data,[e.target.name]: e.target.value});
}

  return (
    <Dialog
        open={openDialog}
        PaperProps={{ sx: dialogStyle}}
    >
        <Header>
            <Typography>New Message</Typography>
            <Box>
                <MinimizeOutlinedIcon fontSize='small'/>
                <CloseFullscreenIcon fontSize='small'/>
                <CloseIcon fontSize='small' onClick={(e) => closeComposeMail(e)}/>
            </Box>
        </Header>
        <RecipientsWrapper>
            <InputBase placeholder='Recipient' name="to" onChange={(e) => onValueChange(e)}/>
            <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)}/>
        </RecipientsWrapper>
        <TextField 
            multiline
            rows={20}
            sx={{ ' & .MuiOutlinedInput-notchedOutline':{border:'none'}}}
            name='body'
            onChange={(e) => onValueChange(e)}
        />
        <Footer>
            <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
            <DeleteOutlineIcon onClick={() => deleteMail()}/>
        </Footer>
    </Dialog>
  )
}

export default ComposeMail;