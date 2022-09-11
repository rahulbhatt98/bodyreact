import React from 'react'
import images from '../../utils/images';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from 'react-redux';
import { ReducersModal } from '../../models';



const useStyles = makeStyles((theme) =>
    createStyles({
        mainContainer: {
            height: "192px",
            background: "linear-gradient(0deg, #004236, #004236)",
            color: "var(--white)",
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            position: "relative",
            [theme.breakpoints.down("sm")]: {
                height: "auto",
                padding: theme.spacing(2)
            },
            [theme.breakpoints.down(300)]: {
                height: "auto",
                padding: theme.spacing(2, 0, 0, 0)
            }
        },
        innerContainer: {
            textAlign: "center"
        },
        design1: {
            position: "absolute",
            top: "0",
            left: "0",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design2: {
            position: "absolute",
            left: "47px",
            bottom: "0",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design3: {
            position: "absolute",
            left: "158px",
            bottom: "48px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design4: {
            position: "absolute",
            left: "194px",
            bottom: "93px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design5: {
            position: "absolute",
            left: "300px",
            top: "0px",
            [theme.breakpoints.down("xs")]: {
                left: "0"
            },
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design6: {
            position: "absolute",
            right: "300px",
            top: "0px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design7: {
            position: "absolute",
            right: "200px",
            bottom: "66px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design8: {
            position: "absolute",
            right: "0px",
            top: "0px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        design9: {
            position: "absolute",
            right: "0px",
            bottom: "0px",
            [theme.breakpoints.down(300)]: {
                display: "none"
            }
        },
        heading: {
            font: `${theme.typography.fontWeightBold} ${theme.spacing(4)}px Druk`,
            letterSpacing: "0.08em",
            lineHeight: "47px",
            padding: theme.spacing(0.2)
        },
        subHeading: {
            font: `${theme.typography.fontWeightMedium} ${theme.spacing(1.8)}px Roboto`,
            letterSpacing: "0.333333px",
            lineHeight: "21px",
            margin: theme.spacing(2.5, 0, 0, 0),
            padding: theme.spacing(0.2)
        }

    }))

const FindNearestBanner = () => {
    const classes = useStyles();
const  skeletonLoader  = useSelector((state: ReducersModal) => {
    return state.loadingReducer.skeletonLoader
  });;

    return (
        <>
        {skeletonLoader ? <Skeleton variant="rectangular" height={200} /> : 
        <div className={classes.mainContainer}>
            {/* <img src={images.BG_DESIGN1} alt="design" className={classes.design1} />
            <img src={images.BG_DESIGN2} alt="design" className={classes.design2} />
            <img src={images.BG_DESIGN3} alt="design" className={classes.design3} />
            <img src={images.BG_DESIGN4} alt="design" className={classes.design4} />
            <img src={images.BG_DESIGN5} alt="design" className={classes.design5} /> */}
            <div className={classes.innerContainer}>
                <Typography variant="h3" className={classes.heading}>Find Your Nearest
                    Body Shop Store</Typography>
                <Typography className={classes.subHeading}>All of our stores have now reopened,
                    except for Edinburgh and Stansted Airports.</Typography>
            </div>
            {/* <img src={images.BG_DESIGN6} alt="design" className={classes.design6} />
            <img src={images.BG_DESIGN7} alt="design" className={classes.design7} />
            <img src={images.BG_DESIGN8} alt="design" className={classes.design8} />
            <img src={images.BG_DESIGN9} alt="design" className={classes.design9} /> */}
        </div>
        }
        </>
    )
}

export default FindNearestBanner;
