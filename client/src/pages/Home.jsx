import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="home-panel" aria-labelledby="home-title">
      <h1 id="home-title">Your leads</h1>
      <p>
        Pick up a conversation where you left off, or add someone
        you’ve just met.
      </p>

      <div className="home-actions">
        <Link className="home-action home-action-primary" to="/view-leads">
          View all leads <span aria-hidden="true">→</span>
        </Link>

        <Link className="home-action home-action-secondary" to="/add-lead">
          <span aria-hidden="true">+</span> Add a lead
        </Link>
      </div>
    </section>
  );
};