import { Typography, makeStyles, Divider, Switch, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { settingsUpdate, updateProfile } from "../../utils/event/action";
import { getNotification, updateNotification } from "../account/profile/action";
import { hideLoader } from "../home/actions";

const useStyles = makeStyles((theme: any) => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0px",
        marginTop: "20px"
    },
    heading: {
        font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
            3.6
        )}px Work Sans`,
        lineHeight: "42px",
        color: "#004236"
    },
    label: {
        font: `normal 500 ${theme.spacing(
            1.4
        )}px Work Sans`,
        color: "#333333",
        fontSize: "14px",
        lineHeight: "16px",
        letterSpacing: "0em",
        textAlign: "left",
        marginBottom: "5px"

    },
    switch: {
        width: "60px",

        '& .MuiSwitch-thumb': {
            width: "25px",
            height: "20px",
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            borderRadius: "4px",
            // backgroundColor: "#3D857E",
        },
        '& .MuiSwitch-colorSecondary.Mui-checked': {
            color: "#3D857E"
        },
        "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
            "backgroundColor": "#3D857E"
        },
        "& .MuiSwitch-switchBase": {
            color: "#B2B2B2"

        },
        "& .MuiSwitch-track": {
            backgroundColor: "#D2D2D2",
            borderRadius: "3px",
        }

    },
    innerContainer: {
        height: "460px",
        [theme.breakpoints.down("xs")]: {
            height: "auto",
            padding: "0px 20px"
        }
    }
}));

const Notification: React.FC<any> = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [notificationData, setNotificationData] = useState<any>({})

    const getNotificationData = () => {
        dispatch(getNotification((resp: any) => {
            setNotificationData(resp?.notificationSettings)
            dispatch(hideLoader())
        }))
    }

    useEffect(() => {
        getNotificationData()
    }, []);

    const onEmailChange = () => {
        const payload = { notificationSettings: { ...notificationData, emailSubscription: !notificationData?.emailSubscription } }
        dispatch(updateNotification(payload, (resp: any) => {
            if (resp){
                let eventPayload={
                    WhatsappNotification: notificationData?.whatsapp,
                    EmailNotification: payload.notificationSettings?.emailSubscription ,
                }
                settingsUpdate(eventPayload)
                updateProfile('MSG-email',payload.notificationSettings?.emailSubscription);

                getNotificationData();
}
        }))
    }

    const onWhatsappChange = () => {
        const payload = { notificationSettings: { ...notificationData, whatsapp: !notificationData?.whatsapp } }
        dispatch(updateNotification(payload, (resp: any) => {
            if (resp) {
                let eventPayload={
                    WhatsappNotification: payload.notificationSettings?.whatsapp,
                    EmailNotification: notificationData?.emailSubscription,
                }
                settingsUpdate(eventPayload)
                updateProfile('MSG-whatsapp',payload.notificationSettings?.whatsapp);
                getNotificationData()
            }
        }))
    }

    return (
        <div className={classes.innerContainer}>
            <Hidden xsDown>
                <Typography className={classes.heading}>Notifications</Typography>
            </Hidden>
            <div className={classes.container}>
                <Typography className={classes.label}>Whatsapp</Typography>
                <Switch className={classes.switch} checked={notificationData?.whatsapp || false}
                    onChange={onWhatsappChange}
                />
            </div>
            <Divider />
            <div className={classes.container}>
                <Typography className={classes.label}>Unsubscribe Email</Typography>
                <Switch className={classes.switch} checked={notificationData?.emailSubscription || false}
                    onChange={onEmailChange}
                />
            </div>
            <Divider />

        </div>)
}

export default Notification