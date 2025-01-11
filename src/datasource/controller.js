import { items, shopusers, bankaccounts, transactions } from './data'
import {v4 as uuidv4} from 'uuid'

import bcrypt from 'bcryptjs'



/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */
  function shopLogin(data) {
    if (!data.login || !data.password) {
      return { error: 1, status: 400, data: 'Login et mot de passe requis' };
    }
  
    let user = shopusers.find(e => e.login === data.login);
    if (!user) return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
  
    const passwordMatches = bcrypt.compareSync(data.password, user.password);
    if (!passwordMatches) {
      return { error: 1, status: 403, data: 'Mot de passe incorrect' };
    }
  
    if (!user.session) {
      user.session = uuidv4(); // Générer un identifiant unique pour la session
    }
  
    // Stocker la session dans localStorage pour que l'utilisateur soit authentifié après un refresh
    localStorage.setItem('userSession', user.session);
  
    return {
      error: 0,
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        login: user.login,
        email: user.email,
        session: user.session,
      },
    };
  }

function getAllViruses() {
  return {error: 0, data: items}
}



async function updateBasketById(data){
  let id = data.id
  let basket = data.basket
  if (!id) {
    return {error: 1, status: 400, data: 'identifiant requis'}
  }
  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]._id === id) {
      shopusers[i].basket = basket
      return {error: 0, status: 200, data: basket}
    }
  }
  return {error: 1, status: 404, data: 'panier non trouvé'}
}

async function getBasketById(data) {
  let id = data.id
  if (!id) {
    return {error: 1, status: 400, data: 'identifiant requis'}
  }
  let user = shopusers.find(u => u._id === id)
  if (!user) {
    return {error: 1, status: 404, data: 'panier non trouvé'}
  }
  return {error: 0, status: 200, data: user.basket}
}

async function viderPanier(data) {
  let id = data.id
  if (!id) {
    return {error: 1, status: 400, data: 'identifiant requis'}
  }
  let user = shopusers.find(u => u._id === id)
  if (!user) {
    return {error: 1, status: 404, data: 'panier non trouvé'}
  }
  user.basket = []
  return {error: 0, status: 200, data: user.basket}
}

async function removeItemFromBasket(data) {
  let id = data.id
  let basket = data.basket
  if (!id) {
    return {error: 1, status: 400, data: 'identifiant requis'}
  }
  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]._id === id) {
      shopusers[i].basket = basket
      return {error: 0, status: 200, data: basket}
    }
  }
  return {error: 1, status: 404, data: 'panier non trouvé'}
}


