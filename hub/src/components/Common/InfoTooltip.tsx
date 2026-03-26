import React from 'react';

interface InfoTooltipProps {
  title: string;
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, content }) => {
  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <div className="info-icon">i</div>
      <div className="info-tooltip-content">
        <div className="text-[0.65rem] font-bold text-cyan-400 uppercase tracking-wider mb-1">
          {title}
        </div>
        <div className="text-[0.7rem] text-white/80 leading-relaxed font-medium">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
