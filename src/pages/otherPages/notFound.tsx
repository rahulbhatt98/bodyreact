import { Paper, Typography, Grid, makeStyles, createStyles, Theme, Button } from "@material-ui/core";
import { useHistory } from "react-router";

// ** components ****

import Utils from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "var(--backgroun-color)"
        },
        paper: {
            margin: theme.spacing(7, 14),
            padding: theme.spacing(10),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            '& .MuiTypography-root': {
                fontFamily: "Recoleta",
                fontSize: 28,
                margin: theme.spacing(3, 0)
            },
            [theme.breakpoints.down("xs")]: {
                margin: theme.spacing(1),
            }
            // justifyContent: "center"
        },
        btn: {
            borderRadius: "4px",

        }
    })
)
function NotFound() {
    const classes = useStyles();
    const history = useHistory()
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <img src={Utils.images.NOT_FOUND} alt="notFound" />
                        {/* <img src={Utils.images.NOT_FOUND_IMAGE} alt="notFound" /> */}
                        <Typography color="primary" variant="h3">Page Not Found</Typography>
                        <Button className={classes.btn} onClick={() => history.push('/')} variant="contained" color="primary"> Start Shopping</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default NotFound;