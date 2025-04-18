import { useNavigate } from "react-router-dom";
import Batton from "./Button";

function BackButton() {
    const navigate = useNavigate();

    return (
        <Batton type="back" onClick={(e) => {
                  e.preventDefault();
                  navigate(-1)}}>&larr; Back</Batton>
    );
}

export default BackButton;