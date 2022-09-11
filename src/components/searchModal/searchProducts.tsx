import { makeStyles, Divider, Typography, Grid } from '@material-ui/core';
import Utils from "../../utils";
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => (
    {
        innerContainer: {
            display: "flex",
            cursor: "pointer"

        },
        imgContainer: {
            display: "flex",
            justifyContent: "center",
            background: "#F8F3E9",
            borderRadius: 4,
            // padding: theme.spacing(0, 1.5),
            height: 80,
            width: 80,
            "& img": {
                height: "100%"
            }
        },
        trending: {
            padding: theme.spacing(2, 0),
            color: "var(--light-gray)"
        },
        productName: {
            display: "flex",
            color: "var(--secondary-black)",
            padding: theme.spacing(0, 0, 0, 1),
            flexDirection: "column",
            justifyContent: "center",
            "& .MuiTypography-root": {
                font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(1.5)}px  Work Sans`,
            },
        },
        divider: {
            margin: theme.spacing(2, 0),
            background: "var(--text-color)",
        },
        suggestionContainer: {
            backgroundColor: "#FAFAFA",
            height: "100%",
            padding: theme.spacing(0, 1)

        },
        suggestions: {
            color: theme.palette.secondary.light,
            margin: theme.spacing(1.5, 0),
            font: `normal 700 ${theme.spacing(1.5)}px Work Sans`,
            cursor: "pointer"
        },
    })
);


export default function SearchProducts(props: any) {
    const classes = useStyles();
    const history = useHistory()

    return (
        <>
            <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} md={6}>
                    <Typography className={classes.trending}>Products</Typography>
                    {
                        _.has(props.productData, 'product_data') &&
                        props.productData?.product_data?.map((item: any, i: any) => (

                            <>
                                {/* <Link to={`${Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_DETAIL, { ":id": item.id, })}?isSearched=true`}> */}
                                {/* <Link to={Utils.routes.PRODUCT_DETAIL}> */}
                                <div className={classes.innerContainer} key={i} onClick={() => {
                                    props.handleProductClick(item,"search")
                                    // props.onModalClose()
                                    // history.push(`/${item.url}`)
                                }}>
                                    <div className={classes.imgContainer}>
                                        {
                                            item?.image && _.has(item, "image") ?
                                                <img
                                                    src={`${item.image}`} alt="product"
                                                    onError={(evt: any) => evt.target.src = Utils.images.PRODUCT_PLACEHOLDER}
                                                /> :
                                                <img src={`${Utils.images.PRODUCT_PLACEHOLDER}`} alt="product" />
                                        }
                                    </div>
                                    <div className={classes.productName}>
                                        <Typography >{item.name}</Typography>
                                        <Typography >{item.type}</Typography>
                                    </div>
                                </div>
                                {/* </Link> */}
                                <Divider className={classes.divider} />
                            </>
                        ))
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={classes.suggestionContainer}>
                        <Typography className={classes.trending}>Suggestions</Typography>
                        {
                            _.has(props.suggestion, 'result') &&
                            props.suggestion?.result?.map((item: any, i: any) => (
                                <div
                                    onClick={() => {
                                        props.handleSuggestionClick(item)
                                        props.onModalClose()
                                    }}
                                    key={i}>
                                    <Typography className={classes.suggestions}>{item}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </Grid>
            </Grid>
        </>
    )
}