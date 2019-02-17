// Importation des modules externes
const express = require("express"); // Module JS permettant de créer des endpoints HTTP facilement
const bodyParser = require("body-parser"); // Module JS permettant de tranformer les paramètres en JSON

/*
  Paramètrage d'Express. Pas besoin de toucher.
  ------------------------------------------------
*/
// Paramètrage de Express
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
/*
  ------------------------------------------------
*/

/*
  Déclaration des données
*/
const data = {
  items: [
    {
      title: "Item de l'index 0",
      content: "Je suis un contenu",
    },{
    
      title: "Item de l'index 1",
      content: "Je suis un contenu",
    },{
    
      title: "Item de l'index 2",
      content: "Je suis un contenu",
    },{
    
      title: "Item de l'index 3",
      content: "Je suis un contenu",
    },{
    
      title: "Item de l'index 4",
      content: "Je suis un contenu",
    },{
    
      title: "Item de l'index 5",
      content: "Je suis un contenu",
    },
  ],
  
  
};

/*
  Déclaration des endpoints (également appelés *routes*)

  req: Contient toutes les données de la requête reçue: headers, paramètres GET, paramètres POST etc..
  res: Contient des fonctions permettant de répondre à la requête

  Obtenir les paramètres GET: req.query
  Obtenir les paramètres POST: req.body
  Obtenir les "paramètres" dans l'URL: req.params
  Répondre un message text: res.send("Okay, bien reçu")
  Répondre avec un object jSON: res.json({message: "Okay, bien reçu"})
*/
// Lorsqu'on reçoit une requête GET
// Exemple: curl localhost:8080/?index=5
// TODO: Retourner l'item correspondant à l'index envoyé dans la requête
app.get("/", (req, res) => {
  const paramsGet = req.query; // on créer une constante "paramsGest" qui a pour valeur "req.query"--> 
  console.log({ paramsGet });//recuperation des données entrées dans la  parties paramsGet
  const text = data.items[paramsGet.index];// on créer une variable "text" qui a pour valeur les données du tableau (selon l'index entré)

  if (paramsGet.index){//si un index à été entrée :
    res.send(text)//reponse dans la partie client, envoi alor le title et le contenu selon l'index demandé 
  }
  else{//si l'information ne correspond pas à l'index 
    res.send(data.items)//réponse dans la partie client qui envoie la liste des items
  }
});

  
// Lorsqu'on reçoit une requête POST
// Exemple: curl -X POST -H "Content-Type: application/json" localhost:8080 -d '{"title":"Mon titre"}'
// TODO: Sauvegarder l'item reçu dans le tableau des items
app.post("/", (req, res) => {
  const paramsPost = req.body; // {title: "Mon titre"}
  console.log({ paramsPost });//push dans le "tableau" data.items les données entrées 
  res.json(paramsPost);// le res.json permetra d'envoyer une réponse JSON composé d'un paramsPost 
});

// Lorsqu'on reçoit une requête DELETE
// Exemple: curl -X DELETE localhost:8080/6
// TODO: Supprimer l'item correspondant à l'index envoyé en paramètre d'URL
app.delete("/:number", (req, res) => {
  const paramsURL = req.params; //  {number: "6"}
  console.log({ paramsURL });
  res.json(paramsURL);
});

// Lorsqu'on reçoit une requête PUT
// Exemple: curl -X PUT -H "Content-Type: application/json" localhost:8080/?index=2 -d '{"newTitle":"Mon nouveau titre"}'
// TODO: Modifier l'item correspondant à l'index reçu en paramètre GET avec les données reçues en paramètre POST
app.put("/", (req, res) => {
  const paramsGet = req.query; // {index: 2}
  const paramsPost = req.body; // {newTitle: "Mon nouveau titre"}
  data.items[paramsGet.index].title = paramsPost.newTitle;//reprise de la ligne correspondente à l'index donnée et on lui donne la valeur ecrite et rajout d'un nouveau titre 
  console.log({ paramsPost });
  res.json(paramsPost);
});

/*
  Lancement du serveur sur le port 8080
*/
app.listen(8080, () => console.log(`Listen on port 8080`));
