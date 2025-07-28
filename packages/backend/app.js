"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoDeleteRoutes_1 = __importDefault(require("./src/routes/autoDeleteRoutes"));
console.log("Auto delete routes initialized");

const remindersRoutes_1 = __importDefault(require("./src/routes/remindersRoutes"));


const feedbackRouts_1 = __importDefault(require("./src/routes/feedbackRouts"));
const aIInsightRouts_1 = __importDefault(require("./src/routes/aIInsightRouts"));
const answerRouts_1 = __importDefault(require("./src/routes/answerRouts"));
const sharedRecordingRouts_1 = __importDefault(require("./src/routes/sharedRecordingRouts"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const questionRouts_1 = __importDefault(require("./src/routes/questionRouts"));
const sharedRecordingRouts_2 = __importDefault(require("./src/routes/sharedRecordingRouts"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouts_1 = __importDefault(require("./src/routes/userRouts"));
const authRouts_1 = __importDefault(require("./src/routes/authRouts"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import {supabase} from './src/config/dbConnection';
const statusRoutes_1 = __importDefault(require("./src/routes/statusRoutes"));
const categoryRoutes_1 = __importDefault(require("./src/routes/categoryRoutes"));
const aIInsightRouts_2 = __importDefault(require("./src/routes/aIInsightRouts"));
const resourceRouts_1 = __importDefault(require("../backend/src/routes/resourceRouts"));
const questionRouts_2 = __importDefault(require("./src/routes/questionRouts"));
const statusRoutes_2 = __importDefault(require("../backend/src/routes/statusRoutes"));
const dynamicContentRoutes_1 = __importDefault(require("./src/routes/dynamicContentRoutes")); 
const answerRouts_2 = __importDefault(require("./src/routes/answerRouts"));
const aIInsightRouts_3 = __importDefault(require("./src/routes/aIInsightRouts"));
const userAdminRouts_1 = __importDefault(require("./src/routes/userAdminRouts"));
const interviewMaterialsRoutes_1 = __importDefault(require("./src/routes/interviewMaterialsRoutes"));
const profileRouts_1 = __importDefault(require("./src/routes/profileRouts"));
const publicProfileRoutes_1 = __importDefault(require("./src/routes/publicProfileRoutes"));

dotenv_1.default.config();
const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
    "http://localhost:3000",
    "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);
const normalize = (url) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
console.log("✅ טעינת ראוט לתזכורות מתבצעת כעת");

app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/auth', authRouts_1.default);
console.log("🚦 טוען ראוט reminders לפני הקישור ל-express...");
app.use('/api/admin', userAdminRouts_1.default);
app.use('/api/users', userRouts_1.default);
app.use('/api/dynamic-contents', dynamicContentRoutes_1.default);
app.use("/api/reminders", remindersRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/answers', answerRouts_1.default);
app.use('/question', questionRouts_1.default);
app.use('/shared-recordings', sharedRecordingRouts_2.default);
app.use('/interview-materials-hub', interviewMaterialsRoutes_1.default);
app.use("/api/aiInsight", aIInsightRouts_3.default);
app.use('/api/simulation', questionRouts_2.default);
app.use('/api/questions', questionRouts_2.default);
app.use('/api/status', statusRoutes_2.default);
app.use('/api/answers', answerRouts_2.default);
app.use('/api/status', statusRoutes_1.default);
app.use('/api/insights', aIInsightRouts_2.default);
app.use("/api/questions", answerRouts_2.default);
app.use("/api/aiInsight", aIInsightRouts_3.default);
app.use("/manager/interview-materials", interviewMaterialsRoutes_1.default);
app.use("/profiles", profileRouts_1.default);
app.use('/public-profile', publicProfileRoutes_1.default);
app.use('/api', autoDeleteRoutes_1.default);
app.use('/api', resourceRouts_1.default);
app.use('/api', feedbackRouts_1.default);
app.use('/api', aIInsightRouts_1.default);
app.use('/api', sharedRecordingRouts_1.default);


exports.default = app;
//# sourceMappingURL=app.js.map