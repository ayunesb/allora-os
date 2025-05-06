"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTextToSpeech = useTextToSpeech;
var react_1 = require("react");
function useTextToSpeech() {
  var _a = (0, react_1.useState)(false),
    isPlaying = _a[0],
    setIsPlaying = _a[1];
  var _b = (0, react_1.useState)(null),
    currentUtterance = _b[0],
    setCurrentUtterance = _b[1];
  // Initialize speech synthesis
  var synth = window.speechSynthesis;
  // Generate and play speech
  var generateAndPlay = (0, react_1.useCallback)(
    function (text, options) {
      if (options === void 0) {
        options = {};
      }
      if (!synth) {
        console.error("Speech synthesis not supported in this browser");
        return;
      }
      // Stop any current speech
      stop();
      // Create a new utterance
      var utterance = new SpeechSynthesisUtterance(text);
      // Set voice if specified
      if (options.voice) {
        var voices = synth.getVoices();
        var selectedVoice = voices.find(function (v) {
          return v.name.toLowerCase().includes(options.voice.toLowerCase());
        });
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      // Set other options
      if (options.pitch !== undefined) utterance.pitch = options.pitch;
      if (options.rate !== undefined) utterance.rate = options.rate;
      if (options.volume !== undefined) utterance.volume = options.volume;
      // Set event handlers
      utterance.onstart = function () {
        return setIsPlaying(true);
      };
      utterance.onend = function () {
        setIsPlaying(false);
        setCurrentUtterance(null);
      };
      utterance.onerror = function (event) {
        console.error("Speech synthesis error:", event);
        setIsPlaying(false);
        setCurrentUtterance(null);
      };
      // Store the utterance
      setCurrentUtterance(utterance);
      // Start speaking
      synth.speak(utterance);
      setIsPlaying(true);
      return utterance;
    },
    [synth],
  );
  // Pause the current speech
  var pause = (0, react_1.useCallback)(
    function () {
      if (synth && isPlaying) {
        synth.pause();
        setIsPlaying(false);
      }
    },
    [synth, isPlaying],
  );
  // Resume the current speech
  var resume = (0, react_1.useCallback)(
    function () {
      if (synth && !isPlaying && currentUtterance) {
        synth.resume();
        setIsPlaying(true);
      }
    },
    [synth, isPlaying, currentUtterance],
  );
  // Stop the current speech
  var stop = (0, react_1.useCallback)(
    function () {
      if (synth) {
        synth.cancel();
        setIsPlaying(false);
        setCurrentUtterance(null);
      }
    },
    [synth],
  );
  // Get available voices
  var getVoices = (0, react_1.useCallback)(
    function () {
      if (!synth) return [];
      return synth.getVoices();
    },
    [synth],
  );
  return {
    generateAndPlay: generateAndPlay,
    pause: pause,
    resume: resume,
    stop: stop,
    getVoices: getVoices,
    isPlaying: isPlaying,
  };
}
