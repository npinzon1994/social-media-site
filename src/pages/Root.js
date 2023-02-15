import { useEffect } from "react";
import { Outlet, useSubmit, useLoaderData } from "react-router-dom";
import SidebarNavigation from "../components/UI/SidebarNavigation";
import { getTokenDuration } from "../utils/auth";

const getTimeLeft = (tokenDuration) => {
  const tokenDurationDate = new Date(tokenDuration);
  const minutesLeft = tokenDurationDate.getMinutes();
  const secondsLeft = tokenDurationDate.getSeconds() % 60;
  return { minutes: minutesLeft, seconds: secondsLeft };
};

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "TOKEN EXPIRED") {
      submit(null, { action: "logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();
    const timeLeft = getTimeLeft(tokenDuration);

    console.log(
      "Time left in session: ",
      timeLeft.minutes,
      "min",
      timeLeft.seconds,
      "sec"
    );

    setTimeout(() => {
      submit(null, { action: "logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <SidebarNavigation />
      <Outlet />
    </>
  );
};

export default Root;
