import React from "react";
import "../../App.scss";
import { Link } from "react-router-dom";
import { I18nProvider } from "../../i18n";
import { FormattedMessage } from "react-intl";
 //Button back
const ButtonB = props => {
  return (
    <I18nProvider locale={props.language}>
      <nav>
        <Link exact to={props.path}>
          <button className="explore-button"><FormattedMessage id="Back"/>
            <div className="arrow-icon-back"></div>
          </button>
        </Link>
      </nav>
    </I18nProvider>
  );
};

export default ButtonB;
