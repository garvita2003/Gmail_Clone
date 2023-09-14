import React from 'react'
import { Box, Typography, Checkbox , styled} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/Api.urls';


const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems:'center',
    cursor:'pointer',
    '& > div':{
        display :'flex',
        width: '100%',
        '& > p':{
            fontSize: 14
        }
    }

});

const Indicator =styled(Typography )({
    fontSize: '12px !importatnt',
    background: '#ddd',
    color: '#222',
    padding : '0 4px',
    borderRadius : 4,
    marginRight: 6
});

const Date  = styled(Typography)({
    marginLeft:'auto',
    marginRight:20,
    fontSize:12,
    color:'#5F6368'
});

const Email = ({email, selectedEmails, setRefreshScreen, setSelectedEmails}) => {

    const navigate=useNavigate();

    const toogleStarredService = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredEmails = () => {
        toogleStarredService.call({ id:email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState);
    }

    const onValuChange = () => {
        if(selectedEmails.includes(email._id)){
            setSelectedEmails(prevState => prevState.filter(id => id!=email._id));
        }
        else{
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }
  return (
    <Wrapper>
        <Checkbox 
            size='small'
            checked={selectedEmails.includes(email._id)}
            onChange={() => onValuChange()}
        />
        {
            email.starred?
            <StarIcon fontSize='small' style={{ marginRight: 10, color: '#ffd700'}} onClick={() => toggleStarredEmails()} />
            :
            <StarBorderIcon fontSize='small' style={{marginRight: 10}} onClick={() => toggleStarredEmails()}/>

        }
        <Box onClick={() => navigate(routes.view.path, {state : { email : email }})}>
            <Typography style={{width:200, overflow: 'hidden'}}>
                {email.name}
            </Typography>
            <Indicator>
                Inbox
            </Indicator>
            <Typography>
                {email.subject} {email.body && '-'} {email.body}
            </Typography>
            <Date>
                {(new window.Date(email.date)).getDate()}
                {(new window.Date(email.date)).toLocaleString('default',{month: 'long'})}
            </Date>
        </Box>
    </Wrapper>
  )
}

export default Email;