import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useEffect, useState, useCallback } from "react";

function ProtectedRouteElement({ reverse = false, children }) {
  const { loggedIn, getUser } = useProvideAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(async () => {
    await getUser();
    setUserLoaded(true);
  }, [getUser, setUserLoaded]);

  useEffect(() => init(), [init]);

  if (!isUserLoaded) return null;

  return loggedIn !== reverse ? (
    children
  ) : (
    <Redirect to={reverse ? "/" : "/login"} />
  );
}

ProtectedRouteElement.propTypes = {
  reverse: PropTypes.bool,
};
export { ProtectedRouteElement };
