import React, { useEffect, useState } from "react";
import { Divider } from "antd";

import MainUser from "./Components/MainUser";
import SecUser from "./Components/SecUser";
import TransferVal from "./Components/TransferVal";
import TransferSubmit from "./Components/TransferSubmit";
import History from "./Components/History";

import gitHub from "./Static/Icons/github.svg";

import getUserData from "./Logic/getUserData";
import "./App.css";

const App = () => {
	const [mainUser, setMainUser] = useState({ text: "", error: true });
	const [secUser, setSecUser] = useState({ text: "", error: true });
	const [transactionData, setTransactionData] = useState({
		val: 0,
		gwei: 0,
		showAlert: false,
	});
	const [transactionsData, setTransactionsData] = useState(
		localStorage.getItem("TransactionsHistory")
			? JSON.parse(localStorage.getItem("TransactionsHistory"))
			: []
	);

	useEffect(() => getUserData(setMainUser), []);

	return (
		<div className="Root">
			<div className="App">
				<p className="Header">
					👋 Hello!
					<br />
					🔄 Im a simple crypto transfer project.
					<Divider dashed />
				</p>
				<div className="Container">
					<MainUser mainUser={mainUser} setMainUser={setMainUser} />

					{!mainUser.error && (
						<>
							<Divider dashed />
							<SecUser secUser={secUser} setSecUser={setSecUser} />
						</>
					)}

					{!secUser.error && (
						<TransferVal
							transactionData={transactionData}
							setTransactionData={setTransactionData}
						/>
					)}

					{transactionData.showAlert && (
						<TransferSubmit
							mainUser={mainUser}
							secUser={secUser}
							setMainUser={setMainUser}
							setSecUser={setSecUser}
							transactionData={transactionData}
							transactionsData={transactionsData}
							setTransactionData={setTransactionData}
							setTransactionsData={setTransactionsData}
						/>
					)}

					{transactionsData[0] && (
						<History
							transactionsData={transactionsData}
							setTransactionsData={setTransactionsData}
						/>
					)}
				</div>

				<p className="Footer">
					<Divider dashed />
					<p>
						<img src={gitHub} className="gitHub" />{" "}
						<a href="https://github.com/SEPEZHO/crypto-transfer">GitHub</a>{" "}
						проекта
					</p>
					Created by <a href="https://sepezho.com">sepezho</a> 2021
				</p>
			</div>
		</div>
	);
};

export default App;
