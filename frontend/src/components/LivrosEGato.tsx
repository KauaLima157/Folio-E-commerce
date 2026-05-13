import { Shelf } from './Shelf';
import { Books } from './Books';
import { Cat } from './Cat';
import "../styles/LivrosEGato.css";
import * as React from "react";
import { useState } from "react";

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

interface SvgLivrosegatocompletoProps {
  onBookClick?: (genre: string) => void;
  onClick?: (genre: string) => void;
  style?: React.CSSProperties;
}

const SvgLivrosegatocompleto: React.FC<SvgLivrosegatocompletoProps> = (props) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: '',
    x: 0,
    y: 0
  });

  const handleHover = (text: string, e: React.MouseEvent) => setTooltip({
    visible: true,
    text,
    x: e.clientX,
    y: e.clientY
  });

  const handleMove = (e: React.MouseEvent) => setTooltip(prev => ({
    ...prev,
    x: e.clientX,
    y: e.clientY
  }));

  const handleLeave = () => setTooltip(prev => ({
    ...prev,
    visible: false
  }));

  const onBookClickFn = props.onBookClick || props.onClick || (() => {});

  return (
    <div className="livrosegato-container" style={props.style}>
      {tooltip.visible && (
        <div 
          style={{
            left: tooltip.x,
            top: tooltip.y
          }} 
          className="livrosegato-tooltip"
        >
          {tooltip.text}
        </div>
      )}
      <svg 
        width="123.81144mm" 
        height="72.504982mm" 
        viewBox="0 0 123.81144 72.504982" 
        id="svg1" 
        xmlSpace="preserve" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        xmlns="http://www.w3.org/2000/svg" 
        className="livros-style-3"
      >
        <defs id="defs1">
          <linearGradient id="swatch43">
            <stop offset={0} id="stop43" stopColor="#000000" stopOpacity={1} />
          </linearGradient>
          <linearGradient xlinkHref="#swatch43" id="linearGradient8" gradientUnits="userSpaceOnUse" gradientTransform="translate(116.6775,-231.68179)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
          <linearGradient xlinkHref="#swatch43" id="linearGradient9" gradientUnits="userSpaceOnUse" gradientTransform="translate(117.19652,-227.89695)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
          <linearGradient xlinkHref="#swatch43" id="linearGradient10" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.1285869,0,0,1.1285869,204.3842,-210.23132)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
          <linearGradient xlinkHref="#swatch43" id="linearGradient11" gradientUnits="userSpaceOnUse" gradientTransform="translate(-165.04558,0.96835981)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
          <linearGradient xlinkHref="#swatch43" id="linearGradient12" gradientUnits="userSpaceOnUse" gradientTransform="translate(-170.90268,-10.00184)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
          <linearGradient xlinkHref="#swatch43" id="linearGradient13" gradientUnits="userSpaceOnUse" gradientTransform="translate(-168.27936,-62.937514)" x1={23.510464} y1={177.61815} x2={24.860546} y2={177.61815} />
        </defs>
        <g id="layer1" transform="translate(-42.869275,-112.17875)">
          <g id="layer1-5" transform="translate(5.8658695,-43.221367)">
            <Shelf />
            <Books 
              handleHover={handleHover} 
              handleMove={handleMove} 
              handleLeave={handleLeave} 
              onBookClick={onBookClickFn} 
            />
          </g>
          <Cat />
        </g>
      </svg>
    </div>
  );
};

export default SvgLivrosegatocompleto;
