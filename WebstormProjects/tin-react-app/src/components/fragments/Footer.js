import React from "react";


class Footer extends React.Component
{
    handleLanguageChange = (language) => {
        const {i18n} = this.props;
        i18n.changeLanguage(language,(err,t) => {
            if(err) return console.log("some went wrong",err)
        });

    }
    render() {
        return (
            <div>
                <footer>
                    Solodkyi Anton s20738
                </footer>
            </div>
        )}
}
export default Footer;