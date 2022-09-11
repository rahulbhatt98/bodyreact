import Utils from "../../utils"
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeRoot: {
            maxWidth: "var(--max-width)",
            margin: "0px auto",
            padding: theme.spacing(10),
            textAlign: "center",
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(1),

            }
        },
        noInternetImg: {
            height: "150px",
            margin: theme.spacing(5)
        }
    })
)
const NoInternet = () => {
    const classes = useStyles()

    return (

        <div className={classes.homeRoot} >
            <img src={Utils.images.NO_INTERNET} className={classes.noInternetImg} />
            <Typography variant="h3" color="primary">No Internet. Please check your internet connection.</Typography>
        </div>

    )

}

export default NoInternet