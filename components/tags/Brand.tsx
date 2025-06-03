import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Brand() {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate("/")}>Brand</Button>
    )
}