import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fallback from "./components/Fallback";
import { ContentProvider } from "./context/Content";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const NoPage = React.lazy(() => import("./pages/NoPage"));
const NewsPage = React.lazy(() => import("./pages/NewsPage"));
const CitiesPanel = React.lazy(() => import("./components/CitiesPanel"));
const TechPanel = React.lazy(() => import("./components/TechPanel"));
const SingleNews = React.lazy(() => import("./pages/SingleNewsPage"));

const App: React.FC = () => {

  return (
    <div>
      <ContentProvider>
        <Router>
          <Suspense fallback={<Fallback />}>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/cities" element={<CitiesPanel />} />
                <Route path="/tech" element={<TechPanel />} />
                <Route path="/news/:docId" element={<SingleNews />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </Suspense>
        </Router>
      </ContentProvider>
    </div>
  );
};

export default App;
