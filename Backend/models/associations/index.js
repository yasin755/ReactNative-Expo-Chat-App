import userAssociation from "./user.associations.js";
import refreshTokenAssociation from "./refreshToken.associations.js";
import connectionAssociation from "./connection.association.js";
import connectionRequestAssociation from "./connectionRequest.association.js";
import conversationAssociation from "./conversation.association.js";

export default function associations(db) {
  userAssociation(db);
  refreshTokenAssociation(db);
  connectionAssociation(db);
  connectionRequestAssociation(db);
  conversationAssociation(db);
}
