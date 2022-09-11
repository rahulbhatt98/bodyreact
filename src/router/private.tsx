import { Suspense } from "react";
import NoInternet from "../pages/error/noInternet";
import { Route, Redirect } from "react-router-dom";
import PageContainer from "../components/pageContainer/privateContainer";
import Utils from "../utils";
import { Skeleton } from "@mui/material";

//custom imports below
import { isAuthenticated } from "../utils/session";

interface Props {
  path: string;
  component: any;
  exact: boolean;
  data?: any;
}

const SuspenseComponent = () => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={"99%"}
        height={300}
        style={{ margin: 10 }}
      />
      <Skeleton
        variant="rectangular"
        width={"99%"}
        height={300}
        style={{ margin: 10 }}
      />
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {navigator.onLine ? (
              <Suspense fallback={<SuspenseComponent />}>
                {isAuthenticated() ? (
                  <PageContainer {...props} {...rest}>
                    <Component {...props} />
                  </PageContainer>
                ) : (
                  <>
                    <Redirect
                      to={`${Utils.routes.LOGIN_OTP}?redirectTo=${props.location.pathname}`}
                    />
                  </>
                )}
              </Suspense>
            ) : (
              <NoInternet />
            )}
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;