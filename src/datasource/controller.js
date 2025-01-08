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

async function addItemToBasket(data) {
  let amount = data.amount
  if (amount < 1) {
    return {error: 1, status: 400, data: 'montant incorrect'}
  }

  let basket = data.basket
  let virus = data.virus
  let stock = virus.stock

  if (stock === 0) {
    return {error: 1, status: 400, data: 'stock épuisé'}
  }

  //parcour du panier pour voir si le virus est déjà présent
  let item = basket.find(e => e._id === virus._id)
  if (item) {
    // si le virus est déjà présent, on incrémente la quantité
    item.amount += amount
    virus.stock -= amount
  } else {
    // sinon, on ajoute le virus au panier
    item = {
      _id: virus._id,
      name: virus.name,
      price: virus.price,
      amount: amount
    }
    virus.stock -= amount
    basket.push(item)
  }
  return {error: 0, status: 200, data: basket}

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

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  addItemToBasket,
  updateBasketById,
  getBasketById,
  viderPanier,
  removeItemFromBasket
}