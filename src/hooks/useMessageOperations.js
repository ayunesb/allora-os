"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessageOperations = useMessageOperations;
var react_1 = require("react");
function useMessageOperations() {
  var _a = (0, react_1.useState)([]),
    messages = _a[0],
    setMessages = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)([]),
    favorites = _c[0],
    setFavorites = _c[1];
  var addMessage = (0, react_1.useCallback)(function (message) {
    setMessages(function (prevMessages) {
      return __spreadArray(
        __spreadArray([], prevMessages, true),
        [message],
        false,
      );
    });
  }, []);
  var addSystemMessage = (0, react_1.useCallback)(
    function (content) {
      var systemMessage = {
        id: "msg-".concat(Date.now()),
        sender: "System",
        senderId: "system",
        content: content,
        timestamp: new Date(),
        isUser: false,
        votes: 0,
        isFavorite: false,
      };
      addMessage(systemMessage);
      return systemMessage;
    },
    [addMessage],
  );
  var voteMessage = (0, react_1.useCallback)(function (messageId, increment) {
    setMessages(function (prevMessages) {
      return prevMessages.map(function (message) {
        return message.id === messageId
          ? __assign(__assign({}, message), {
              votes: (message.votes || 0) + (increment ? 1 : -1),
            })
          : message;
      });
    });
  }, []);
  var toggleFavorite = (0, react_1.useCallback)(function (messageId) {
    setMessages(function (prevMessages) {
      return prevMessages.map(function (message) {
        return message.id === messageId
          ? __assign(__assign({}, message), { isFavorite: !message.isFavorite })
          : message;
      });
    });
    setFavorites(function (prevFavorites) {
      if (prevFavorites.includes(messageId)) {
        return prevFavorites.filter(function (id) {
          return id !== messageId;
        });
      } else {
        return __spreadArray(
          __spreadArray([], prevFavorites, true),
          [messageId],
          false,
        );
      }
    });
  }, []);
  return {
    messages: messages,
    favorites: favorites,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    setMessages: setMessages,
    addMessage: addMessage,
    addSystemMessage: addSystemMessage,
    voteMessage: voteMessage,
    toggleFavorite: toggleFavorite,
  };
}
