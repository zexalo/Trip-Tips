import {HTTPRequestError} from "../services/ApiService";


export const formatErrors = (error: HTTPRequestError) => {
    if (error.message === "Network request failed") {
        return "Erreur réseau";
    }
    switch (error.code){
        case 500:
            return "Un problème est survenue";
        case 401:
            if (error.message.match(/(User)(.*)(was not activated)/)) return "Votre compte n'a pas encore été activé. Veuillez vérifier votre boîte mail.";
            else return "Identifiant ou mot de passe incorrect";
        default:
            return error.message;
    }
};
