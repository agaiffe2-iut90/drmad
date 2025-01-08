import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.shopLogin(data)
}
/*
async function shopLoginFromAPI(data) {
  // a écrire quand l'API est fonctionnelle
  return {}
}
 */

async function getAllVirusesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllViruses()
}

/*
async function getAllVirusesFromAPI() {
  // a écrire quand l'API est fonctionnelle
  return {}
}
*/

async function addItemToBasketFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.addItemToBasket(data)
}

async function editBasketFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.editBasket(data)
}

async function getBasketByIdFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.getBasketById(data)
}

async function viderPanierFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.viderPanier(data)
}

async function removeItemFromBasketFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.removeItemFromBasket(data)
}

async function updateBasketByIdFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.updateBasketById(data)
}

async function addOrderByUserIdFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.addOrderByUserId(data)
}

async function shopLogin(data) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await shopLoginFromLocalSource(data)
  }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
  }
  return response
}


async function getAllViruses() {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAllVirusesFromLocalSource()
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
  }
  return response
}

async function addItemToBasket(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await addItemToBasketFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    console.log(err)
    response = {error: 1, status: 404, data: 'erreur réseau, impossible d\'ajouter l\'article au panier'  }
  }
  return response
}

async function editBasketById(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await editBasketFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier le panier'  }
  }
  return response
}

async function getBasketById(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getBasketByIdFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le panier'  }
  }
  return response
}

async function viderPanier(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await viderPanierFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de vider le panier'  }
  }
  return response
}

async function removeItemFromBasket(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await removeItemFromBasketFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de retirer l\'article du panier'  }
  }
  return response
}

async function updateBasketById(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await updateBasketByIdFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de mettre à jour le panier'  }
  }
  return response
}

async function addOrderByUserId(data){
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await addOrderByUserIdFromLocalSource(data)
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de passer la commande'  }
  }
  return response
}



export default {
  shopLogin,
  getAllViruses,
  addItemToBasket,
  editBasketById,
  getBasketById,
  viderPanier,
  removeItemFromBasket,
  updateBasketById,
  addOrderByUserId
}