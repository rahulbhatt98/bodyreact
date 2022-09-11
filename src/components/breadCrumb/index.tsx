import { makeStyles, createStyles, Theme, Typography, Hidden } from "@material-ui/core"
import { Link } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        routeName: {
            display: "flex",
            flexBasis: "100%",
            // alignItems: "baseline",
            // padding: theme.spacing(2, 0, 0, 0),

            width: "100%",
            "& > *": {
                font: `normal ${theme.spacing(1.4)}px Work Sans`,
                fontWeight: 600,
                lineHeight: "16px",
                // color: "var(--light-gray)",
                margin: theme.spacing(0, 0.4),
                display: "flex",
                alignItems: "baseline",
            },
            '&> a+a:before': {
                content: "'/ '",
            },
            "& a:last-child": {
                fontWeight: 500,
                // color: "var(--black)"
            }

        },
        skeleton: {
            marginBottom: "10px"
        }
    })
)
interface Props {
    breadcrumb: Array<
        {
            title: any,
            action: any
        }
    >;
    type?: "default" | "white"
}

const BreadCrumb = ({ breadcrumb, type = "default" }: Props) => {
    const classes = useStyles()
    const skeletonLoader = useSelector((state: ReducersModal) => {
        return state.loadingReducer.skeletonLoader;
    });
    return (
        <Hidden xsDown>
        <Typography component="span" className={classes.routeName}>
            {skeletonLoader ?
                breadcrumb.map((val: any, i: any) => {
                    if (i === 0)
                        return <Skeleton className={classes.skeleton} variant="rectangular" width={60} key={i} />
                    else
                        return <div key={i}>
                            /  <Skeleton className={classes.skeleton} variant="rectangular" width={60} />
                        </div>

                })
                : breadcrumb.map((val: any, i: any) => (
                    <Link to={val.action} key={i} style={{ color: type === "white" ? "var(--white)" : "var(--primary)" }}>{val.title}</Link >
                ))}
        </Typography >
         </Hidden>
    )
}


export default BreadCrumb