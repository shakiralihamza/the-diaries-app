import React, {FC} from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Box, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {Entry} from "../../interfaces/entry.interface";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setViewEntry} from "../viewEntry/viewEntrySlice";
import {setCurrentEntry} from "./currentEntrySlice";

interface ListItemProps extends Entry {
    index: number,
    arrayLength: number,
    isPinnedBorderVisible?: boolean,
}

const EntriesListItem: FC<ListItemProps> = ({
                                                title,
                                                id,
                                                isPinnedBorderVisible,
                                                description,
                                                index,
                                                arrayLength
                                            }) => {
    const dispatch = useAppDispatch();
    const currentEntry = useAppSelector(state => state.currentEntry.currentEntry);
    const selected = id === currentEntry
    return (
        <>
            <ListItem alignItems="flex-start" tabIndex={0}
                      sx={{
                          ...(selected && {backgroundImage: 'linear-gradient(to right, #3a373a, #373538)'}),
                          '&: focus': {backgroundImage: 'linear-gradient(to right, #ca8e20, #c98f20)'},
                          '&: focus .description': {color: '#e5cb98'},
                          paddingTop: '5px',
                          paddingBottom: '5px',
                      }}
                      onClick={() => {
                          dispatch(setCurrentEntry(id))
                          dispatch(setViewEntry({title, description}))
                      }}
            >
                <ListItemText
                    sx={{marginLeft: '20px'}}
                    primary={
                        <Typography
                            sx={{fontWeight: '500', fontSize: '13px', color: '#e0dde0'}}
                        >
                            {title}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Box
                                className={'description'}
                                component={'div'}
                                sx={{
                                    color: '#878588',
                                    fontSize: '13px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '255px',
                                    marginRight: '15px'
                                }}
                            >
                                {description}
                            </Box>
                        </>
                    }
                />
            </ListItem>
            {
                index + 1 !== arrayLength &&
                <Divider variant="inset" sx={{marginLeft: '37px'}} component="li"/>
            }
            {isPinnedBorderVisible &&
                <Divider sx={{
                    border: '2px solid',
                    borderColor: '#5e5b5e',
                }} component="li"/>
            }
        </>
    );
}

export default EntriesListItem;
