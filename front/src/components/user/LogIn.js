import React from "react";

import Button from "@material-ui/core/Button";

function LogIn({ setLogIn }) {
	return (
		<div>
			로그인 화면이다 이말이야
			<Button onClick={setLogIn}>아이디가 없는 사람이 있다?!</Button>
		</div>
	);
}

export default LogIn;
