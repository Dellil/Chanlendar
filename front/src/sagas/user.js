import { all, fork, takeLatest, put, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
	SIGN_UP_USER_REQUEST,
	SIGN_UP_USER_SUCCESS,
	SIGN_UP_USER_FAILURE,
} from "../reducers/user";

export default function* userSaga() {
	yield all([fork(watchSignUp)]);
}

function* watchSignUp() {
	yield takeLatest(SIGN_UP_USER_REQUEST, signUp);
}

function* signUp(action) {
	try {
		delay(500);
		// const result = call(signUpAPI, action.data);
		const result = { data: "잘 됐읍니다." };
		yield put({
			type: SIGN_UP_USER_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.log("에러났슴");
		console.log(error);
		yield put({
			type: SIGN_UP_USER_FAILURE,
			data: error.resonse.data,
		});
	}
}

function* signUpAPI(data) {
	return axios.post("/user", data);
}