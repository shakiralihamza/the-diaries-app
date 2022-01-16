import React, {FC} from 'react';
import {Grid, IconButton, Stack} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';

type TheButtonProps = {
    icon: JSX.Element,
    selected: boolean
}

type DefaultIconStyles = { fontSize: number };
const defaultIconStyles: DefaultIconStyles = { fontSize: 18 }

const TheButton: FC<TheButtonProps> = ({icon, selected}) => (
    <IconButton
        disableRipple
        sx={{
            borderRadius: '4px',
            padding: '1px 0px',
            width: '38px',
            height: '22px',
            ...(!selected && {backgroundColor: '#636365', color: 'rgba(235,234,237,0.87)'}),
            ...(selected && {backgroundColor: '#bcbcbc', color: '#505050'}),
            '&: hover': {
                ...(!selected && {backgroundColor: '#636365'}),
                ...(selected && {backgroundColor: '#bcbcbc'}),
            }
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
                height: '35px',
                width: '100%',
                backgroundImage: 'linear-gradient(to bottom, #404042, #383637)',
            }}
            alignContent={'center'}
        >
            <Grid item sm={3} md={2}/>
            <Grid item sm={4} md={3}>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px'}}>
                    <TheButton icon={<PostAddIcon sx={defaultIconStyles}/>} selected={false}/>
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px'}}>
                    <TheButton icon={<PushPinOutlinedIcon sx={defaultIconStyles}/>} selected={true}/>
                    <TheButton icon={<EditOutlinedIcon sx={defaultIconStyles}/>} selected={false}/>
                    <TheButton icon={<DeleteOutlineOutlinedIcon sx={defaultIconStyles}/>} selected={false}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Header;
