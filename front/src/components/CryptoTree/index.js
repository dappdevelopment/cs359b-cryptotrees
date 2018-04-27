import React from 'react';

import body from './sprites/body.png';
import legs from './sprites/legs.png';
import eyeR from './sprites/eye-R.png';
import eyeL from './sprites/eye-L.png';
import mouth from './sprites/mouth.png';


export default class CryptoTree extends React.Component {
  render() {
    const { tree, size } = this.props;

    const eyesWidth = 50 + tree.eyesSize;

    const leftEyeWidth = eyesWidth + tree.eyesAsymmetricity
    const leftEyePositionOffset = -1 * (leftEyeWidth / 2);
    const rightEyeWidth = eyesWidth - tree.eyesAsymmetricity
    const rightEyePositionOffset = -1 * (rightEyeWidth / 2);

    const leftEyeTilt = tree.eyesTilt;
    const rightEyeTilt = -1 * tree.eyesTilt;

    const mouthWidth = 120 + tree.mouthSize;
    const mouthPositionOffset = -1 * (tree.mouthSize / 2);

    const legsWidth = 170 + tree.legsSize;
    const legsPositionOffset = -1 * (tree.legsSize / 2);

    const mouthTilt = tree.mouthTilt;

    const bodyWidth = 300 + tree.bodyWidth;

    const hueRotateMouth = tree.mouthColor;
    const hueRotateBody = tree.bodyColor;
    const hueRotateEyes = tree.eyesColor;
    const hueRotateLegs = tree.legsColor;

    const scale = (size != null) ? size/400 : 1;
    const offset = (size != null) ? 1/2 * (size - 400) : 0;

    return (
      <div style={{height: size, width: size}}>
        <div style={{transform: `scale(${scale})`, position: 'relative', textAlign: 'center', height: 400, width: 400, top: offset, left: offset}}>
          <img 
            src={body} 
            alt="Body" 
            style={{
              width: bodyWidth, 
              height: 300, 
              margin: '0 auto', 
              position: 'relative', 
              zIndex: 200, 
              filter: `hue-rotate(${hueRotateBody}deg)`
            }} />

          <img 
            src={legs} 
            alt="Legs" 
            style={{
              width: legsWidth, 
              position: 'absolute', 
              bottom: 50, 
              left: 100 + legsPositionOffset, 
              zIndex: 100, 
              filter: `hue-rotate(${hueRotateLegs}deg)`
            }} />

          <img
            src={eyeR}
            alt="Right eye"
            style={{
              width: rightEyeWidth,
              position: 'absolute',
              top: 120 + rightEyePositionOffset,
              left: 230 + rightEyePositionOffset,
              zIndex: 220,
              transform: `rotate(${rightEyeTilt}deg)`,
              filter: `hue-rotate(${hueRotateEyes}deg)`
            }} />
          <img
            src={eyeL}
            alt="Left eye"
            style={{
              width: leftEyeWidth,
              position: 'absolute',
              top: 120 + leftEyePositionOffset,
              left: 175 + leftEyePositionOffset,
              zIndex: 210,
              transform: `rotate(${leftEyeTilt}deg)`,
              filter: `hue-rotate(${hueRotateEyes}deg)`
            }} />

          <img src={mouth}
            alt="Mouth"
            style={{
              width: mouthWidth,
              position: 'absolute',
              top: 210 + mouthPositionOffset,
              left: 140 + mouthPositionOffset,
              zIndex: 200,
              transform: `rotate(${mouthTilt}deg)`, 
              filter: `hue-rotate(${hueRotateMouth}deg)`
            }} />
        </div>
      </div>
    );
  }
}
