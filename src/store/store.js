import { action, computed, makeObservable, observable, toJS } from 'mobx';

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
    const radius = isMatches ? 100 : 130;

    const moodsIndex = this._moods.length;
    const PI2 = Math.PI * 2;
    const angle = PI2 / moodsIndex;

    this._moods = this._moods.map(mood => {
      const i = this._moods.indexOf(mood);
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
      this.offsetX = e.clientX;
    }
  };

  @action
  onPointerMove = e => {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
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
    this.moveX *= 0.82;
    this.rotate += this.moveX * 0.008;
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
      }, 200);
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
      }, 300);
    }
  };

  @observable
  _cards = [
    {
      date: '2021-06-01',
      mood: {
        description: '우울해',
        bgImage: '/images/mood5.svg',
        x: null,
        y: null,
      },
      img: '',
      text: '안녕하세요 감사해요 잘있어요 다시만나요!',
    },
    {
      date: '2021-06-02',
      mood: {
        description: '우울해',
        bgImage: '/images/mood3.svg',
        x: null,
        y: null,
      },
      img: '',
      text: '안녕하세요 감사해요 잘있어요 다시만나요!',
    },
  ];

  @computed
  get cards() {
    return toJS(this._cards);
  }

  @action
  setCards = card => {
    // this._cards.push(card);
    console.log(card);
  };
}

export default new Store();
