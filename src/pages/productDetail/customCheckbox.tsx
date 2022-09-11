import { makeStyles } from "@material-ui/core/styles";
import Utils from "../../utils";
import { createStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        radioContainer: {
            marginRight: 5,
            '&:hover': {
                border: `0px`,
                backgroundColor: 'transparent',
            },
        },
        shadeBox: {
            width: '38px',
            height: '38px',
            marginLeft: '1px',  
            '&:hover': {
                backgroundColor: 'transparent',
                borderRadius: '0px',
                border: '0px'
            },
            '&:focus': {
                backgroundColor: 'transparent',
                borderRadius: '0px',
                border: '0px',
                outline: '0px',
                visibility: 'hidden',
            }
        },
        checkboxTick: {
            padding: '10px',
            margin: theme.spacing(.2)


        }
    }));

// Inspired by blueprintjs
export default function StyledCheckbox(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.radioContainer}>
            <div className={classes.shadeBox}  {...props}  >
                {props?.checked ?
                    <img src={Utils.images.CHECKBOX_TICK} className={classes.checkboxTick}/>
                    :
                    null
                }
                 </div>
            {/* </Button> */}
        </div>
    );
}
