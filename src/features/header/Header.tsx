import React, {FC} from 'react';
import {Box, Grid, IconButton, Stack, Tooltip, Zoom} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {openEntryMenu} from "../entries/addEntrySlice";

type TheButtonProps = {
    icon: JSX.Element,
    selected: boolean,
    tooltipText: string,
}

type DefaultIconStyles = { fontSize: number };
const defaultIconStyles: DefaultIconStyles = {fontSize: 18}

export const TheHeaderButton: FC<TheButtonProps> = ({icon, selected, tooltipText}) => {
    return (
        <Tooltip TransitionComponent={Zoom} title={tooltipText}>
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
        </Tooltip>
    )
}

function Header() {
    const dispatch = useAppDispatch();
    const currentDiaryId = useAppSelector(state => state.currentDiary.currentDiary)
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
                <Stack direction={'row'} spacing={1}
                       sx={{
                           padding: '0 5px',
                           mt: '-1px',
                           ...(!currentDiaryId && {visibility: 'hidden'})
                       }}
                >
                    <Box component={'span'} onClick={() => dispatch(openEntryMenu())}>
                        <TheHeaderButton icon={<PostAddIcon sx={defaultIconStyles}/>} selected={false}
                                         tooltipText={'New Entry'}
                        />
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px', mt: '-1px'}}>
                    <Box component={'span'}>
                        <TheHeaderButton icon={<PushPinOutlinedIcon sx={defaultIconStyles}/>} selected={true}
                                         tooltipText={'Pin'}/>
                    </Box>
                    <Box component={'span'}>
                        <TheHeaderButton icon={<EditOutlinedIcon sx={defaultIconStyles}/>} selected={false}
                                         tooltipText={'Edit'}/>
                    </Box>
                    <Box component={'span'}>
                        <TheHeaderButton icon={<DeleteOutlineOutlinedIcon sx={defaultIconStyles}/>} selected={false}
                                         tooltipText={'Delete'}/>
                    </Box>
                </Stack>

            </Grid>
            <Grid item>
                <Stack direction={'row'} spacing={1} sx={{padding: '0 5px'}}>
                    <TheHeaderButton icon={<LogoutIcon sx={defaultIconStyles}/>} selected={false}
                                     tooltipText={'Sign Out'}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Header;
