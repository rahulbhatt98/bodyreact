import Utils from "../../../utils";
import { createStyles, makeStyles, Theme, Checkbox } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   width: "30px",
      //   height: "30px",
      padding: 0,
      //   color: "rgba(0, 0, 0, 0.54)",
      // "&.MuiIconButton-root":{
      "&.MuiCheckbox-colorSecondary.Mui-checked": {
        color: "var(--main-opacity)",
        // width:"30px",
        // height:"30px"
        // }
      },
      //   "& .MuiSvgIcon-root": {
      //     width: "1.25em",
      //     height: "1.25em",
      //   },
      "& svg ": {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: "30px",
        borderRadius: 1,
      },
    },
  })
);

export default function CustomCheckbox(props: any) {
  const classes = useStyles();
  return (
    <Checkbox
      icon={
        <img
          src={Utils.images.CHECKBOX_BORDER}
          alt="checkbox"
          height="24"
          width="24"
        />
      }
      checkedIcon={
        <img
          src={Utils.images.CHECKBOX_TICK_BORDER}
          alt="checkbox"
          height="24"
          width="24"
        />
      }
      {...props}
      className={clsx(classes.root, props.className ? props.className : "")}
      // onChange={props.onChange}
      // key={`${filter.type === 'customAttributes' ? val : val._id}_${obj.categoryId}_${obj.query}`}
    />
  );
}
