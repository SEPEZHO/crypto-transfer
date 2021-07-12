import React from "react";
import { Button, Divider } from "antd";
import * as dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/relativeTime"));

const History = (props) => (
	<div>
		<Divider dashed />
		History:
		<br />
		<div className="Transactions">
			{props.transactionsData.map((e) => (
				<div className="Transaction">
					<span className="TransactionTitle">{dayjs().to(dayjs(e.time))}</span>
					<span className="TransactionTitle">
						--- Block number: {e.blockNumber} ---
					</span>
					<Divider dashed />* Status: {e.status ? "Done!" : "Error!"}
					<Divider dashed />* From: {e.from.slice(0, 10)}...
					{e.from.slice(-5)}
					<Divider dashed />* To: {e.to.slice(0, 10)}...{e.to.slice(-5)}
					<Divider dashed />* Gas used (WEI): {e.gasUsed}
					<Divider dashed />* Transaction hash: {e.transactionHash.slice(0, 8)}
					...{e.transactionHash.slice(-5)}
				</div>
			))}
		</div>
		<Button
			type="dashed"
			onClick={() => {
				props.setTransactionsData([]);
				localStorage.clear();
			}}>
			Clear
		</Button>
	</div>
);

export default History;
