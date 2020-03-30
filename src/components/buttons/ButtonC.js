import React from "react";
import "../../App.scss";
import arrow from "../../images/arrow-right.svg";
import { Link } from "react-router-dom";
import { I18nProvider } from "../../i18n";
import { FormattedMessage } from "react-intl";

//button continue
const ButtonC = props => {
  return (
    <I18nProvider locale={props.language}>
      <nav>
        <Link exact to={props.path}>
          <div className="btn-row">
            <button className="explore-button">
              {" "}
              <FormattedMessage id={props.content} />
              <div className="arrow-icon">
                <img src={arrow} alt="row" />
              </div>
            </button>
          </div>
        </Link>
      </nav>
    </I18nProvider>
  );
};

export default ButtonC;