async function addOrderByUserId(data){
  let id = data.user_id
  let order = {"items": data.items}
  if (!id) {
    return {error: 1, status: 400, data: 'identifiant requis'}
  }
  let sum = 0
  for (let i = 0; i < order.items.length; i++) {
    let item = order.items[i]
    let promotion = 0
    let itemData = items.find(i => i._id === item.item._id);
    if (itemData && itemData.promotion) {
      for (let j = 0; j < itemData.promotion.length; j++) {
      if (itemData.promotion[j].amount === item.amount) {
        promotion = itemData.promotion[j].discount;
      }
      }
    }
    sum += (item.item.price * item.amount) * (1 - promotion/100)
    }
    console.log("total: ", sum)
    order["date"] = new Date()
    order["total"] = sum
    order["status"] = "en attente"
    order["uuid"] = uuidv4()

    for (let i = 0; i < shopusers.length; i++) {
      if (shopusers[i]._id === id) {
        shopusers[i].orders.push(order)
        console.log("commande ajoutée")
        return {error: 0, status: 200, data: order}
      }
    }

    console.log("aucun utilisateur trouvés")
    return {error: 1, status: 404, data: 'utilisateur non trouvé'}
  }

  function buyOrderById(data) {
    const { user_id, order_id, transactionId } = data;

    console.log('user ID: ', user_id);
    console.log('order ID: ', order_id);
    console.log('transaction ID: ', transactionId);

    // Vérification des identifiants requis
    if (!user_id) {
        console.log("Identifiant utilisateur requis");
        return { error: 1, status: 400, data: 'Identifiant utilisateur requis' };
    }
    if (!order_id) {
        console.log("Identifiant de commande requis");
        return { error: 1, status: 400, data: 'Identifiant de commande requis' };
    }
    if (!transactionId) {
        console.log("Identifiant de transaction requis");
        return { error: 1, status: 400, data: 'Identifiant de transaction requis' };
    }

    // Recherche de l'utilisateur
    const user = shopusers.find(u => u._id === user_id);
    if (!user) {
        console.log(`Utilisateur avec l'ID ${user_id} non trouvé`);
        return { error: 1, status: 404, data: 'Utilisateur non trouvé' };
    }

    // Recherche de la commande
    const order = user.orders.find(o => o.uuid === order_id);
    if (!order) {
        console.log(`Commande avec l'ID ${order_id} non trouvée pour l'utilisateur ${user_id}`);
        return { error: 1, status: 404, data: 'Commande non trouvée' };
    }

    // Vérification de la transaction bancaire
    const transaction = user.transactions.find(t => t.id === transactionId && t.orderId === order_id);
    if (!transaction) {
        console.log(`Transaction avec l'ID ${transactionId} non trouvée ou non associée à la commande ${order_id}`);
        return { error: 1, status: 404, data: 'Transaction bancaire non valide ou non trouvée' };
    }

    if (transaction.status !== 'completed') {
        console.log(`Transaction ${transactionId} pour la commande ${order_id} non finalisée`);
        return { error: 1, status: 400, data: 'Transaction bancaire non finalisée' };
    }

    // Finalisation de la commande
    order.status = "finalized";
    console.log(`Commande ${order_id} de l'utilisateur ${user_id} finalisée avec succès`);
    
    return { error: 0, status: 200, data: order };
  }

  function getOrdersByUserId(data){
    let user_id = data.user_id
    if(!user_id){
      return {error: 1, status: 400, data: 'identifiant requis'}
    }

    for(let i = 0; i < shopusers.length; i++){
      if(shopusers[i]._id === user_id){
        return {error: 0, status: 200, data: shopusers[i].orders}
      }
    }
    console.log("aucun utilisateur trouvé")
    return {error: 1, status: 404, data: 'utilisateur non trouvé'}
  }

  function cancelOrderById(data){
    let user_id = data.user_id
    let order_id = data.order_id
    if(!user_id){
      return {error: 1, status: 400, data: 'identifiant requis'}
    }
    if(!order_id){
      return {error: 1, status: 400, data: 'identifiant de commande requis'}
    }

    for(let i = 0; i < shopusers.length; i++){
      if(shopusers[i]._id === user_id){
        for(let j = 0; j < shopusers[i].orders.length; j++){
          if(shopusers[i].orders[j].uuid === order_id){
            shopusers[i].orders[j].status = "cancelled"
            return {error: 0, status: 200, data: shopusers[i].orders[j]}
          }
        }
      }
    }
    console.log("aucun utilisateur ou commande trouvés")
    return {error: 1, status: 404, data: 'utilisateur ou commande non trouvés'}
  }
  
  function getAccount(data){
    let number = data.number
    console.log("number: ", number)
    if (!number) {
      console.log("numéro de compte requis")
      return {error: 1, status: 400, data: 'numéro de compte requis'}
    }
    let account = bankaccounts.find(a => a.number === number)
    if (!account) {
      console.log("compte non trouvé")
      return {error: 1, status: 404, data: 'compte non trouvé'}
    }
    return {error: 0, status: 200, data: account}
  }

  function getTransactions(data){
    let id = data.id
    if (!id) {
      return {error: 1, status: 400, data: 'id non fourni'}
    }
    let account = bankaccounts.find(a => a.id === id)
    if (!account) {
      return {error: 1, status: 404, data: 'compte non trouvé'}
    }
    let transactions = transactions.filter(t => t.account === account._id)  
    return {error: 0, status: 200, data: transactions}

  }

  function createWithdraw(data){
    let id = data.idAccount
    let amount = data.amount
    if (!id) {
      return {error: 1, status: 400, data: 'id non fourni'}
    }
    if (!amount) {
      return {error: 1, status: 400, data: 'montant non fourni'}
    }
    let account = getAccount({id: id})
    if (account.error === 1) {
      return {error: 1, status: 404, data: 'compte non trouvé'}
    }

    if (account.data.amount < amount){
      let transaction = {'_id': id, 'amount': -amount, 'acount': id, 'date': {$date: new Date()}, 'uuid': uuidv4()}
      transactions.push(transaction)
      account.amount -= amount
      return {error: 0, status: 200, data: transaction}
    }
    return {error: 1, status: 400, data: 'solde insuffisant'}
  }

  function createPayment(data){
    let id = data.idAccount
    let amount = data.amount
    let destNumber = data.destNumber
    if (!id) {
      return {error: 1, status: 400, data: 'id non fourni'}
    }
    if (!amount) {
      return {error: 1, status: 400, data: 'montant non fourni'}
    }
    if (!destNumber) {
      return {error: 1, status: 400, data: 'numéro de compte destinataire non fourni'}
    }
    let account = getAccount({id: id})
    if (account.error === 1) {
      return {error: 1, status: 404, data: 'compte non trouvé'}
    }
    let destAccount = getAccount({number: destNumber})
    if (destAccount.error === 1) {
      return {error: 1, status: 404, data: 'compte destinataire non trouvé'}
    }

    //si montant supérieur à la somme sur le compte
    if (account.data.amount < amount){
      let date = new Date()
      let payer_transaction = {'_id': id, 'amount': -amount, 'acount': id, 'date': {$date: date}, 'uuid': uuidv4()}
      let dest_transaction = {'_id': destAccount._id, 'amount': amount, 'acount': destAccount._id, 'date': {$date: date}, 'uuid': uuidv4()}
      transactions.push(payer_transaction)
      transactions.push(dest_transaction)
      account.amount -= amount
      destAccount.amount += amount
      return {error: 0, status: 200, data: payer_transaction}
    }
    return {error: 1, status: 400, data: 'solde insuffisant'}
  }

  function validateOperation(data){
    let currentAccount = data.currentAccount
    let amount = data.amount
    let isRecipient = data.isRecipient
    let dest = data.recipient

    console.log("isRecipient: ", isRecipient)

    if (!currentAccount) {
      return {error: 1, status: 400, data: 'compte non fourni'}
    }
    if (!amount) {
      return {error: 1, status: 400, data: 'montant non fourni'}
    }
    if (!isRecipient) {
      return {error: 1, status: 400, data: 'destinataire non fourni'}
    }

    let transaction = {'_id': currentAccount, 'amount': amount, 'acount': currentAccount, 'date': {$date: new Date()}, 'uuid': uuidv4()}

    if (isRecipient) {
      let destAccount = getAccount({number: dest})
      if (destAccount.error === 1) {
        return {error: 1, status: 404, data: 'compte destinataire non trouvé'}
      }
      transaction['amount'] = -amount
      transaction['acount'] = destAccount._id
    }

    if (!isRecipient) {
      let account = getAccount({number: currentAccount.number})
      if (account.error === 1) {
        return {error: 1, status: 404, data: 'compte non trouvé'}
      }
      if (account.data.amount < amount){
        return {error: 1, status: 400, data: 'solde insuffisant'}
      }
      account.data.amount -= amount
    }

    transactions.push(transaction)
    return {error: 0, status: 200, data: transaction}


  }



export default{
  shopLogin,
  getAllViruses,
  updateBasketById,
  getBasketById,
  viderPanier,
  removeItemFromBasket,
  addOrderByUserId,
  buyOrderById,
  getOrdersByUserId,
  cancelOrderById,
  getAccount,
  getTransactions,
  createWithdraw,
  createPayment,
  validateOperation
}