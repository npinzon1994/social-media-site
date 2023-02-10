import React, { useContext, useEffect } from "react";
import ThemeContext from "../store/theme-context";
import PageContent from "../components/UI/PageContent";

const Home = () => {
  const themeContext = useContext(ThemeContext);
  const {theme, setTheme} = themeContext;

  useEffect(() => {
    setTheme("light");
  }, [theme, setTheme]);

  return <PageContent title="Home">

  </PageContent>;
};

export default Home;
