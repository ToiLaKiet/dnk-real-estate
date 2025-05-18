import React, { useRef } from 'react';
import '../../styles/header.module.css'
function DualRangeSlider({ min, max, value, onChange, step, isPrice }) {
    const [minVal, maxVal] = value;
    const trackRef = useRef(null);
  
    const handleMouseDown = (e, isMin) => {
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const moveHandler = (moveEvent) => {
        const pos = (moveEvent.clientX - rect.left) / rect.width;
        let newVal = Math.round((min + pos * (max - min)) / step) * step;
        newVal = Math.max(min, Math.min(max, newVal));
        if (isMin) {
          onChange([Math.min(newVal, maxVal), maxVal]);
        } else {
          onChange([minVal, Math.max(minVal, newVal)]);
        }
      };
      const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      };
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);
    };
  
    const minPos = ((minVal - min) / (max - min)) * 100;
    const maxPos = ((maxVal - min) / (max - min)) * 100;
  
    return (
      <div className="dual-range-slider">
        <div className="range-track" ref={trackRef}>
          <div
            className="range-filled"
            style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
          />
          <div
            className="range-thumb range-thumb-min"
            style={{ left: `${minPos}%` }}
            onMouseDown={(e) => handleMouseDown(e, true)}
          />
          <div
            className="range-thumb range-thumb-max"
            style={{ left: `${maxPos}%` }}
            onMouseDown={(e) => handleMouseDown(e, false)}
          />
        </div>
        <div className="range-inputs">
          <input
            type="number"
            value={minVal}
            onChange={(e) => {
              const newMin = Number(e.target.value) || min;
              onChange([Math.min(newMin, maxVal), maxVal]);
            }}
            min={min}
            max={max}
            step={step}
            className="range-input-number"
          />
          <span className="range-input-separator">-</span>
          <input
            type="number"
            value={maxVal}
            onChange={(e) => {
              const newMax = Number(e.target.value) || max;
              onChange([minVal, Math.max(minVal, newMax)]);
            }}
            min={min}
            max={max}
            step={step}
            className="range-input-number"
          />
          {isPrice ? <span className="range-unit">VNĐ</span> : <span className="range-unit">m²</span>}
        </div>
      </div>
    );
  } 
export default DualRangeSlider;
