import {
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginRoot: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: theme.spacing(0, 2),
            [theme.breakpoints.down("xs")]: {
                minHeight: "100vh",
                padding: theme.spacing(2),
            },
        },
        boxShadowDiv: {
            margin: theme.spacing(6, 0),
            padding: theme.spacing(3, 15),
            boxShadow: "var(--box-shadow-div)",
            display: "flex",
            // width: "35%",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--white)",
            borderRadius: 3,
            [theme.breakpoints.down("xs")]: {
                boxShadow: "none",
                padding: 0,
                backgroundColor: "var( --backgroun-color)",
            },
        },
        heading: {
            color: "var(--black)",
            [theme.breakpoints.down("xs")]: {
                fontSize: 22,
            },
        },
        subheading: {
            color: "var(--black)",
            margin: theme.spacing(0.5, 0, 1.5),
            textAlign: "center",
            [theme.breakpoints.down("xs")]: {
                fontSize: 14,
            },
        },
        btnAndInputDiv: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // width: "100%",
            width: theme.spacing(36),
        },
        btnProceed: {
            "&.MuiButton-root": {
                // backgroundColor: "#B0C1B7",
                borderRadius: 2,
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                    1.6
                )}px Work Sans`,
                textTransform: "capitalize",
                padding: theme.spacing(1.5, 0),
                marginTop: theme.spacing(1.5),
            },
            "&.Mui-disabled": {
                backgroundColor: "var(--disabled-color)",
                color: "var(--white)"
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: 14,
            },
        },
        orSignin: {
            position: "relative",
            margin: theme.spacing(1.5, 0),
            "&::before": {
                position: "absolute",
                content: "''",
                top: "50%",
                left: -62,
                width: 60,
                height: 1,
                backgroundColor: "var(--border-color)",
            },
            "&::after": {
                position: "absolute",
                content: "''",
                top: "50%",
                right: -62,
                width: 60,
                height: 1,
                backgroundColor: "var(--border-color)",
            },
        },
        btnGoogle: {
            "&.MuiButton-root": {
                borderRadius: 2,
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                    1.6
                )}px Work Sans`,
                textTransform: "capitalize",
                padding: theme.spacing(1.5, 0),
                color: "var(--secondary-black)",
            },
            "& .MuiButton-startIcon": {
                marginLeft: -30,
            },
            "& .MuiButton-label": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
            },
            [theme.breakpoints.down("xs")]: {
                fontSize: 14,
            },
        },
        phoneBottomDiv: {
            display: "flex",
            alignItems: "center",
        },
        phoneSkipIcon: {
            color: "var(--black)",
            marginBottom: theme.spacing(0.3),
        },
        phoneSkipHeading: {
            color: "var(--black)",
            font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
                1.4
            )}px Work Sans`,
            textTransform: "uppercase",
        },
    })
);

export default useStyles