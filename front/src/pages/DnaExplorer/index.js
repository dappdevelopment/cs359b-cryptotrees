import React from 'react';
import CryptoTree from '../../components/CryptoTree';


const ZERO_TREE = {
  eyesSize: 0,
  eyesAsymmetricity: 0,
  eyesTilt: 0,
  legsSize: 0,
  mouthSize: 0,
  mouthTilt: 0,
  bodyWidth: 0,
  bodyColor: 0,
  mouthColor: 0,
  eyesColor: 0,
  legsColor: 0,
};

export default class DnaExplorer extends React.Component {
  state = {
    tree: ZERO_TREE,
  }

  handleChange = (key) => {
    if (!(key in ZERO_TREE)) throw new Error("Invalid tree property passed to this.handleChange");

    return (e) => {
      const newTree = {...this.state.tree};
      const newVal = parseInt(e.target.value, 10)
      newTree[key] = newVal;
      this.setState({tree: newTree});
    }
  }

  resetTree = () => {
    this.setState({tree: {...ZERO_TREE}});
  }

  render() {
    const { tree } = this.state;
    return (

      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Bio-X Genome Lab</h1>
        <CryptoTree tree={this.state.tree} />
        
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{width: '25%', marginBottom: 16}}>
            Eye size <br/>
            <input type="range" min={-20} max={20} value={tree.eyesSize} onChange={this.handleChange('eyesSize')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Mouth size <br/>
            <input type="range" min={-30} max={30} value={tree.mouthSize} onChange={this.handleChange('mouthSize')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Body width <br/>
            <input type="range" min={-100} max={100} value={tree.bodyWidth} onChange={this.handleChange('bodyWidth')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Leg size <br/>
            <input type="range" min={-30} max={30} value={tree.legsSize} onChange={this.handleChange('legsSize')} />
          </div>
          
          <div style={{width: '25%', marginBottom: 16}}>
            Eye color <br/>
            <input type="range" min={-180} max={180} value={tree.eyesColor} onChange={this.handleChange('eyesColor')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Mouth color <br/>
            <input type="range" min={-180} max={180} value={tree.mouthColor} onChange={this.handleChange('mouthColor')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Body color <br/>
            <input type="range" min={-180} max={180} value={tree.bodyColor} onChange={this.handleChange('bodyColor')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Leg color <br/>
            <input type="range" min={-180} max={180} value={tree.legsColor} onChange={this.handleChange('legsColor')} />
          </div>

          <div style={{width: '25%', marginBottom: 16}}>
            Eye tilt <br/>
            <input type="range" min={-30} max={30} value={tree.eyesTilt} onChange={this.handleChange('eyesTilt')} />
          </div>
          <div style={{width: '25%', marginBottom: 16}}>
            Mouth tilt <br/>
            <input type="range" min={-30} max={30} value={tree.mouthTilt} onChange={this.handleChange('mouthTilt')} />
          </div>
          <div style={{width: '50%'}}/>

          <div style={{width: '25%', marginBottom: 16}}>
            Eye asymmetry <br/>
            <input type="range" min={-15} max={15} value={tree.eyesAsymmetricity} onChange={this.handleChange('eyesAsymmetricity')} />
          </div>
          
        </div>

        <div style={{margin: '0', padding: '1em 4em'}}><button style={{margin: '0', padding: '1em 4em'}} onClick={this.resetTree}>Reset</button></div>

      </div>
    )
  }
}
