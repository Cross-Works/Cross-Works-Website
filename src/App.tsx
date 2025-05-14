import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fallback from "./components/Fallback";

const Blocks = React.lazy(() => import("./components/Blocks"));
const NoPage = React.lazy(() => import("./pages/NoPage"));
const NewsPage = React.lazy(() => import("./pages/NewsPage"));
const SingleNews = React.lazy(() => import("./pages/SingleNewsPage"));

const App: React.FC = () => {

  return (

    <div>
      <Router>
        <Suspense fallback={<Fallback />}>
          <div>
            <Routes>
              <Route path="/" element={<Blocks />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:docId" element={<SingleNews />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
