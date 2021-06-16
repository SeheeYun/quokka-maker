import { firebaseDatabase } from './firebaseInit';

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
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
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
