import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerDiv: {
      border: "1px solid var(--border-color)",
    },
    linkDiv: {},
    link: {
      borderLeft: "3px solid #40857E",
      padding: theme.spacing(1),
    },
    linkHeading: {
      borderBottom: "1px solid var(--border-color)",
      padding: theme.spacing(1, 0),
    },
    secondLink: {
      paddingLeft: theme.spacing(1),
    },
    selectedText: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: "#40857E",
      lineHeight: "21px",
    },
    unselectedText: {
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.8
      )}px Work Sans`,
      color: "var(--black)",
      lineHeight: "21px",
      margin: theme.spacing(1, 0.3),
    },
  })
);
interface Props {
  title: string;
  sideMenu: any;
}
const SideOptions: React.FC<Props> = ({ title, sideMenu }) => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
  },[]);
  
  return (
    <div className={classes.outerDiv}>
      <div className={classes.linkDiv}>
        {sideMenu.map((item: any, index: number) => (
          <Link to={item.link} key={index}>
            <div className={classes.linkHeading}>
              <div
                className={clsx(
                  item?.title?.toLowerCase() === title?.toLowerCase()
                    ? classes.link
                    : classes.secondLink
                )}
              >
                <Typography
                  variant="h5"
                  className={clsx(
                    item.title === title
                      ? classes.selectedText
                      : classes.unselectedText
                  )}
                >
                  {item.title}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideOptions;
