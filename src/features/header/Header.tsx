import React, {FC} from 'react';
import {Grid, IconButton, Stack} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


type TheButtonProps = {
    icon: JSX.Element
}

const TheButton: FC<TheButtonProps> = ({icon}) => (
    <IconButton
        sx={{
            backgroundColor: '#636365',
            borderRadius: '4px',
            padding: '1px 0px',
            width: '35px',
            height:'18px',
            color: 'rgba(235,234,237,0.87)',
        }}
    >
        {icon}
    </IconButton>
)

function Header() {
    return (
        <Grid
            container
            sx={{
                height: '30px',
                width: '100%',
                backgroundImage: 'linear-gradient(to bottom, #404042, #383637)',
            }}
            alignContent={'center'}
        >
            <Grid item xs={3}/>
            <Grid item xs={3}>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px'}}>
                    <TheButton icon={<PushPinOutlinedIcon sx={{fontSize: '14px'}}/>}/>
                    <TheButton icon={<EditOutlinedIcon sx={{fontSize: '14px'}}/>}/>
                    <TheButton icon={<DeleteOutlineOutlinedIcon sx={{fontSize: '14px'}}/>}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Header;
