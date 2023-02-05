import { LayoutProps } from "types/layout/LayoutProps";
import style from "./Layout.module.css";
import FullPageLoader from "components/FullPageLoader";
import { useSelector } from 'react-redux'
import { RootState } from "redux/store";
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux";
import { show, hide } from "redux/features/loader/loaderSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { resetMsg } from "redux/features/globalAlert/globalAlertSlice";
import Head from "next/head";
import Navbar from "components/Navbar";
import PageLayout from "components/PageLayout";
import { useGlobalContext } from "providers/GlobalProvider";

const Layout = (props: LayoutProps) => {
  const { data } = useSession();
  const user = data?.user;
  const username = user?.name || '';
  const { children } = props;
  const showLoader = useSelector((state: RootState) => state.loader.show);
  const showAlert = useSelector((state: RootState) => state.globalAlert.hasAlert);
  const errorMsg = useSelector((state: RootState) => state.globalAlert.errorMsg);
  const warningMsg = useSelector((state: RootState) => state.globalAlert.warningMsg);
  const infoMsg = useSelector((state: RootState) => state.globalAlert.infoMsg);
  const successMsg = useSelector((state: RootState) => state.globalAlert.successMsg);
  const dispatch = useDispatch();
  const router = useRouter()
  const { title } = useGlobalContext();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch(show());
      dispatch(resetMsg());
    })

    router.events.on('routeChangeComplete', () => {
      dispatch(hide());
    })

    return () => {
      router.events.off('routeChangeStart', () => {
        dispatch(hide());
      })
    }
  }, [])

  if (!user) {
    return (
      <>{children}</>
    );
  }

  return (
    <>
      <Head>
        <title>Web Template CMS</title>
        <meta name="description" content="Web Template CMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar username={username} />
      <main className={style.main}>
        <PageLayout>
          {children}
        </PageLayout>
      </main>
      {showAlert && <div className={style.alert_container}>
        { errorMsg && <Alert severity="error">{errorMsg}</Alert> }
        { warningMsg && <Alert severity="warning">{warningMsg}</Alert> }
        { infoMsg && <Alert severity="info">{infoMsg}</Alert> }
        { successMsg && <Alert severity="success">{successMsg}</Alert> }
      </div>}
      <FullPageLoader show={showLoader} />
    </>
  );
}

export default Layout;