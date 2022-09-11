import { Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const GreenRadio = withStyles({
    root: {
        color: "var(--main-opacity)",
        "&$checked": {
            color: "var(--main-opacity)",
        },
        width: '16px',
        height: '16px'
    },
    // checked: {},
})((props: any) => <Radio color="default" {...props} />);


export default GreenRadio