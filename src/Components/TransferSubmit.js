import React from "react";
import { Space, Button, Alert, message } from "antd";
import sentTransaction from "../Logic/sentTransaction";

const TransferSubmit = (props) => {
	const declineTransaction = async () => {
		props.setTransactionData({
			val: props.transactionData.val,
			gwei: props.transactionData.gwei,
			showAlert: false,
		});
		message.error("Transaction has been declined!");
	};

	return (
		<Alert
			message="Transaction submit"
			description={
				<span>
					Are u shure whant to send <b>{props.transactionData.val}</b> ETH?
					<br />
					It will be cost <b>{props.transactionData.gwei}</b> ETH!
				</span>
			}
			type="info"
			action={
				<Space direction="vertical">
					<Button
						className="AlertBtn"
						size="small"
						type="primary"
						onClick={() =>
							sentTransaction(
								props.mainUser,
								props.secUser,
								props.setMainUser,
								props.setSecUser,
								props.transactionData,
								props.transactionsData,
								props.setTransactionData,
								props.setTransactionsData
							)
						}>
						Send
					</Button>
					<Button
						className="AlertBtn"
						size="small"
						danger
						onClick={declineTransaction}>
						Decline
					</Button>
				</Space>
			}
		/>
	);
};

export default TransferSubmit;
