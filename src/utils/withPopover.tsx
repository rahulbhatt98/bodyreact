import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        popOverText: {
            font: `normal 400 ${theme.spacing(1.2)} px Work Sans`
        },
    }),
);

interface Props{
    popOverContent:any;
    title:any;
    childWrapper:any;
    popoverContainer:any;
    children:any
}

const WithPopOverHOC: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const { popoverContainer, childWrapper, popOverContent } = props
    return (
        <>
            <div
                className={childWrapper}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >

                {props.children}
            </div>
            <Popover
                id="mouse-over-popover"
                className={popoverContainer}
                classes={{
                    paper: popOverContent,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography
                    className={classes.popOverText}
                >{props.title}</Typography>
            </Popover>
        </ >
    );
}

export default WithPopOverHOC;