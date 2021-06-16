import firebaseApp from './firebaseInit';
import 'firebase/database';

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseApp.database().ref(`${userId}/cards`);
    ref.orderByChild('msDate').on('value', snapshot => {
      let data = {};
      snapshot.forEach(child => {
        data = { ...data, [child.val().id]: child.val() };
      });
      onUpdate(data);
    });

    return () => ref.off();
  }

  saveCard(userId, card) {
    firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
