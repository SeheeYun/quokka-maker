import firebaseApp from './firebaseInit';
import 'firebase/database';

class CardRepository {
  saveCard(userId, card) {
    console.log(userId, card);
    firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
  }
}

export default CardRepository;
