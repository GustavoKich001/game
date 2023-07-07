const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
  .map((score, index) => {
    return `<li class="high-score">${index + 1}. ${score.name} - ${score.score}</li>`;
  })
  .join('');

const clearScoresBtn = document.querySelector('#clearScoresBtn');

clearScoresBtn.addEventListener('click', clearHighScores);

function clearHighScores() {
  localStorage.removeItem('highScores');
  highScoresList.innerHTML = '';
};
