import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import ImageSlider from "./ImageSlider";
import { IntroductionSection } from "./IntroductionSection";
import Updates from "./Updates";
import Events from "./Events/Events";
import AboutUniversity from "./AboutUniversity";
import Course from "./Course";
import LatestUpdate from "./LatestUpdate";

const Cardslider = lazy(() => import("./Cardslider"));
const Exclnews = lazy(() => import("../News/Exclnews"));

export const Home = () => {
  const [exclusiveNews, setExclusiveNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchExclusiveNews = async () => {
      try {
        const response = await axios.get("https://jec.edu.np/api/exclusive-news/");
        const news = response.data;

        if (news.length > 0) {
          setExclusiveNews(news.reverse()); 
        }
      } catch (error) {
        console.error("Error fetching exclusive news:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchExclusiveNews();
  }, []);

  return (
    <div className="w-[94%] mx-auto">
      <IntroductionSection />
      <Updates />
      <LatestUpdate />
      <Events />
      <AboutUniversity />
      <ImageSlider />
      <Course />
      <Suspense fallback={<div>Loading Cardslider...</div>}>
        <Cardslider />
      </Suspense>

      {exclusiveNews.length > 0 && (
        <Suspense fallback={<div>Loading Exclusive News...</div>}>
          <Exclnews newsItems={exclusiveNews} />
        </Suspense>
      )}
    </div>
  );
};

export default Home;