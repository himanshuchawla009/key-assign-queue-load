


function keyAssignResponseHandler(requestParams, response, context, ee, next) {
    const body = JSON.parse(response.body || "{}");
    if (body?.processingTime > 10) {
        throw new Error("Queue is under heavy load plz report this issue if you are sending load within limits")
    }
    next();
  }

  module.exports = {
    keyAssignResponseHandler
  }