import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helper/formHelpers";
import {withTranslation} from "react-i18next";

function FormButtons(props) {
    const { t } = props;
    const submitButtonLabel = props.formMode === formMode.NEW ? t('klient.form.add.pageTitle') : t('klient.form.edit.btnLabel');

    return (
        <div className="form-buttons">
            <p id="errorSummary" className="errors-text">{props.error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className="form-button-cancel">{t('klient.form.cancel')}</Link>
        </div>
    )
}

export default withTranslation() (FormButtons)