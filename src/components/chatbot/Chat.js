import { ApiAiClient } from "api-ai-javascript";
import { applyMiddleware, createStore } from "redux";

const accessToken = "44c3a92e375d4cdbb6895a707b1343c9";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";

export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: { text, sender }
});

const messageMiddleware = () => next => action => {
  next(action);

  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;
    client
      .textRequest(text)
      .then(onSuccess)
      .catch(error => {
        console.log(error);
      });

    function onSuccess(response) {
      const {
        result: { fulfillment }
      } = response;
      console.log("je");
      console.log(response.result);
      next(sendMessage(fulfillment.speech, "bot"));
    }
  }
};

const initState = [{ text: "How can i help you ?" }];

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
