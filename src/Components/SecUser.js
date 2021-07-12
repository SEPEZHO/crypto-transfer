import React from "react";
import { Input } from "antd";
import * as dayjs from "dayjs";
import getUserData from "../Logic/getUserData";
dayjs.extend(require("dayjs/plugin/relativeTime"));

const SecUser = (props) => (
	<div className="SecUser">
		<p>
			Transfer to:
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
					User transfer to hash: {props.secUser.text.slice(0, 10)}...
					{props.secUser.text.slice(-5)}
				</p>
				<p>
					User transfer to account balance:{" "}
					<b>{Number(props.secUser.balance).toFixed(4)}</b> ETH
				</p>
			</div>
		) : (
			<div>⚠️ Set actual user acc!</div>
		)}
	</div>
);

export default SecUser;
