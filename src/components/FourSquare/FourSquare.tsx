import React from "react";
import { FourSquareProps } from "./FourSquare.types";
import "./FourSquare.scss";

export const FourSquare: React.FC<FourSquareProps> = (props) => {

    let colors;

    console.log(typeof props.colors);
    if (props?.colors && props?.colors?.length === 4) {
        colors = props.colors;
    } else if(props.colors && typeof props.colors === "string") {
        colors = new Array(4).fill(props.colors);
        
    } else{
        colors = new Array(4).fill("limegreen");
    }
    const size: string = props?.size || "";
    
    return (
        <div className="d-i-b foursquare-bounding-box">
            <div className={`d-i-b foursquare-loader ${size}`}>

                <span className={`box1 ${size}`} style={{ backgroundColor: colors[0] }}></span>
                <span className={`box2 ${size}`} style={{ backgroundColor: colors[1] }}></span>
                <span className={`box3 ${size}`} style={{ backgroundColor: colors[2] }}></span>
                <span className={`box4 ${size}`} style={{ backgroundColor: colors[3] }}></span>

                
            </div>
        </div>
    );
}
