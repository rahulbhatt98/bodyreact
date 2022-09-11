import { useEffect } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  children: any;
}

function PublicContainer({ children }: Props) {
  const history = useHistory();
  useEffect(() => {
    const pathname = history.location.pathname
    if (!pathname.includes("/shopping-bag") && !pathname.includes("/order/detail")) {
      localStorage.removeItem("isMembershipAdded")
    }
  }, [history.location.pathname])
  return (
    <div >
      {children}
    </div>
  )
}

export default PublicContainer;