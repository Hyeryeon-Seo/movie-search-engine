// * JS문법요소이용: const,let만으로 변수 선언 / 화살표 함수 / 배열 메소드 / DOM 제어 _api
// --------- TDMB open API  ?? 복붙 ------
// 1. TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODQ3YmVhNWM5OTI1OTMyN2NlNjA0NTIxMDIzOWE1NSIsInN1YiI6IjY1OWFiODFhN2Q1NTA0NWI2Mjg4NTlmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o2XUntr54hPQ0qan4hAjjQ456_VBFIcBlYtClhhWcLA",
  },
};
// ----------------
const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-EN&page=1";

// 2. 영화정보 카드 리스트 UI 구현
fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    let movie_list = data["results"];
    movie_list.forEach((movie) => {
      // movie_list에서 하나씩 영화정보 꺼내기 (movie에 하나씩 넣어서)
      let movie_title = movie["title"]; // 제목
      let movie_overview = movie["overview"]; // 내용 요약
      let movie_rating = movie["vote_average"]; // 평점
      let movie_poster = movie["poster_path"]; // 포스터 이미지 경로
      let movie_date = movie["release_date"];
      let movie_id = movie["id"];

      let movie_year = movie_date.substring(0, 4); // 문자열 자르기로 연도만 따로 지정

      let temp_html = `    <div class="movie-card" id="${movie_id}" onclick="alert('영화 id : ${movie_id}')"> 
                            <p><img src="https://image.tmdb.org/t/p/w300${movie_poster}"></p>
                            <h2 class="title">${movie_title}</h2><h4 class="year">(${movie_year})</h4>
                            <p class="rating">⭐ ${movie_rating}</p>
                            <div class="txt">${movie_overview}</div>
                          </div>`;
      // 근데 onclick보다는 addEventListener을 활용하는게 좋다
      document
        .querySelector(".card-list")
        .insertAdjacentHTML("beforeend", temp_html); //insertAdjacentHTML(위치, TEXT) 요소 삽입
      // 상위 section 태그에 (class명불러서) 적용시 안됨  > querySelector('.클래스명') 쓰니까 됨!
      // 근데 위치 자리에 beforebegin 쓰니까 목록들 순서가 바뀜
      // .innerHTML을 쓰니 한 카드만 출력됨ㅠㅠ

      /* 3. 카드 클릭 시 클릭한 영화 ID 나타내는 alert 창 띄우기
          function alertId() {
      window.alert("영화 ID : " + movie_id); // 위 반복문 변수 사용
       } 
       movie_list[i].addEventListener('click', function() {
         alert("영화 ID : " , ${movie_id});
       })
           const movie_cards = document.querySelectorAll(".movie-card");
           movie_cards.forEach(function (card) {
            card.addEventListener("click", function () {
               alert("영화 ID : " + card.id);
             });
           }); 
      위의 3번 방식은 걍 html태그에 onclick으로 구현했지만 왜 안되는지 의문 ㅠㅠ 바로 위의 addEvent..는 확인눌러도 안사라짐. 
      강의듣고 보완하기로 */
    });
  });

// 4. 영화 검색 UI 구현 - 검색된 영화카드만 나타나게 하기 (display:block, none) _ 답안과는 다름
document.querySelector("#search-btn").addEventListener("click", function (e) {
  e.preventDefault();
  // 초기설정 제거
  let searchInputText = document
    .querySelector("#search-input")
    .value.toLowerCase();
  let movieTitleList = document.querySelectorAll(".movie-card .title"); // 배열인데 여기서 toLowerCase()쓰면 안됨
  console.log(movieTitleList);

  for (let i = 0; i <= movieTitleList.length; i++) {
    // for 조건쓸때 let등 처음시작 변수선언 까먹지말자
    let movieTitleLower = movieTitleList[i].textContent.toLowerCase();
    if (movieTitleLower.includes(searchInputText)) {
      // 포함시
      movieTitleList[i].parentElement.style.display = "block";
    } else {
      movieTitleList[i].parentElement.style.display = "none";
    }
  }
});

// 5. 새로고침시 해당 input태그에 커서 위치, 깜빡이기
const searchInput = document.querySelector("#search-input");
searchInput.focus(); // focus 메소드- 새로고침시 해당 input태그에 커서 위치, 깜빡이기
