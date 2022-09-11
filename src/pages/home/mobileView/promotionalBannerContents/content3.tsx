import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import Utils from "../../../../utils";
import Slider from "react-slick";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100vw",
            height: "100px"
        },
        rightContainer: {
            width: "100vw",
            height: "100px",
            backgroundSize: "cover !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#f8f3e9"
        },
        img: {
            height: "100px",
        }
    })
);
interface Props {
    item: any;
    navigateTo: Function;
};

export default function Content4({ item, navigateTo }: Props) {
    const classes = useStyles();
    const IMAGE_URL = `${process.env.REACT_APP_MEDIA_URL}`;

    return (
        <div key={item.id} className={classes.container}
            onClick={() => navigateTo(item)}
        >
            <div className={classes.rightContainer}>
                {item?.mobile_img_path|| item?.background_img_path ||item?.web_img_path?
                    <img
                        src={item?.mobile_img_path ? IMAGE_URL + item.mobile_img_path : item?.background_img_path ? IMAGE_URL + item.background_img_path : item?.web_img_path ? IMAGE_URL + item.web_img_path :Utils.images.PRODUCT_PLACEHOLDER}
                        alt="cart"
                        className={classes.img}
                    /> : null
                }

            </div>
        </div>
    )

}
