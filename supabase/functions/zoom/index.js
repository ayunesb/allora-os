"use strict";
/// <reference lib="deno.unstable" />
/// <reference types="https://deno.land/std@0.177.0/node/global.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
var supabase_js_2_7_1_1 = require("https://esm.sh/@supabase/supabase-js@2.7.1");
var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
var ZOOM_API_BASE = "https://api.zoom.us/v2";
var ZOOM_ACCOUNTS_BASE = "https://zoom.us/oauth";
var SUPABASE_URL = Deno.env.get("SUPABASE_URL");
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
var ZOOM_CLIENT_ID = Deno.env.get("ZOOM_CLIENT_ID");
var ZOOM_CLIENT_SECRET = Deno.env.get("ZOOM_CLIENT_SECRET");
(0, server_ts_1.serve)(function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var url, path, supabase, authHeader, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Handle CORS preflight requests
                if (req.method === "OPTIONS") {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 15, , 16]);
                url = new URL(req.url);
                path = url.pathname.split("/").pop();
                supabase = (0, supabase_js_2_7_1_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
                authHeader = req.headers.get("Authorization");
                if (authHeader) {
                    supabase.auth.setAuth(authHeader.replace("Bearer ", ""));
                }
                if (!(path === "auth-url")) return [3 /*break*/, 3];
                return [4 /*yield*/, handleAuthUrl(req)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                if (!(path === "auth-callback")) return [3 /*break*/, 5];
                return [4 /*yield*/, handleAuthCallback(req, supabase)];
            case 4: return [2 /*return*/, _a.sent()];
            case 5:
                if (!(path === "create-meeting")) return [3 /*break*/, 7];
                return [4 /*yield*/, handleCreateMeeting(req, supabase)];
            case 6: return [2 /*return*/, _a.sent()];
            case 7:
                if (!(path === "refresh-token")) return [3 /*break*/, 9];
                return [4 /*yield*/, handleRefreshToken(req, supabase)];
            case 8: return [2 /*return*/, _a.sent()];
            case 9:
                if (!(path === "webhook")) return [3 /*break*/, 11];
                return [4 /*yield*/, handleWebhook(req, supabase)];
            case 10: return [2 /*return*/, _a.sent()];
            case 11:
                if (!(path === "disconnect")) return [3 /*break*/, 13];
                return [4 /*yield*/, handleDisconnect(req, supabase)];
            case 12: return [2 /*return*/, _a.sent()];
            case 13: return [2 /*return*/, new Response(JSON.stringify({ error: "Not Found" }), {
                    status: 404,
                    headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                })];
            case 14: return [3 /*break*/, 16];
            case 15:
                error_1 = _a.sent();
                message = error_1 instanceof Error ? error_1.message : "Unknown error";
                console.error("Zoom function error:", message);
                return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                        status: 500,
                        headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    })];
            case 16: return [2 /*return*/];
        }
    });
}); });
function handleAuthUrl(req) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, redirectUri, companyId, state, authUrl, scopes, message;
        return __generator(this, function (_a) {
            try {
                searchParams = new URL(req.url).searchParams;
                redirectUri = searchParams.get("redirectUri");
                companyId = searchParams.get("companyId");
                if (!redirectUri || !companyId) {
                    throw new Error("Missing required parameters: redirectUri or companyId");
                }
                state = crypto.randomUUID();
                authUrl = new URL("".concat(ZOOM_ACCOUNTS_BASE, "/authorize"));
                authUrl.searchParams.append("response_type", "code");
                authUrl.searchParams.append("client_id", ZOOM_CLIENT_ID);
                authUrl.searchParams.append("redirect_uri", redirectUri);
                authUrl.searchParams.append("state", "".concat(state, "|").concat(companyId));
                scopes = [
                    "meeting:write:admin",
                    "meeting:read:admin",
                    "user:read:admin",
                ];
                authUrl.searchParams.append("scope", scopes.join(" "));
                return [2 /*return*/, new Response(JSON.stringify({ url: authUrl.toString() }), {
                        headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    })];
            }
            catch (error) {
                message = error instanceof Error ? error.message : "Unknown error";
                console.error("Error generating auth URL:", message);
                return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                        status: 400,
                        headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    })];
            }
            return [2 /*return*/];
        });
    });
}
function handleAuthCallback(req, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, code, stateParam, error, _a, state, companyId, tokenResponse, errorData, tokenData, expiresAt, upsertError, error_2, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    searchParams = new URL(req.url).searchParams;
                    code = searchParams.get("code");
                    stateParam = searchParams.get("state");
                    error = searchParams.get("error");
                    if (error) {
                        throw new Error("OAuth error: ".concat(error));
                    }
                    if (!code || !stateParam) {
                        throw new Error("Missing required parameters: code or state");
                    }
                    _a = stateParam.split("|"), state = _a[0], companyId = _a[1];
                    if (!companyId) {
                        throw new Error("Invalid state parameter");
                    }
                    return [4 /*yield*/, fetch("".concat(ZOOM_ACCOUNTS_BASE, "/token"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: "Basic ".concat(btoa("".concat(ZOOM_CLIENT_ID, ":").concat(ZOOM_CLIENT_SECRET))),
                            },
                            body: new URLSearchParams({
                                grant_type: "authorization_code",
                                code: code,
                                redirect_uri: searchParams.get("redirectUri") || "",
                            }),
                        })];
                case 1:
                    tokenResponse = _b.sent();
                    if (!!tokenResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, tokenResponse.json()];
                case 2:
                    errorData = _b.sent();
                    throw new Error("Token exchange failed: ".concat(errorData.error));
                case 3: return [4 /*yield*/, tokenResponse.json()];
                case 4:
                    tokenData = _b.sent();
                    expiresAt = new Date();
                    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .upsert({
                            company_id: companyId,
                            access_token: tokenData.access_token,
                            refresh_token: tokenData.refresh_token,
                            token_expires_at: expiresAt.toISOString(),
                            is_connected: true,
                            updated_at: new Date().toISOString(),
                            scope: tokenData.scope,
                        })];
                case 5:
                    upsertError = (_b.sent()).error;
                    if (upsertError) {
                        throw new Error("Failed to store Zoom integration: ".concat(upsertError.message));
                    }
                    return [2 /*return*/, new Response(JSON.stringify({ success: true, companyId: companyId }), {
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 6:
                    error_2 = _b.sent();
                    message = error_2 instanceof Error ? error_2.message : "Unknown error";
                    console.error("Error handling auth callback:", message);
                    return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                            status: 400,
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function handleRefreshToken(req, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var companyId, _a, integration, fetchError, tokenExpiresAt, now, refreshResponse, errorData, tokenData, expiresAt, updateError, error_3, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    companyId = (_b.sent()).companyId;
                    if (!companyId) {
                        throw new Error("Missing required parameter: companyId");
                    }
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .select("*")
                            .eq("company_id", companyId)
                            .single()];
                case 2:
                    _a = _b.sent(), integration = _a.data, fetchError = _a.error;
                    if (fetchError || !integration) {
                        throw new Error("Zoom integration not found for this company");
                    }
                    tokenExpiresAt = new Date(integration.token_expires_at);
                    now = new Date();
                    // If token is still valid, return success
                    if (tokenExpiresAt > now) {
                        return [2 /*return*/, new Response(JSON.stringify({ success: true, needsRefresh: false }), {
                                headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                            })];
                    }
                    return [4 /*yield*/, fetch("".concat(ZOOM_ACCOUNTS_BASE, "/token"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: "Basic ".concat(btoa("".concat(ZOOM_CLIENT_ID, ":").concat(ZOOM_CLIENT_SECRET))),
                            },
                            body: new URLSearchParams({
                                grant_type: "refresh_token",
                                refresh_token: integration.refresh_token,
                            }),
                        })];
                case 3:
                    refreshResponse = _b.sent();
                    if (!!refreshResponse.ok) return [3 /*break*/, 7];
                    return [4 /*yield*/, refreshResponse.json()];
                case 4:
                    errorData = _b.sent();
                    if (!(errorData.error === "invalid_grant")) return [3 /*break*/, 6];
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .update({ is_connected: false, updated_at: new Date().toISOString() })
                            .eq("company_id", companyId)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: throw new Error("Token refresh failed: ".concat(errorData.error));
                case 7: return [4 /*yield*/, refreshResponse.json()];
                case 8:
                    tokenData = _b.sent();
                    expiresAt = new Date();
                    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .update({
                            access_token: tokenData.access_token,
                            refresh_token: tokenData.refresh_token,
                            token_expires_at: expiresAt.toISOString(),
                            updated_at: new Date().toISOString(),
                        })
                            .eq("company_id", companyId)];
                case 9:
                    updateError = (_b.sent()).error;
                    if (updateError) {
                        throw new Error("Failed to update Zoom tokens: ".concat(updateError.message));
                    }
                    return [2 /*return*/, new Response(JSON.stringify({ success: true, needsRefresh: true }), {
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 10:
                    error_3 = _b.sent();
                    message = error_3 instanceof Error ? error_3.message : "Unknown error";
                    console.error("Error refreshing token:", message);
                    return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                            status: 400,
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function handleCreateMeeting(req, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, companyId, topic, agenda, startTime, duration, password, _b, integration, fetchError, tokenExpiresAt, now, accessToken, refreshResponse, errorData, tokenData, expiresAt, meetingResponse, errorData, meetingData, insertError, error_4, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 14, , 15]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _a = _c.sent(), companyId = _a.companyId, topic = _a.topic, agenda = _a.agenda, startTime = _a.startTime, duration = _a.duration, password = _a.password;
                    if (!companyId || !topic || !startTime) {
                        throw new Error("Missing required parameters");
                    }
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .select("*")
                            .eq("company_id", companyId)
                            .eq("is_connected", true)
                            .single()];
                case 2:
                    _b = _c.sent(), integration = _b.data, fetchError = _b.error;
                    if (fetchError || !integration) {
                        throw new Error("Zoom integration not found or not connected");
                    }
                    tokenExpiresAt = new Date(integration.token_expires_at);
                    now = new Date();
                    accessToken = integration.access_token;
                    if (!(tokenExpiresAt <= now)) return [3 /*break*/, 8];
                    return [4 /*yield*/, fetch("".concat(ZOOM_ACCOUNTS_BASE, "/token"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: "Basic ".concat(btoa("".concat(ZOOM_CLIENT_ID, ":").concat(ZOOM_CLIENT_SECRET))),
                            },
                            body: new URLSearchParams({
                                grant_type: "refresh_token",
                                refresh_token: integration.refresh_token,
                            }),
                        })];
                case 3:
                    refreshResponse = _c.sent();
                    if (!!refreshResponse.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, refreshResponse.json()];
                case 4:
                    errorData = _c.sent();
                    throw new Error("Token refresh failed: ".concat(errorData.error));
                case 5: return [4 /*yield*/, refreshResponse.json()];
                case 6:
                    tokenData = _c.sent();
                    accessToken = tokenData.access_token;
                    expiresAt = new Date();
                    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .update({
                            access_token: tokenData.access_token,
                            refresh_token: tokenData.refresh_token,
                            token_expires_at: expiresAt.toISOString(),
                            updated_at: new Date().toISOString(),
                        })
                            .eq("company_id", companyId)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8: return [4 /*yield*/, fetch("".concat(ZOOM_API_BASE, "/users/me/meetings"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(accessToken),
                        },
                        body: JSON.stringify({
                            topic: topic,
                            type: 2, // Scheduled meeting
                            start_time: startTime,
                            duration: duration || 60,
                            timezone: "UTC",
                            agenda: agenda || "",
                            password: password || "",
                            settings: {
                                host_video: true,
                                participant_video: true,
                                join_before_host: true,
                                mute_upon_entry: false,
                                waiting_room: false,
                                auto_recording: "none",
                            },
                        }),
                    })];
                case 9:
                    meetingResponse = _c.sent();
                    if (!!meetingResponse.ok) return [3 /*break*/, 11];
                    return [4 /*yield*/, meetingResponse.json()];
                case 10:
                    errorData = _c.sent();
                    throw new Error("Failed to create Zoom meeting: ".concat(errorData.message));
                case 11: return [4 /*yield*/, meetingResponse.json()];
                case 12:
                    meetingData = _c.sent();
                    return [4 /*yield*/, supabase
                            .from("company_zoom_meetings")
                            .insert({
                            company_id: companyId,
                            zoom_meeting_id: meetingData.id.toString(),
                            topic: meetingData.topic,
                            agenda: meetingData.agenda,
                            start_time: meetingData.start_time,
                            duration: meetingData.duration,
                            join_url: meetingData.join_url,
                            password: meetingData.password,
                        })];
                case 13:
                    insertError = (_c.sent()).error;
                    if (insertError) {
                        throw new Error("Failed to store meeting: ".concat(insertError.message));
                    }
                    return [2 /*return*/, new Response(JSON.stringify({
                            success: true,
                            meeting: {
                                id: meetingData.id,
                                topic: meetingData.topic,
                                start_time: meetingData.start_time,
                                join_url: meetingData.join_url,
                                password: meetingData.password,
                            },
                        }), {
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 14:
                    error_4 = _c.sent();
                    message = error_4 instanceof Error ? error_4.message : "Unknown error";
                    console.error("Error creating meeting:", message);
                    return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                            status: 400,
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function handleWebhook(req, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, error_5, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    payload = _a.sent();
                    console.log("Zoom webhook received:", JSON.stringify(payload));
                    if (!(payload.event === "meeting.updated")) return [3 /*break*/, 3];
                    return [4 /*yield*/, handleMeetingUpdated(payload, supabase)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(payload.event === "meeting.deleted")) return [3 /*break*/, 5];
                    return [4 /*yield*/, handleMeetingDeleted(payload, supabase)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, new Response(JSON.stringify({ received: true }), {
                        headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    })];
                case 6:
                    error_5 = _a.sent();
                    message = error_5 instanceof Error ? error_5.message : "Unknown error";
                    console.error("Error handling webhook:", message);
                    return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                            status: 400,
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function handleMeetingUpdated(payload, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var meetingId, meeting, error_6, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    meetingId = payload.payload.object.id.toString();
                    return [4 /*yield*/, supabase
                            .from("company_zoom_meetings")
                            .select("*")
                            .eq("zoom_meeting_id", meetingId)
                            .single()];
                case 1:
                    meeting = (_a.sent()).data;
                    if (!meeting) {
                        console.log("Meeting ".concat(meetingId, " not found in database"));
                        return [2 /*return*/];
                    }
                    // Update meeting details
                    return [4 /*yield*/, supabase
                            .from("company_zoom_meetings")
                            .update({
                            topic: payload.payload.object.topic,
                            start_time: payload.payload.object.start_time,
                            duration: payload.payload.object.duration,
                            updated_at: new Date().toISOString(),
                        })
                            .eq("zoom_meeting_id", meetingId)];
                case 2:
                    // Update meeting details
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    message = error_6 instanceof Error ? error_6.message : "Unknown error";
                    throw new Error(message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleMeetingDeleted(payload, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var meetingId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    meetingId = payload.payload.object.id.toString();
                    // Delete the meeting from our database
                    return [4 /*yield*/, supabase
                            .from("company_zoom_meetings")
                            .delete()
                            .eq("zoom_meeting_id", meetingId)];
                case 1:
                    // Delete the meeting from our database
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function handleDisconnect(req, supabase) {
    return __awaiter(this, void 0, void 0, function () {
        var companyId, _a, integration, fetchError, revokeError_1, deleteError, error_7, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    companyId = (_b.sent()).companyId;
                    if (!companyId) {
                        throw new Error("Missing required parameter: companyId");
                    }
                    return [4 /*yield*/, supabase
                            .from("company_zoom_integrations")
                            .select("access_token")
                            .eq("company_id", companyId)
                            .single()];
                case 2:
                    _a = _b.sent(), integration = _a.data, fetchError = _a.error;
                    if (!(!fetchError && integration)) return [3 /*break*/, 6];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fetch("".concat(ZOOM_ACCOUNTS_BASE, "/revoke"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                Authorization: "Basic ".concat(btoa("".concat(ZOOM_CLIENT_ID, ":").concat(ZOOM_CLIENT_SECRET))),
                            },
                            body: new URLSearchParams({
                                token: integration.access_token,
                            }),
                        })];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    revokeError_1 = _b.sent();
                    console.error("Error revoking token:", revokeError_1);
                    return [3 /*break*/, 6];
                case 6: return [4 /*yield*/, supabase
                        .from("company_zoom_integrations")
                        .delete()
                        .eq("company_id", companyId)];
                case 7:
                    deleteError = (_b.sent()).error;
                    if (deleteError) {
                        throw new Error("Failed to disconnect Zoom: ".concat(deleteError.message));
                    }
                    return [2 /*return*/, new Response(JSON.stringify({ success: true }), {
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 8:
                    error_7 = _b.sent();
                    message = error_7 instanceof Error ? error_7.message : "Unknown error";
                    console.error("Error disconnecting Zoom:", message);
                    return [2 /*return*/, new Response(JSON.stringify({ error: message }), {
                            status: 400,
                            headers: __assign(__assign({}, corsHeaders), { "Content-Type": "application/json" }),
                        })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
