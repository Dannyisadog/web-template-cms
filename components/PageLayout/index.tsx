import { memo } from "react";
import style from "./PageLayout.module.css";
import { PageLayoutProps } from "types/pageLayout/PageLayoutProps";
import { useGlobalContext } from "providers/GlobalProvider";

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
  const { title } = useGlobalContext();

  return (
    <>
      <div className={style.container}>
        <header className={style.header}>
          <h1 className={style.title}>{title}</h1>
        </header>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}

export default memo(PageLayout);