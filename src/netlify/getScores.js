let scores = [];

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(scores),
  };
};
