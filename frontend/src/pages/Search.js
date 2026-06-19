import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/search";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import ResultsPageHeader from "../components/Product/ResultsPageHeader";
import ProductGrid from "../components/Product/ProductGrid";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const [values, setValues] = useSearch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(values.keyword || searchParams.get("q") || "");
  const [loading, setLoading] = useState(false);

  const results = values.results || [];

  const runSearch = async (keyword) => {
    const term = keyword?.trim();
    if (!term) return;
    setLoading(true);
    try {
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.SEARCH(term));
      setValues({ keyword: term, results: data });
      navigate(`/search?q=${encodeURIComponent(term)}`, { replace: true });
    } catch (error) {
      console.error(error);
      setValues({ keyword: term, results: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") || values.keyword;
    if (q && (!values.results?.length || values.keyword !== q)) {
      setQuery(q);
      runSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <Layout title={`Search${query ? `: ${query}` : ""} — ShopHub`}>
      <section className="section-padding bg-surface-muted min-h-[calc(100vh-12rem)]">
        <div className="max-w-8xl mx-auto container-padding">
          <ResultsPageHeader
            title={query ? `Results for "${query}"` : "Search Products"}
            subtitle="Find exactly what you're looking for"
            count={loading ? undefined : results.length}
            icon={<AiOutlineSearch size={22} />}
          />

          <form onSubmit={handleSubmit} className="mb-8 max-w-xl">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands..."
                  icon={<AiOutlineSearch size={18} />}
                />
              </div>
              <Button type="submit" variant="primary" loading={loading} className="self-end mb-0 h-[46px]">
                Search
              </Button>
            </div>
          </form>

          {!loading && !query.trim() ? (
            <div className="bg-white rounded-2xl border border-border p-12 text-center">
              <AiOutlineSearch size={48} className="text-primary-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-500 mb-2">
                Start searching
              </h3>
              <p className="text-sm text-primary-400 mb-6">
                Enter a product name or brand above to see results
              </p>
              <Link to="/products">
                <Button variant="outline">Browse All Products</Button>
              </Link>
            </div>
          ) : (
            <ProductGrid
              products={results}
              loading={loading}
              columns={4}
              emptyTitle="No products found"
              emptyDescription={
                query
                  ? `We couldn't find anything matching "${query}". Try different keywords.`
                  : "Try a different search term."
              }
              emptyActionText="Browse All Products"
              onEmptyAction={() => navigate("/products")}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
