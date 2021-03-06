import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TableRow, TableCell } from "@material-ui/core";
import moment from "moment";
import { CHANGE_DAY_EVENT } from "reducers/topic";
import { CustomButton } from "styles/content";

function CalendarDays() {
	const dispatch = useDispatch();

	const onClick = useCallback(
		(day) => () => {
			dispatch({
				type: CHANGE_DAY_EVENT,
				data: day,
			});
		},
		[dispatch],
	);
	const { date, day } = useSelector((state) => state.topic);
	const compareDate = date.clone();
	const compareDay = day.clone();
	const tasks = useSelector((state) => state.topic.currentTopic?.Tasks);
	const monthTasks = tasks.filter((v) => v.taskDate.isSame(date, "month"));

	const days = getDaysAllInOne(compareDate, compareDay, onClick, monthTasks);

	return <>{days}</>;
}

const getDaysAllInOne = (date, day, onClick, tasks) => {
	const firstDay = firstDayOfMonth(date);
	const blanks = fillFirstDateOfMonth(firstDay);
	const days = getDays(date, day, onClick, tasks);
	const totalDays = getTotalDays(blanks, days);

	return totalDays;
};

const firstDayOfMonth = (dateObject) => {
	const firstDay = moment(dateObject)
		.startOf("month")
		.format("d");
	return firstDay;
};

const fillFirstDateOfMonth = (firstDay) => {
	const blanks = Array.from({ length: firstDay }, (_, i) => (
		<TableCell key={"blanks" + i}>{""}</TableCell>
	));
	return blanks;
};

const isSame = (date, tasks) => {
	const isTaskExisted = tasks.find((v) => {
		return v.taskDate.isSame(date, "day");
	});
	let buttonVariant = "text";
	if (isTaskExisted) {
		buttonVariant = "outlined";
	}
	return buttonVariant;
};

const isSelectedDay = (selectedDay, day) => {
	return selectedDay.isSame(day, "day") ? "contained" : undefined;
};
const getDays = (date, day, onClick, tasks) => {
	const numberOfDays = date.daysInMonth();
	const selectDay = day.clone();
	const days = Array(numberOfDays)
		.fill("")
		.map((_, i) => {
			const variant =
				isSelectedDay(day, selectDay.set("date", i + 1)) ||
				isSame(date.set("date", i + 1), tasks);
			return (
				<TableCell key={"days" + i} align="center">
					<CustomButton onClick={onClick(i + 1)} variant={variant}>
						{i + 1}
					</CustomButton>
				</TableCell>
			);
		});
	return days;
};

const getTotalDays = (blanks, days) => {
	const totalDaysInMonth = [...blanks, ...days];
	let rows = [];
	let cells = [];

	totalDaysInMonth.forEach((day, i) => {
		if (i % 7 !== 0) cells.push(day);
		else {
			rows.push(cells);
			cells = [];
			cells.push(day);
		}
		if (i === totalDaysInMonth.length - 1) rows.push(cells);
	});

	const totalDays = rows.map((days, i) => {
		return <TableRow key={"rows" + i}>{days}</TableRow>;
	});

	return totalDays;
};

export default React.memo(CalendarDays);
