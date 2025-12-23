// ReelSlider.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReels } from '../REDUX/slices/reelsSlice';
import SingleReel from './SingleReel';
import '../CSS/Reels.css';

function ReelSlider() {
  const dispatch = useDispatch();
  const reels = useSelector((s) => s.reelsInFeedSlice.reels);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);       
  const itemRefs = useRef([]);              
  const videoHandles = useRef([]);          

  useEffect(() => {
    dispatch(getReels());
  }, [dispatch]);

  console.log(reels)

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, reels?.length || 0);
    videoHandles.current = videoHandles.current.slice(0, reels?.length || 0);
  }, [reels]);

  useEffect(() => {
    const container = containerRef.current || window;
    let ticking = false;

    const getClosestIndex = () => {
      const viewportCenter = window.innerHeight / 2;
      let minDist = Infinity;
      let closest = 0;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }
      return closest;
    };

    const applyPlayPause = (activeIndex) => {
      for (let i = 0; i < videoHandles.current.length; i++) {
        const handle = videoHandles.current[i];
        if (!handle) continue;
        if (i === activeIndex) {
          handle.play?.();
        } else {
          handle.pause?.();
          handle.reset?.();
        }
      }
    };

    const handleScroll = () => {
      const closest = getClosestIndex();
      if (closest !== currentIndex) {
        setCurrentIndex(closest);
        applyPlayPause(closest);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    setTimeout(() => {
      const initial = getClosestIndex();
      setCurrentIndex(initial);
      applyPlayPause(initial);
    }, 50);

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [reels, currentIndex]);

  return (
    <div className="scroll-container" ref={containerRef}>
      {reels?.map((reel, index) => (
        <div
          key={index}
          data-index={index}
          className="snap-item"
          ref={(el) => (itemRefs.current[index] = el)}
        >
          <SingleReel
            reel={reel}
            ref={(handle) => (videoHandles.current[index] = handle)}
          />
        </div>
      ))}
    </div>
  );
}

export default ReelSlider;
