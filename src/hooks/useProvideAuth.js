import { useDispatch, useSelector } from "react-redux";
import {
  register as registerRequest,
  login as loginRequest,
  logout as logoutRequest,
  getUser as getUserRequest,
  forgotPassword as forgotPasswordRequest,
  resetPassword as resetPasswordRequest,
  editUser as editUserRequest,
  updateToken,
} from "../utils/api";
import { userSlice } from "../services/user/slices";
import { useCallback } from "react";

export function useProvideAuth() {
  const user = useSelector((store) => store.user);
  const requestSended = user.request.sended;
  const loggedIn = user.email && user.name ? true : false;
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    const { actions } = userSlice;
    dispatch(actions.requestSended());

    const token = localStorage.getItem("accessToken");
    return getUserRequest(token)
      .then((data) => {
        dispatch(actions.userUpdated(data));
      })
      .catch(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          dispatch(actions.userLoggedOut());
          return;
        }

        return updateToken(refreshToken)
          .then((data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return getUserRequest(data.accessToken)
              .then((data) => {
                dispatch(actions.userUpdated(data));
              })
              .catch((err) => {
                console.log(err);
                dispatch(actions.requestFailed(err));
              });
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.requestFailed(err));
          });
      });
  }, [dispatch]);

  const register = useCallback(
    async (form) => {
      const { actions } = userSlice;
      dispatch(actions.requestSended());

      return registerRequest(form)
        .then((data) => {
          dispatch(actions.loginSuccess(data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.requestFailed(err));
          return Promise.reject(err);
        });
    },
    [dispatch]
  );

  const login = useCallback(
    async (form) => {
      const { actions } = userSlice;
      dispatch(actions.requestSended());

      return loginRequest(form)
        .then((data) => {
          dispatch(actions.loginSuccess(data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.requestFailed(err));
          return Promise.reject(err);
        });
    },
    [dispatch]
  );

  const forgotPassword = useCallback(
    async (form) => {
      const { actions } = userSlice;
      dispatch(actions.requestSended());

      return forgotPasswordRequest(form)
        .then(() => {
          dispatch(actions.requestSuccess());
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.requestFailed(err));
          return Promise.reject(err);
        });
    },
    [dispatch]
  );

  const resetPassword = useCallback(
    async (form) => {
      const { actions } = userSlice;
      dispatch(actions.requestSended());

      return resetPasswordRequest(form)
        .then(() => {
          dispatch(actions.requestSuccess());
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.requestFailed(err));
          return Promise.reject(err);
        });
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    const { actions } = userSlice;
    dispatch(actions.requestSended());

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      dispatch(actions.userLoggedOut());
      return;
    }

    await logoutRequest(refreshToken);
    dispatch(actions.userLoggedOut());
  }, [dispatch]);

  const editUser = useCallback(
    async (form) => {
      const { actions } = userSlice;
      dispatch(actions.requestSended());

      return editUserRequest(form)
        .then((data) => {
          dispatch(actions.userUpdated(data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(actions.requestFailed(err));
          return Promise.reject(err);
        });
    },
    [dispatch]
  );

  return {
    user,
    loggedIn,
    requestSended,
    getUser,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    editUser,
  };
}
