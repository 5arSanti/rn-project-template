/* eslint-disable react/prop-types */
import "./styles.css";

const Title = ({
    children, 
    white = false, 
    className = "", 
    padding = 15, 
    fontSize = 50, 
    textAlign = "center",
    width = "100%"
}) => {
    return (
        <div className="title-container" style={{
            padding: padding,
            width: width
        }}>
            <h1 
                className={`title archivo-font ${white && "white-color"} ${className}`}
                style={{
                    fontSize: fontSize,
                    textAlign: textAlign,
                }}
            >
                {children}
            </h1>
        </div>
    );
}

export { Title };