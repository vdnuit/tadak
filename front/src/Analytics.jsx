import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
