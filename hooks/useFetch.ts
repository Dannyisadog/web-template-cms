import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { show, hide } from "redux/features/loader/loaderSlice";
import { setErrorMsg, setSuccessMsg } from "redux/features/globalAlert/globalAlertSlice";

interface Props {
  url: string;
}

const useFetch = ({
  url
}: Props) => {
  const dispatch = useDispatch();

  const setAlertMsg = (isOk: boolean, response: any) => {
    if (isOk) {
      dispatch(setSuccessMsg(response.msg));
    } else {
      dispatch(setErrorMsg(response.msg));
    }
  }
  
  const get = async () => {
    dispatch(show());
    try {
      const result = await fetch(url);
      const isOk = result.ok;
      const response = await result.json();
      response.ok = isOk;
      setAlertMsg(isOk, response);
      dispatch(hide());
      return response;
    } catch (e) {
      dispatch(hide());
      return null;
    }
  }

  const post = async (data: Object) => {
    dispatch(show());
    try {
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
      });
      const isOk = result.ok;
      const response = await result.json();
      response.ok = isOk;
      setAlertMsg(isOk, response);
      dispatch(hide());
      return response;
    } catch (e) {
      dispatch(hide());
      return null;
    }
  }

  const put = async (data: Object) => {
    dispatch(show());
    try {
      const result = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data)
      });
      const isOk = result.ok;
      const response = await result.json();
      response.ok = isOk;
      setAlertMsg(isOk, response);
      dispatch(hide());
      return response;
    } catch (e) {
      dispatch(hide());
      return null;
    }
  }

  const remove = async (data: Object) => {
    dispatch(show());
    try {
      const result = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data)
      });
      const isOk = result.ok;
      const response = await result.json();
      response.ok = isOk;
      setAlertMsg(isOk, response);
      dispatch(hide());
      return response;
    } catch (e) {
      dispatch(hide());
      return null;
    }
  }

  return {
    get,
    post,
    put,
    remove
  }
}

export default useFetch;