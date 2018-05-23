import axios from 'axios';

export const postScore = (value) => {
  return (dispatch) => {
    axios.post('/api/scores', { score: { value }})
      .then( res => dispatch({ type: 'HEADERS', headers: res.headers }) )
  }
}

export const rollDice = () => {
  return (dispatch, getState) => {
    let { keep, dice } = getState().currentGame;

    let newDice = dice.map( (d,i) => {
      if (keep.includes(i))
        return d
      return Math.floor(Math.random() *6 ) + 1
    });

    dispatch({ type: 'ROLL_DICE', dice: newDice })
  }
}

export const toggleKept = (i) => {
  return (dispatch, getState) => {
    let { keep } = getState().currentGame;
    let updatedKeep;

    if (keep.includes(i))
      updatedKeep = keep.filter( k => k !== i)
    else
      updatedKeep = [...keep, i]

    dispatch({ type: 'TOGGLE_KEPT', keep: updatedKeep })
  }
}

export const resetRoll = () => {
  return { type: 'RESET_ROLL' }
}

export const updateScores = (scores) => {
  return { type: 'UPDATE_SCORES', scores }
}

export const newGame = () => {
  return { type: 'NEW_GAME' }
}