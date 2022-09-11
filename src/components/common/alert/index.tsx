import { Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { useDispatch } from "react-redux"

interface Props {
  type: "success" | "error" | "warning" | "info",
  message: string,
  show: boolean,
  position?: "right" | "left" | "center" | null
}


const CustomAlert = ({ show = false, type = "success", message = "", position = "right" }: Props) => {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch({ type: "hide-alert", payload: { show: false } })
  }
  return (
    message ? <Snackbar open={show} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: position ?? "right" }} >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
      : null
  )
}

export default CustomAlert