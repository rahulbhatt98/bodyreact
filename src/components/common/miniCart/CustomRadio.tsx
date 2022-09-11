import { makeStyles } from "@material-ui/core/styles";
import Utils from "../../../utils";
import { createStyles, Theme, Radio } from "@material-ui/core";
import clsx from "clsx"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        radioContainer: {
            margin: theme.spacing(0.5),
            border: `1px solid transparent`,
            '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "50%",
                backgroundColor: 'transparent',

            },
            [theme.breakpoints.down("xs")]:{
                margin: theme.spacing(0.2),
            }


        },
        checked: {
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "50%",
            backgroundColor: 'transparent',
            [theme.breakpoints.down("xs")]: {
                border: `1px solid black !important`,
                padding: "4px"

            }
        },
        root: {
            '&:hover': {
                backgroundColor: 'transparent',

            },
            width: 50,
            height: 50,
            padding: 0,
            margin: 6,
        },
        checkedIcon: {
            background: `url(${Utils.images.TICK})  no-repeat center center /  cover`,
            '&:before': {
                display: 'block',
                width: 20,
                height: 20,
                content: '""',
            },
            'input:hover ~ &': {
            },
        },
        disabledIcon: {
            background: `url(${Utils.images.OUT_OF_STOCK})  no-repeat center center /  cover`,
            '&:before': {
                display: 'block',
                width: 65,
                height: 65,
                content: '""',
            },
            'input:hover ~ &': {
            },
        },
    }));

// Inspired by blueprintjs
export default function CustomRadio(props: any) {
    const classes = useStyles();
    return (
        <div className={clsx({ [classes.radioContainer]: true, [classes.checked]: props.checked })}>

            <Radio
                className={classes.root}
                disableRipple
                color="default"
                checkedIcon={props.isInStock ? <span className={classes.checkedIcon} /> : <span className={classes.disabledIcon} />}
                icon={!props.isInStock ? <span className={classes.disabledIcon} /> : <span />}
                {...props}
            />
        </div>
    );
}
