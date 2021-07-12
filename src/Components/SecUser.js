import React from "react";
import { Input } from "antd";
import * as dayjs from "dayjs";
import getUserData from "../Logic/getUserData";
dayjs.extend(require("dayjs/plugin/relativeTime"));

const SecUser = (props) => (
	<div className="SecUser">
		<p>
			Transfer to (sec user):
			<br />
			<Input
				placeholder="0xbCc210E4...f3e5F"
				onChange={(e) =>
					getUserData(props.setSecUser, e.target.value ? e.target.value : null)
				}
			/>
		</p>

		{!props.secUser.error ? (
			<div>
				<p>
					Sec user acc: {props.secUser.text.slice(0, 10)}...
					{props.secUser.text.slice(-5)}
				</p>
				<p>
					Sec user balance: <b>{Number(props.secUser.balance).toFixed(4)}</b>{" "}
					ETH
				</p>
			</div>
		) : (
			props.secUser.text
		)}
	</div>
);

export default SecUser;
