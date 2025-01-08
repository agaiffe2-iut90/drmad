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

function getAccountAmount(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'}
  let account = bankaccounts.find(a => a.number === number)
  if (!account) return {error: 1, status: 404, data: 'numéro de compte bancaire incorrect'}
  return {error: 0, status: 200, data: account.amount}
}

function getAccountTransactions(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'}
  let account = bankaccounts.find(a => a.number === number)
  if (!account) return {error: 1, status: 404, data: 'numéro de compte bancaire incorrect'}
  // récupérer les transaction grâce à l'_id du compte
  let trans = transactions.filter(t => t.account === account._id)
  return {error: 0, status: 200, data: trans}
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
    for (let j = 0; j < items.item.promotion.length; j++) { 
      if (items.item.promotion[j].amount === item.amount) {
        promotion = items.item.promotion[j].discount
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
        return {error: 0, status: 200, data: order}
      }
    }

    console.log("aucun utilisateur trouvés")
    return {error: 1, status: 404, data: 'utilisateur non trouvé'}
  }
  

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  updateBasketById,
  getBasketById,
  viderPanier,
  removeItemFromBasket,
  addOrderByUserId
}