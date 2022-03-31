// gobal.DEBUGB = true;
const http = require("http");
const { parse } = require("querystring");
const { newToken } = require("./token");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    collectRequestData(req, (result) => {
      var theToken = newToken(result.username);
      res.end(`${result.username} token is ${theToken}`);
    });
  } else {
    res.end(`
        <!DOCTYPE html>
        <html>
        <body>
            <form action="/" method="post">
                <input type="text" name="username" placeholder="username"><br/>
                <button>Submit</button>
            </form>
        </body>
        </html>
        `);
  }
});

server.listen(3000);
console.log("listen on port 3000");

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
