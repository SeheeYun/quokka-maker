# Quokka Maker: Diary web app

[![Netlify Status](https://api.netlify.com/api/v1/badges/28d64467-8321-4d1f-a4eb-175315013600/deploy-status)](https://app.netlify.com/sites/quokka-maker/deploys)

<img alt="gif" src="https://user-images.githubusercontent.com/77285472/138233935-b9c3ea31-2029-4192-9eba-6a54caf79bfb.gif" width="100%">

그날의 감정을 선택해서 일기를 작성할 수 있는 웹 어플리케이션 입니다.<br/>
인터랙션 디자인이 적용된 요소를 만들고싶어, 일기 어플 [Mooda](https://www.instagram.com/moodaforyou/)를 참고하여 UI를 구성했습니다.

## Screenshots

<img alt="스크린샷s" src="https://user-images.githubusercontent.com/77285472/138746183-0c6a7190-a14c-46e6-adcd-9ba95baa5c7b.png" width="100%">

- 작성한 일기의 감정이 썸네일로 사용되어 날짜별로 정렬되어 표시
- 썸네일을 클릭하면 해당 일기로 라우팅
- 헤더에 현재 보여지는 일기의 월, 년도 표시
- `matchMedia()` 메서드를 활용하여 반응형 요소 구현
- 직접 그린 귀여운 쿼카 이모지 🐻

## Features

- 로그인 / 로그아웃
- 데이터 CRUD 및 실시간 동기화
- 이미지 업로드
- 날짜당 한개로 일기 작성 제한
- 날짜 중복, 일기 삭제 시 경고창 표시

## Tech/framework used

- JavaScript
- React / CRA
- Mobx / Mobx-react
- React Router
- Firebase / Auth
- Firebase / Realtime Database
- Cloudinary
- React Datepicker

## What i learned

구현 과정에서 겪었던 문제와 해결 방법에 대해 서술합니다.

### 배열대신 객체 사용하기

firebase의 실시간 데이터베이스는 json으로 데이터를 저장한다. [관련 글](https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html)에서 배열로 데이터를 저장할 경우, 여러 사용자가 동시다발적으로 데이터를 업데이트 했을 때 발생하는 문제에대해 언급하며 배열을 사용하지 않는 이유에대해 설명하고있다.

배열을 사용해서 데이터를 저장하면 배열안에 요소의 개수가 비약적으로 늘어날 경우 데이터를 업데이트하는데에 걸리는 시간도 그 개수만큼 늘어나게 된다. 업데이트가 자주 일어나는 어플리케이션에는 적합하지 않은 방법이다.

위와 같은 이유로 데이터를 오브젝트 형태로 사용하였다. 오브젝트의 프로퍼티에 접근할 때, 사용하는 key가 유효한 식별자가 아닌 경우 대괄호 안에 key로 문자열을 입력하여 값을 받아올 수 있다.

이를 이용해서 각 일기의 id를 key로, 일기 자체를 값으로 하여 `Object.keys()`메서드로 배열을 반환해 준 뒤 `map()`메서드를 사용하여 일기를 표시하였다.

```js
Object.keys(cards).map(key => <Card card={cards[key]} key={key} />)}
```

### 애니메이션 구현

감정을 선택하는 부분인 회전하는 UI는 [김종민님의 튜토리얼](https://www.youtube.com/channel/UCdeWxKJuvtUG2xyN6pOJEvA)을 참고했다. mouse나 touch event로 받아온 값을 javascript로 inline style에 적용해 주었고 아래의 메서드들을 활용했다.

- **requestAnimationFrame + useRef**<br/>
  프레임드랍이 생기지않는 부드러운 애니메이션을 구현하기 위해선 초당 60프레임으로 애니메이팅하는 함수를 실행시켜야하는데, `requestAnimationFrame API`는 매 프레임이 시작될 때 전달된 콜백 함수가 실행되는 것을 보장하는 유일한 방법이다.

  requestAnimationFrame은 `cancelAnimationFrame` 메서드에 전달해 콜백 요청을 취소할 수 있는 정수 id 값을 반환한다. 컴포넌트가 언마운트 됐을 때 스케줄링된 콜백을 캔슬하기 위해서는 반환된 id 값을 리렌더링이 일어난 후에도 유지해야하고 이를위해 react의 `useRef hook`를 함께 사용한다.

  외에도 컴포넌트를 다시 렌더링시키지않으면서 애니메이션을 위해 컴포넌트의 생애주기동안 유지되고 변경할 수 있는 값이 필요할 경우 useRef를 사용한다.

  useRef는 .current 프로퍼티로 인자(initial value)를 전달받아 변경 가능한 ref 객체를 반환한다. 리렌더링이 일어날 때도 항상 동일한 ref객체를 유지하기때문에 React 라이프사이클에 의해 초기화되지 않는 값을 만들고 싶을 때 유용하다.

- **setTimeOut**<br/>
  버튼을 클릭하면 컴포넌트가 마운트되고 상태값을 변경해 요소가 transform되는 애니메이션을 구현했는데, transition이 발생하지않고 이미 transform이 적용되고 난 후의 상태로 렌더링되었다.

  setTimeout 메서드에 delay를 0ms으로 하고 콜백으로 상태값을 변경하는 함수를 적용해서 컴포넌트가 렌더링된 후에 콜백이 실행되도록 했다. `setTimeOut API`에 의해 전달해준 콜백은 큐에 삽입되었다가 스택에 있는 컴포넌트를 렌더링하는 함수가 실행되고나면 그 후 스택으로 옮겨져 실행된다.

  이 방법을 사용하면 함수의 실행 순서를 지정해 줄 수 있어서 원하는 애니메이션 구현 할 수 있다.

### 이미지 캐싱

버튼을 클릭했을 때 이모지들이 튀어나오는 애니메이션을 구현했는데, 컴포넌트가 마운트 된 후 이미지소스를 받아오는데에 걸리는 시간이 있어서 애니메이션 되는 것처럼 보이지않았다. 모바일의 경우 각각 이미지의 렌더링 속도에 차이가 나서 더욱 보기 좋지않았다.

- **image preload**<br/>
  먼저 상위의 페이지 컴포넌트에서 미리 이미지들을 불러와 캐시되도록 했다. 하지만 해당 이미지들을 렌더링 할 때마다 다시 요청이 발생하고 `304 Not Modified` 응답을 받아왔다.

- **cache control**<br/>
  프로젝트를 빌드, 배포할 때 netlify를 이용했고 netlify는 기본적으로 모든 리소스에대해 캐시의 유효기간을 0으로하여 매번 재검증하도록 설정되어있다. 재검증 결과 브라우저가 가지고 있는 캐시가 유효할 때, 서버는 요청된 리소스를 재전송할 필요가 없음을 알리는 304 Not Modified 응답을 보여준다. 하지만 이 또한 서버에 요청이 발생하고 시간이 소요되기 때문에 캐시의 유효기간 자체를 바꿀필요가 있었다.

  이미지파일에 대한 캐시 설정을 해주기위해 netlify에서 지원하는 `custom headers`를 이용해 유효기간을 설정해주고 재검증없이 장기간 캐시되도록 했다.

### Firebase

- **Auth**<br/>
  로그인 상태에따라 다른 화면을 보여주고, 로그인된 사용자의 정보를 받아오기위해 firebase 내장함수 [onAuthStateChanged()](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data) 메서드를 사용한다. 이 메서드는 인증 상태를 관찰하고있다가 인증 상태가 변경되면 등록된 리스너를 호출한다.

  이때, firebase를 초기화하거나 내장함수와 직결되는 로직들은 별도의 클래스로 만들어 분리하고 로그인 정보가 필요한 컴포넌트에서 useEffect를 사용하여 외부에서 리스너를 등록하듯이 인증 상태가 변경됐을 때의 호출될 콜백을 전달해준다.

  ```js
  onAuthStateChanged(onUserChanged) {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
  }, []);
  ```

- **Realtime Database**<br/>
  인증을 통해 받아온 사용자 정보를 이용해서 해당 사용자의 데이터베이스를 사용할 수 있다. 사용자의 데이터가 업데이트되거나 다른 브라우저나 디바이스에서도 해당 데이터를 동일하게 표시할 수 있도록 데이터베이스 경로에 [on()](https://firebase.google.com/docs/database/web/read-and-write?authuser=1#read_data) 메서드를 사용해서 해당 경로의 데이터를 지속적으로 관찰하여 변경될 때마다 데이터를 포함하는 snapshot을 받아올 수 있도록 한다. 받아온 snapshot은 작성한 콜백에 전달된다.

  on() 메서드를 사용하면 컴포넌트가 언마운트 됐을 때도 지속적으로 데이터를 관찰하고 변경(value 이벤트)이 발생할 때마다 snapshot을 받아와서 콜백에 전달한다. 이를 방지하고자 useEffect를 사용해서 컴포넌트가 언마운트 될 때 해당 경로에 [off()](https://firebase.google.com/docs/database/web/read-and-write?authuser=1#detach_listeners) 메서드를 호출하여 데이터 변경에대한 콜백을 삭제시켜 줄 수 있다.

  상태관리에 mobx를 사용했고 firebase에 대한 로직을 분리했기때문에 아래와 같이 작성했다.

  ```js
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on('value', snapshot => {
      //...
      onUpdate(data);
    });

    return () => ref.off();
  }

  @action
  setCards = () => {
    const stopCards = cardRepository.syncCards(this.uid, data => {
      runInAction(() => {
        this.\_cards = data;
      });
    });

    return () => stopCards();
  };

  useEffect(() => {
    const stopCards = store.setCards();
    return () => stopCards();
  }, [store.uid]);
  ```

## Acknowledgements

- [Dream Coding](https://academy.dream-coding.com/)
- [나무소리](https://youtube.com/playlist?list=PLOSNUO27qFbtYC5oRwJVsNavcPEI5uoiJ)
