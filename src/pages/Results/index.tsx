import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Loader2, AlertCircle } from "lucide-react";
import "./results.css";
import { fakeApi, type Animal } from "../../services/fakeApi";

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(query);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<"empty" | "no-results" | "error" | null>(
    null
  );

  useEffect(() => {
    setSelectedId(null);
  }, [animals]);

  useEffect(() => {
    let alive = true;

    async function fetchAnimals() {
      if (!query.trim()) {
        if (!alive) return;
        setAnimals([]);
        setError("empty");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await fakeApi.searchAnimals(query);
        if (!alive) return;

        setAnimals(results);

        if (results.length === 0) {
          setError("no-results");
        }
      } catch (err) {
        console.error("Search error:", err);
        if (!alive) return;
        setError("error");
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchAnimals();
    return () => {
      alive = false;
    };
  }, [query]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      setError("empty");
      return;
    }
    navigate(`/results?search=${encodeURIComponent(term)}`);
  }

  function toggleDetails(id: number) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  const selectedAnimal = animals.find((animal) => animal.id === selectedId);

  return (
    <div className="results-page">
      <header className="results-header">
        <div className="container">
          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search animals..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search animals"
            />
            <button type="submit" aria-label="Search">
              <Search size={20} />
            </button>
          </form>
        </div>
      </header>

      <main className="container results-container">
        {loading && (
          <div className="state-message">
            <Loader2 className="spinner" size={48} />
            <p>Searching for animals...</p>
          </div>
        )}

        {!loading && error === "empty" && (
          <div className="state-message error">
            <AlertCircle size={48} />
            <h2>No search term provided</h2>
            <p>Please enter a search term to find animals</p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Go back to search
            </button>
          </div>
        )}

        {!loading && error === "no-results" && (
          <div className="state-message">
            <AlertCircle size={48} />
            <h2>No results found</h2>
            <p>
              We couldn't find any animals matching <strong>"{query}"</strong>
            </p>
            <button onClick={() => navigate("/")} className="btn-secondary">
              Try another search
            </button>
          </div>
        )}

        {!loading && error === "error" && (
          <div className="state-message error">
            <AlertCircle size={48} />
            <h2>Something went wrong</h2>
            <p>Please try again in a moment.</p>
          </div>
        )}

        {!loading && !error && animals.length > 0 && (
          <>
            <div className="results-header-info">
              <h1>
                Found <strong>{animals.length}</strong> results for{" "}
                <span className="brand-accent">{query}</span>
              </h1>
            </div>

            <ul className="results-list">
              {animals.map((animal) => (
                <li key={animal.id} className="result-item">
                  <button
                    className="result-title-btn"
                    onClick={() => toggleDetails(animal.id)}
                    aria-expanded={selectedId === animal.id}
                  >
                    <h2>{animal.title}</h2>
                    <span className="animal-type">{animal.type}</span>
                  </button>

                  {selectedId === animal.id && selectedAnimal && (
                    <div className="result-details">
                      <img
                        src={selectedAnimal.image}
                        alt={selectedAnimal.title}
                        loading="lazy"
                      />
                      <div>
                        <p>{selectedAnimal.description}</p>

                        <a
                          href={selectedAnimal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="details-link"
                        >
                          Learn more →
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="back-to-home">
              <button onClick={() => navigate("/")} className="btn-secondary">
                ← Back to Home
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
