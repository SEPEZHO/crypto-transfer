import Web3 from "web3";
import { message } from "antd";
import * as dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/relativeTime"));
import getUserData from "./getUserData";

const sentTransaction = async (
	mainUser,
	secUser,
	setMainUser,
	setSecUser,
	transactionData,
	transactionsData,
	setTransactionData,
	setTransactionsData
) => {
	try {
		await window.ethereum.enable();
		const web3 = new Web3(window.ethereum);
		// вытаскиваем последний блок из блокчейна (чтоб вытащить из него gasLimit)
		const block = await web3.eth.getBlock("latest");
		// параметры для транзакции
		const options = {
			to: secUser.text,
			from: mainUser.text,
			// конвертер обратно из ETH в WEI
			value: web3.utils.toWei(transactionData.val, "ether"),
			gasPrice: web3.utils.toWei(transactionData.gwei, "ether"),
			gas: block.gasLimit,
		};
		// производим транзакцию
		const lastTransactionData = await web3.eth.sendTransaction(options);
		// Добавляем время транзакции
		lastTransactionData.time = dayjs();
		// далее обновляем данные пользователей (снова вызываю функцию, которая обновит балансы)
		getUserData(setMainUser, mainUser.text);
		getUserData(setSecUser, secUser.text);
		// закидываю последние данные о транзакции в историю
		setTransactionsData([lastTransactionData, ...transactionsData].slice(0, 6));
		// а историю храню в локалстор
		localStorage.setItem(
			"TransactionsHistory",
			JSON.stringify([lastTransactionData, ...transactionsData].slice(0, 6))
		);
		setTransactionData({
			val: transactionData.val,
			gwei: transactionData.gwei,
			showAlert: false,
		});
		// сообщение что все хорошо :)
		message.success(
			"Done transaction! " + transactionData.val + "ETH has been sent!"
		);
	} catch {
		setTransactionData({
			val: transactionData.val,
			gwei: transactionData.gwei,
			showAlert: false,
		});
		message.error("Something went wrong!");
	}
};

export default sentTransaction;
