
import { useEffect } from "react";
import PropTypes from "prop-types";



const PageTitle = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | FixItNow`;
    } else {
      document.title = "FixItNow - Your One-Stop Solution for Everyday Fixes";
    }
  }, [title]);

  return null; 
};

export default PageTitle;
