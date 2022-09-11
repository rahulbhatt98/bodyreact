import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import Utils from "../../utils";
import Slider from "react-slick";

const data = [
  {
    id: 1,
    img: `${Utils.images.DONATION_ONE}`,
  },
  {
    id: 2,
    img: `${Utils.images.DONATION_TWO}`,
  },
  {
    id: 3,
    img: `${Utils.images.DONATION_THREE}`,
  },
  {
    id: 4,
    img: `${Utils.images.DONATION_ONE}`,
  },
  {
    id: 5,
    img: `${Utils.images.DONATION_TWO}`,
  },
  {
    id: 6,
    img: `${Utils.images.DONATION_THREE}`,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        4.4
      )}px  Druk`,
      lineHeight: "42px",
      textTransform: "uppercase",
      margin: theme.spacing(1.5, 0),
      letterSpacing: "0.05em",
    },
    slider: {
      "& .slick-prev, .slick-next": {
        display: "block",
        backgroundColor: theme.palette.primary.main,
        height: 40,
        width: 40,
        color: "#fafafa",
        outline: "#fafafa",
        borderRadius: "50%",
        position: "absolute",
        "&::before": {
          //  background: `url(${Utils.images.RECOMMENDED_ARROW}) center no-repeat`,
          width: "100%",
          height: "100%",
          color: "white",
        },
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
        "& .react-multi-carousel-list": {
          position: "unset",
          width: "98%",
        },
      },
      "& .slick-prev": {
        left: "-50px",
        [theme.breakpoints.down("sm")]: {
          // left: "-25px",
          left: "-35px",
          zIndex: 1,
        },
      },
      "& .slick-next:before": {
        content: `url(${Utils.images.RECOMMENDED_ARROW})`,
        opacity: 1,
        // display: 'none',
      },
      "& .slick-next": {
        right: "-50px",
        [theme.breakpoints.down("sm")]: {
          right: "-35px",
          zIndex: 1,
        },
      },
      "& .slick-prev:before": {
        content: `url(${Utils.images.RECOMMENDED_LEFT})`,
        opacity: 1,
      },
      "& .slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus":
        {
          color: "white",
          background: theme.palette.primary.main,
          outline: "white",
        },
    },
    innerContainer: {
      padding: theme.spacing(0, 7),
      // maxWidth: "var(--max-width)",
      margin: theme.spacing(1.5, "auto"),
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(1.5, "auto", 0),
        padding: theme.spacing(0, 4),
      },
    },
    imgDiv: {
      padding: theme.spacing(1.2),
    },
    img: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
    },
  })
);

function ImageGallery() {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={classes.root}>
        <Typography align="center" color="primary" className={classes.heading}>
          Image Gallery
        </Typography>
      </div>
      <div className={classes.innerContainer}>
        <Slider {...settings} className={classes.slider}>
          {data.map((item: any) => (
            <div key={item.id}>
              <div className={classes.imgDiv}>
                <img src={item.img} alt="donationImg" className={classes.img} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default ImageGallery;
