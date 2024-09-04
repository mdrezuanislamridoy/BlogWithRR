const data = require("../../db.json");

exports.handler = async (event, context) => {
  const { path } = event;

  if (path.includes("/posts")) {
    return {
      statusCode: 200,
      body: JSON.stringify(data.posts),
    };
  } else if (path.includes("/comments")) {
    return {
      statusCode: 200,
      body: JSON.stringify(data.comments),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Not Found" }),
  };
};
