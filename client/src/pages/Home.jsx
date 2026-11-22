import { Link } from "react-router-dom";
export const Home = () => {
    return (
        <div>
            <center><h1>Welcome to the Home Page</h1>
            <p>This is the home page of the application.</p>
            <button><Link to="/add-lead">Add a new lead</Link></button>
            <button><Link to="/view-leads">View all leads</Link></button></center>
        </div>
    )
}