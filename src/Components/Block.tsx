
import React from "react";
import '../styles/block.css';

interface BlockProps {
  value: string | null;
  onClick: () => void;
  "data-testid"?: string; 
}

const Block: React.FC<BlockProps> = (props) => {
  return (
    <button 
      className="block" 
      onClick={props.onClick} 
      data-testid={props["data-testid"]}
    >
      {props.value}
    </button>
  );
};

export default Block;
