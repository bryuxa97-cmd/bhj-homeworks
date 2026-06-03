const POLL_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

const titleEl = document.getElementById('poll__title');
const answersEl = document.getElementById('poll__answers');

let pollId = null;

const loadXhr = new XMLHttpRequest();
loadXhr.open('GET', POLL_URL);
loadXhr.responseType = 'json';
loadXhr.addEventListener('load', () => {
  const poll = loadXhr.response;
  pollId = poll.id;
  showPoll(poll.data.title, poll.data.answers);
});
loadXhr.send();

function showPoll(title, answers) {
  titleEl.textContent = title;

  answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('poll__answer');
    button.textContent = answer;
    button.addEventListener('click', () => vote(index));
    answersEl.appendChild(button);
  });
}

function vote(answerIndex) {
  alert('Спасибо, ваш голос засчитан!');

  const voteXhr = new XMLHttpRequest();
  voteXhr.open('POST', POLL_URL);
  voteXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  voteXhr.responseType = 'json';
  voteXhr.addEventListener('load', () => {
    showResults(voteXhr.response.stat);
  });
  voteXhr.send(`vote=${pollId}&answer=${answerIndex}`);
}

function showResults(stat) {
  answersEl.classList.remove('poll__answers_active');
  answersEl.innerHTML = '';

  const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

  stat.forEach((item) => {
    const percent = totalVotes ? Math.round((item.votes / totalVotes) * 100) : 0;

    const result = document.createElement('div');
    result.classList.add('poll__result');
    result.textContent = `${item.answer}: ${percent}% (${item.votes})`;
    answersEl.appendChild(result);
  });
}
