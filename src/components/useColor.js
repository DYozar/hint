"use client"

import React, { useState, useEffect } from 'react';

const useColor = () => {
  const [bgColor, setbgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [complementaryTextColor, setComplementaryTextColor] = useState('');

  useEffect(() => {
    const generateColors = () => {
      const hue = Math.floor(Math.random() * 360);
      const bgColor = getRandomAccentColor(hue);
      const textColor = getContrastingTextColor(bgColor);
      const compTextColor = getComplementaryTextColor(bgColor);

      setbgColor(bgColor);
      setTextColor(textColor);
      setComplementaryTextColor(compTextColor);
    };

    generateColors();
  }, []); // Run only once on component mount

  const getRandomAccentColor = (hue) => {
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    return generateColor(hue, saturation, lightness);
  };  
  const generateColor = (hue, saturation, lightness) => {
    const hslToRgb = (h, s, l) => {
      h /= 360;
      s /= 100;
      l /= 100;
  
      let r, g, b;
  
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hueToRgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
  
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
  
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
      }
  
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };
  
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
  
    // Convert RGB to hex
    const rgbToHex = (r, g, b) => {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
  
    return rgbToHex(r, g, b);
  }

  const getContrastingTextColor = (bgColor) => {
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
      };
    
      // Get RGB values from the background color
      const [bgR, bgG, bgB] = hexToRgb(bgColor);
    
      // Calculate Y component in YIQ color space
      const yiq = (bgR * 299 + bgG * 587 + bgB * 114) / 1000;
    
      // Choose white or black text color based on the brightness
      const textColor = yiq >= 128 ? '#000000' : '#ffffff';
    
      return textColor;
    }

  const getComplementaryTextColor = (bgColor) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
      };
    
      // Get RGB values from the background color
      const [bgR, bgG, bgB] = hexToRgb(bgColor);
    
      // Calculate complementary color
      const compR = 255 - bgR;
      const compG = 255 - bgG;
      const compB = 255 - bgB;
    
      // Convert complementary color to hex
      const rgbToHex = (r, g, b) => {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      };
    
      const complementaryTextColor = rgbToHex(compR, compG, compB);
    
      return complementaryTextColor;
    }

  return { bgColor, textColor, complementaryTextColor };
};


export default useColor
