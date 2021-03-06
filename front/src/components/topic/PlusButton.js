import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Avatar, Button, Grid } from "@material-ui/core";

import {
	OPEN_TOPIC_MODAL_EVENT,
	CLOSE_TOPIC_MODAL_EVENT,
	ADD_TOPIC_REQUEST,
} from "reducers/topic";
import { useMultipleEvents, useInput } from "hooks";
import TopicModal from "./TopicModal";
import { useTopicStyles, useTopicButtonStyles, CustomTooltip } from "styles/topic";

function PlusButton() {
	const topicStyles = useTopicStyles();
	const buttonStyles = useTopicButtonStyles();
	const [cookies] = useCookies("accessToken");
	const isOpend = useSelector((state) => state.topic.isTopicModalOpend);
	const avatarVariant = isOpend ? "rounded" : "circle";

	const [input, onInputChange, setInput] = useInput("");
	const dispatch = useDispatch();

	const onCreateClick = (e) => {
		dispatch({
			type: ADD_TOPIC_REQUEST,
			data: { title: input, accessToken: cookies.accessToken },
		});
		setInput("");
	};

	const [onOpenEvent, onCloseEvent] = useMultipleEvents(
		OPEN_TOPIC_MODAL_EVENT,
		CLOSE_TOPIC_MODAL_EVENT,
	);

	return (
		<Grid className={topicStyles.root} item>
			<CustomTooltip title="토픽 추가하기" placement="right" arrow>
				<Avatar className={topicStyles.circle} variant={avatarVariant}>
					<Button className={buttonStyles.root} onClick={onOpenEvent}>
						+
					</Button>
				</Avatar>
			</CustomTooltip>
			<TopicModal
				isOpend={isOpend}
				onCreateClick={onCreateClick}
				onCloseEvent={onCloseEvent}
				onInputChange={onInputChange}
			/>
		</Grid>
	);
}

export default PlusButton;
