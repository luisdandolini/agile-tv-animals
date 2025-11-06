import { PawPrint } from "lucide-react";
import "./header.css";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Animal Search - homepage">
          <PawPrint aria-hidden="true" />
          <span className="brand-text">
            Animal<span className="brand-accent">Search</span>
          </span>
        </a>
      </div>
    </header>
  );
}
