import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from 'mobx';
import CardRepository from '../service/card_repository';

const RADIUS = 130;
const MOBILE_RADIUS = 100;
const MOVE_X = 0.88;
const ROTATE = 0.008;
const TRANSITION_DURATION = 250;
const DISABLE_DURATION = 500;

const cardRepository = new CardRepository();
class Store {
  constructor() {
    makeObservable(this);
  }

  @observable
  _moods = [
    {
      description: '우울해',
      bgImage: '/images/mood5.svg',
      x: null,
      y: null,
    },
    {
      description: '피곤해',
      bgImage: '/images/mood7.svg',
      x: null,
      y: null,
    },
    {
      description: '설레',
      bgImage: '/images/mood8.svg',
      x: null,
      y: null,
    },
    {
      description: '그저 그래',
      bgImage: '/images/mood6.svg',
      x: null,
      y: null,
    },
    {
      description: '짜증나',
      bgImage: '/images/mood2.svg',
      x: null,
      y: null,
    },
    {
      description: '완전 좋아!',
      bgImage: '/images/mood3.svg',
      x: null,
      y: null,
    },
    {
      description: '기분 최고!',
      bgImage: '/images/mood1.svg',
      x: null,
      y: null,
    },
    {
      description: '평온해',
      bgImage: '/images/mood4.svg',
      x: null,
      y: null,
    },
  ];

  @computed
  get moods() {
    return toJS(this._moods);
  }

  @action
  translateMoods = isMatches => {
    const radius = isMatches ? MOBILE_RADIUS : RADIUS;

    const moodsIndex = this._moods.length;
    const PI2 = Math.PI * 2;
    const angle = PI2 / moodsIndex;

    this._moods = this._moods.map((mood, index) => {
      const i = index;
      const x = radius * Math.cos(angle * i);
      const y = radius * Math.sin(angle * i);

      return { ...mood, x: x, y: y };
    });
  };

  @observable
  isDown = false;
  @observable
  moveX = 0;
  @observable
  offsetX = 0;

  @action
  onPointerDown = e => {
    if (this.isMoods) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = e.clientX || e.touches[0].clientX;
    }
  };

  @action
  onPointerMove = e => {
    if (this.isDown) {
      this.moveX = (e.clientX || e.touches[0].clientX) - this.offsetX;
      this.offsetX = e.clientX || e.touches[0].clientX;
    }
  };

  @action
  onPointerUp = e => {
    this.isDown = false;
  };

  @observable
  rotate = 0;

  @action
  setRotate = () => {
    this.moveX *= MOVE_X;
    this.rotate += this.moveX * ROTATE;
  };

  @observable
  isMoods = false;
  @observable
  isToggleClick = false;

  @action
  setMoods = () => {
    this.isMoods = !this.isMoods;
  };

  @action
  setToggleClick = () => {
    this.isToggleClick = !this.isToggleClick;
  };

  @action
  toggleClick = () => {
    if (!this.isMoods) {
      this.rotate = 0;
      this.setMoods();
      setTimeout(() => {
        this.setToggleClick();
      });
    } else {
      this.setToggleClick();
      setTimeout(() => {
        this.setMoods();
      }, TRANSITION_DURATION);
    }
  };

  @observable
  isDisableClick = false;

  @action
  disableClick = () => {
    if (this.isDisableClick) {
      return;
    } else {
      this.isDisableClick = true;
      this.toggleClick();
      setTimeout(() => {
        this.isDisableClick = false;
      }, DISABLE_DURATION);
    }
  };

  @observable
  _card = {};

  @observable
  _cards = {};

  @computed
  get card() {
    return toJS(this._card);
  }

  @computed
  get cards() {
    return toJS(this._cards);
  }

  @action
  setCard = card => {
    this._card = card;
  };

  @action
  setCardProps = (name, value) => {
    this._card = {
      ...this._card,
      [name]: value,
    };
  };

  @computed
  get isRedundancyDate() {
    return Object.keys(this._cards).some(
      key => this._cards[key].date === this._card.date
    );
  }

  @action
  addCard = () => {
    if (this.isRedundancyDate) {
      throw new Error('isRedundant');
    } else {
      !this._card.fileURL && this.setCardProps('fileURL', '');
      this.setCardProps('id', Date.now());
      this.setCardProps('msDate', new Date(this._card.date).getTime());
      cardRepository.saveCard(this.uid, this.card);
    }
  };

  @action
  updateCard = () => {
    if (
      this._cards[this._card.id].date !== this._card.date &&
      this.isRedundancyDate
    ) {
      throw new Error('isRedundant');
    } else {
      this.setCardProps('msDate', new Date(this._card.date).getTime());
      cardRepository.saveCard(this.uid, this.card);
    }
  };

  @action
  deleteCard = () => {
    cardRepository.removeCard(this.uid, this.card);
  };

  @action
  setCards = () => {
    const stopCards = cardRepository.syncCards(this.uid, data => {
      runInAction(() => {
        this._cards = data;
      });
      this.setLoaded(true);
    });

    return () => stopCards();
  };

  @observable
  isModal = false;
  @action
  onModalClick = () => {
    this.isModal = !this.isModal;
  };

  @observable
  _headerDate = null;
  @computed
  get headerDate() {
    if (Object.keys(this._cards).length === 0) {
      return null;
    }
    return this._headerDate;
  }
  @action
  setHeaderDate = date => {
    this._headerDate = date;
  };

  @observable
  uid = null;
  @action
  setUid = uid => {
    this.uid = uid;
  };

  @observable
  isLoaded = false;
  @action
  setLoaded = loaded => {
    this.isLoaded = loaded;
  };
}

export default new Store();
