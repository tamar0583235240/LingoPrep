import { io } from "socket.io-client";
import { store } from '../store/store'; // ייבוא ה-store שלך
import { AdminQuestionApi } from '../../features/admin/services/adminQuestionApi'; // ייבוא ה-RTK Query שלך
import { userApi } from "./userApi";

const socket = io("http://localhost:5003"); 

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("questionDeleted", (newQuestionsList) => {
    console.log("I updated the questions cache");
    store.dispatch(AdminQuestionApi.util.updateQueryData('getAllQuestions', undefined, () => newQuestionsList));
});

socket.on("interviewMaterialSubUpdated", (newInterviewMaterialSubList) => {
    console.log("I updated the interviewMaterialSub cache");
    // store.dispatch(interviewMaterialSubApi.util.updateQueryData('getInterviewMaterialSub', undefined, () => newInterviewMaterialSubList));
});

socket.on("userAdded", (newUsersList) => {
    console.log("I updated the users cache");
    store.dispatch(userApi.util.updateQueryData('getUsers', undefined, () => newUsersList));
});

export default socket;