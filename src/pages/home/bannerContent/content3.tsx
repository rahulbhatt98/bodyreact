import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import Utils from "../../../utils";
import Slider from "react-slick";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100vw",
            height: "80vh"
        },
        rightContainer: {
            width: "100%",
            height: "100%",
            // display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#f8f3e9"
        },
        img: {
            height: "100%",
            width: "100%",
            [theme.breakpoints.up(1920)]:{
                maxWidth: "100%",
                width: "1920px",
                objectFit: "fill"
            }
        }
    })
);
interface Props {
    item: any;
    navigateTo: Function;
};

export default function Content3({ item, navigateTo }: Props) {
    const classes = useStyles();
    const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

    return (
        <div key={item.id} className={classes.container}
            onClick={() => navigateTo(item)}
        >
            <div className={classes.rightContainer}>
                {item?.web_img_path ?
                    <img
                        src={item?.web_img_path ? IMAGE_URL + item.web_img_path : Utils.images.PRODUCT_PLACEHOLDER}
                        alt="cart"
                        className={classes.img}
                    /> : null
                }

            </div>
        </div>
    )

}
