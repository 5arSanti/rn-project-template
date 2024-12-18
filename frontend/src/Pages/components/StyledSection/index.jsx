import { mainHome } from "../../../assets";
import "./styles.css"

const StyledSection = ({children, image, height="100vh", className=""}) => {

    return (
        <section 
            className={`styled-home-main-container ${className}`}
            id="about"
            style={{
                height: height,
            }}
        >
            <div className="gradient-container">
                {children}
            </div>

            <img src={image || mainHome} alt="Main home imagen"/>
        </section>
    );
}

export { StyledSection }