import LocalSource from "@/datasource/controller";

async function getAccountFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.getAccount(data)
}

async function getTransactionsFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.getTransactions(data)
}

async function createWithdrawFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.createWithdraw(data)
}

async function createPaymentFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.createPayment(data)
}

async function validateOperationFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.validateOperation(data)
}

async function getTransationsByNumberFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.getTransationsByNumber(data)
}

async function getAccount(data){
  console.log("données reçus:", data);
  let response = null;
  try {
    response = await getAccountFromLocalSource(data);
  } catch (error) {
    console.error(error);
  }
  return response;
}

async function getTransactions(data){
  let response = null;
  try {
    response = await getTransactionsFromLocalSource(data);
  } catch (error) {
    console.error(error);
  }
  return response;
}

async function getTransactionsByNumber(data){
  let response = null;
  try {
    response = await getTransationsByNumberFromLocalSource(data);
  } catch (error) {
    console.error(error);
  }
  return response;
}

async function createWithdraw(data){
  let response = null;
  try {
    response = await createWithdrawFromLocalSource(data);
  } catch (error) {
    console.error(error);
  }
  return response;
}

async function createPayment(data){
  let response = null;
  try {
    response = await createPaymentFromLocalSource(data);
  } catch (error) {
    console.error(error);
  }
  return response;
}

async function validateOperation(data){
  console.log("données reçus:", data);
  let response = null;
  try {
    response = await validateOperationFromLocalSource(data);
    console.log("données reçus:", response);
  } catch (error) {
    console.error(error);
  }
  return response;
}



export default {
  getAccount,
  getTransactions,
  getTransactionsByNumber,
  createWithdraw,
  createPayment,
  validateOperation
}
