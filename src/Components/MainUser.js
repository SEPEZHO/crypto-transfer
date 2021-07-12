import React from "react";
import { Button } from "antd";

import getUserData from "../Logic/getUserData";

const MainUser = (props) =>
	props.mainUser.error ? (
		<div>
			<p>💰 Connect wallet!</p>
			<p>{props.mainUser.text}</p>
			<Button type="dashed" onClick={() => getUserData(props.setMainUser)}>
				Connect
			</Button>
		</div>
	) : (
		<div>
			<p>✔ Connected!</p>
			<p>
				Ur account hash: {props.mainUser.text.slice(0, 10)}...
				{props.mainUser.text.slice(-5)}
			</p>
			<p>
				Ur account balance: <b>{Number(props.mainUser.balance).toFixed(4)}</b>{" "}
				ETH
			</p>
		</div>
	);

export default MainUser;
