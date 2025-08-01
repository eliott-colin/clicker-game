let scores = [];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, score } = JSON.parse(event.body);

  if (!name || typeof score !== 'number') {
    return { statusCode: 400, body: 'Invalid data' };
  }

  scores.push({ name, score });

  // Tri décroissant
  scores.sort((a, b) => b.score - a.score);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Score saved', scores }),
  };
};
