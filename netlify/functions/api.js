const fs = require("fs");
const path = require("path");

const dbFilePath = path.resolve(__dirname, "../../db.json");
let data = require(dbFilePath);

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(data.posts),
    };
  }

  if (event.httpMethod === "POST") {
    try {
      const newPost = JSON.parse(event.body);
      data.posts.push(newPost);

      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));

      return {
        statusCode: 201,
        body: JSON.stringify(newPost),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save data" }),
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Not Found" }),
  };
};
