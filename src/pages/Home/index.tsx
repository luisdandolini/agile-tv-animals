import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import "./home.css";

export default function HomePage() {
  const [term, setTerm] = useState("");
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const query = term.trim();

    if (!query) {
      setShowHint(true);
      inputRef.current?.focus();
      return;
    }

    navigate(`/results?search=${encodeURIComponent(query)}`);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    if (showHint) {
      setShowHint(false);
    }
  }

  const suggestions = ["Lion", "Eagle", "Bear", "Shark"];

  function handleSuggestionClick(suggestion: string) {
    setTerm(suggestion);
    setTimeout(() => {
      navigate(`/results?search=${encodeURIComponent(suggestion)}`);
    }, 150);
  }

  return (
    <section className="home-hero">
      <div className="container hero-inner">
        <div className="hero-icon-wrapper">
          <Sparkles className="hero-icon" size={48} aria-hidden="true" />
        </div>

        <h1 className="home-title">
          Find your <span className="brand-accent">wild</span> companion
        </h1>

        <p className="home-subtitle muted">
          Search animals by <strong>title</strong> or <strong>type</strong>
        </p>

        <form
          className="home-search"
          role="search"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="search-wrapper">
            <label htmlFor="home-search" className="sr-only">
              Search animals
            </label>
            <input
              ref={inputRef}
              id="home-search"
              name="home-search"
              type="text"
              placeholder="Lion, cat, dog, bird…"
              value={term}
              onChange={handleInputChange}
              autoComplete="off"
              aria-label="Search animals by title or type"
              aria-describedby={showHint ? "search-hint" : undefined}
              className={showHint ? "input-error" : ""}
            />
            <button type="submit" className="search-button" aria-label="Search">
              <Search size={20} aria-hidden="true" />
              <span className="search-button-text">Search</span>
            </button>
          </div>

          {showHint && (
            <div
              id="search-hint"
              className="search-hint"
              role="alert"
              aria-live="polite"
            >
              Please enter a search term to continue
            </div>
          )}
        </form>

        <div className="quick-suggestions">
          <span className="suggestions-label muted">Try searching:</span>
          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(suggestion)}
                aria-label={`Search for ${suggestion}`}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
