import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Helmet } from 'react-helmet';
import Skeleton from "@mui/material/Skeleton";
import SkeletonProductView from "./skeletonProductView";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        skeleton: {
            margin: theme.spacing(2, 0)
        },
        className: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            [theme.breakpoints.down("xs")]: {
                justifyContent: "flex-start",

            }
        }
    })
);

export const HomeSkeletonList = () => {
    const classes = useStyles();
    return (
        <>
        <Helmet>
        <title>Buy Cruelty-Free Beauty & Body Care Products at The Body Shop India</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={450} className={classes.skeleton} />
            <Skeleton
                variant="rectangular"
                height={200}
                className={classes.skeleton}
                key={Math.random() + "home"}
            />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={400} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={450} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={300} className={classes.skeleton} />
            <Skeleton key={Math.random() + "home"} variant="rectangular" height={300} className={classes.skeleton} />
            <Skeleton
                key={Math.random() + "home"}
                variant="rectangular"
                height={250}
                className={classes.skeleton}
            />
            <Skeleton
                key={Math.random() + "home"}
                variant="rectangular"
                height={250}
                className={classes.skeleton}
            />
            <SkeletonProductView flag={"home"} className={classes.className} gridsArray={[1, 2, 3, 4]} lg={2} />
        </>
    )
}