import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-col">
          <div className="footer-brand">
            Animal<span className="brand-accent">Search</span>
            <span className="muted">© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
