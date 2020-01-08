import React, {Component} from 'react';
import PlayMix from './PlayMix';
import PlayButton from './PlayButton';

const Cover = ({name, pictures = {}, ...props}) => (
  <div
    className="w-50-l vh-100 flex items-center justify-center cover bg-center bg-featured fixed-l left-0 mix-overlay"
    style={{backgroundImage: `url(${pictures.extra_large})`}}
  >
    <PlayMix {...props}>
      <div className="w-100 tc pa3 relative z-2">
        <h5 className="b rubik white ttu f6">Featured Mix</h5>
        <h1 className="cover-title mt0 mb2 rubik white ttu">{name}</h1>
        <PlayButton />
      </div>
    </PlayMix>
  </div>
);

export default Cover;
