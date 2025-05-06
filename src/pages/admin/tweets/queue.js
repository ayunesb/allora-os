"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.default = TweetQueuePage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var sonner_1 = require("sonner");
function TweetQueuePage() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    queuedTweets = _a[0],
    setQueuedTweets = _a[1];
  var _b = (0, react_1.useState)(""),
    newTweetContent = _b[0],
    setNewTweetContent = _b[1];
  var _c = (0, react_1.useState)(new Date()),
    scheduledDate = _c[0],
    setScheduledDate = _c[1];
  (0, react_1.useEffect)(function () {
    var fetchTweets = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var mockData;
        return __generator(this, function (_a) {
          try {
            mockData = [
              {
                id: "1",
                content: "Excited to announce our new feature!",
                scheduledFor: "2023-05-15T12:00:00Z",
                status: "scheduled",
              },
              {
                id: "2",
                content: "Join our upcoming webinar on growth strategies",
                scheduledFor: "2023-05-20T15:30:00Z",
                status: "scheduled",
              },
            ];
            // Fix the unknown type issue by explicitly typing the data
            setQueuedTweets(mockData);
          } catch (error) {
            console.error("Error fetching queued tweets:", error);
            // Handle error state
          }
          return [2 /*return*/];
        });
      });
    };
    fetchTweets();
  }, []);
  var handleDelete = function (tweetId) {
    return __awaiter(_this, void 0, void 0, function () {
      var url, options, result;
      return __generator(this, function (_a) {
        try {
          url = "/api/tweets/".concat(tweetId);
          options = { method: "DELETE" };
          result = { success: true };
          if (result.success) {
            setQueuedTweets(function (prevTweets) {
              return prevTweets.filter(function (tweet) {
                return tweet.id !== tweetId;
              });
            });
            (0, sonner_1.toast)({
              title: "Tweet Removed",
              description: "The tweet has been removed from the queue.",
            });
          }
        } catch (error) {
          console.error("Error deleting tweet:", error);
          (0, sonner_1.toast)({
            title: "Error",
            description: "Failed to delete the tweet.",
            variant: "destructive",
          });
        }
        return [2 /*return*/];
      });
    });
  };
  var handleScheduleTweet = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var mockNewTweet_1;
      return __generator(this, function (_a) {
        if (!newTweetContent || !scheduledDate) {
          (0, sonner_1.toast)({
            title: "Error",
            description: "Please enter tweet content and select a date.",
            variant: "destructive",
          });
          return [2 /*return*/];
        }
        try {
          mockNewTweet_1 = {
            id: String(Date.now()),
            content: newTweetContent,
            scheduledFor: scheduledDate.toISOString(),
            status: "scheduled",
          };
          // Update state
          setQueuedTweets(function (prevTweets) {
            return __spreadArray(
              __spreadArray([], prevTweets, true),
              [mockNewTweet_1],
              false,
            );
          });
          setNewTweetContent("");
          setScheduledDate(new Date());
          (0, sonner_1.toast)({
            title: "Tweet Scheduled",
            description: "Your tweet has been scheduled successfully.",
          });
        } catch (error) {
          console.error("Error scheduling tweet:", error);
          (0, sonner_1.toast)({
            title: "Error",
            description: "Failed to schedule the tweet.",
            variant: "destructive",
          });
        }
        return [2 /*return*/];
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-4",
        children: "Tweet Queue",
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Schedule New Tweet",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Plan your tweets in advance",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "tweet-content",
                    children: "Tweet Content",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "tweet-content",
                    placeholder: "What's on your mind?",
                    value: newTweetContent,
                    onChange: function (e) {
                      return setNewTweetContent(e.target.value);
                    },
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    children: "Schedule Date",
                  }),
                  (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
                    children: [
                      (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          className: (0, utils_1.cn)(
                            "w-[240px] justify-start text-left font-normal",
                            !scheduledDate && "text-muted-foreground",
                          ),
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CalendarIcon,
                              { className: "mr-2 h-4 w-4" },
                            ),
                            scheduledDate
                              ? (0, date_fns_1.format)(scheduledDate, "PPP")
                              : (0, jsx_runtime_1.jsx)("span", {
                                  children: "Pick a date",
                                }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
                        className: "w-auto p-0",
                        align: "center",
                        side: "bottom",
                        children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
                          mode: "single",
                          selected: scheduledDate,
                          onSelect: setScheduledDate,
                          disabled: function (date) {
                            return date < new Date();
                          },
                          initialFocus: true,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleScheduleTweet,
                children: "Schedule Tweet",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Queued Tweets",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Manage your scheduled tweets",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "overflow-x-auto",
              children: (0, jsx_runtime_1.jsxs)("table", {
                className: "min-w-full divide-y divide-gray-200",
                children: [
                  (0, jsx_runtime_1.jsx)("thead", {
                    children: (0, jsx_runtime_1.jsxs)("tr", {
                      children: [
                        (0, jsx_runtime_1.jsx)("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Content",
                        }),
                        (0, jsx_runtime_1.jsx)("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Scheduled For",
                        }),
                        (0, jsx_runtime_1.jsx)("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Status",
                        }),
                        (0, jsx_runtime_1.jsx)("th", {
                          className:
                            "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)("tbody", {
                    className: "bg-white divide-y divide-gray-200",
                    children: queuedTweets.map(function (tweet) {
                      return (0, jsx_runtime_1.jsxs)(
                        "tr",
                        {
                          children: [
                            (0, jsx_runtime_1.jsx)("td", {
                              className: "px-6 py-4 whitespace-nowrap",
                              children: tweet.content,
                            }),
                            (0, jsx_runtime_1.jsx)("td", {
                              className: "px-6 py-4 whitespace-nowrap",
                              children: (0, date_fns_1.format)(
                                new Date(tweet.scheduledFor),
                                "PPP p",
                              ),
                            }),
                            (0, jsx_runtime_1.jsx)("td", {
                              className: "px-6 py-4 whitespace-nowrap",
                              children: tweet.status,
                            }),
                            (0, jsx_runtime_1.jsx)("td", {
                              className:
                                "px-6 py-4 whitespace-nowrap text-right",
                              children: (0, jsx_runtime_1.jsx)(
                                button_1.Button,
                                {
                                  variant: "ghost",
                                  size: "sm",
                                  onClick: function () {
                                    return handleDelete(tweet.id);
                                  },
                                  children: (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Trash2,
                                    { className: "h-4 w-4" },
                                  ),
                                },
                              ),
                            }),
                          ],
                        },
                        tweet.id,
                      );
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}
