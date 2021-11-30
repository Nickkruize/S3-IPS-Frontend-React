import { Spinner } from "reactstrap"

export default function Loader() {
    return (
        <div data-testid="LoadingMessage" style={{ textAlign: "center", marginTop: "25%" }}>
            <Spinner animation="border" children={false} style={{ color: "green", width: '5rem', height: "5rem" }} />
        </div>
    )
}