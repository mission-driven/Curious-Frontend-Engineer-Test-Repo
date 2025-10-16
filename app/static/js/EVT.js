let title = "큐리어스 출석 체크 이벤트!";
let description;
let imageUrl;
let url = "https://curious-500.com/event/attendance-check";
let linkUrl = url;
let buttonUrl = url;
let defaultProfileImage =
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FD6IWQ%2FbtsGh6fCDMo%2F9ASArwCn29afKMUdPdtV8K%2Fimg.png";

function setDescription(description_) {
    // {# attendance_check.html 에서 is_july를 조건으로 설명을 바꿔주기 위해 추가된 함수 #}
    description = description_;
}

function setImageUrl(imageUrl_) {
    // {# attendance_check.html 에서 is_july를 조건으로 공유 이미지를 바꿔주기 위해 추가된 함수 #}
    imageUrl = imageUrl_;
}

function addHrefToClickEvent(id, href) {
    document.getElementById(id).addEventListener("click", function (e) {
        window.location.href = href;
    });
}

function isLoginUser(userId) {
    if (userId == "None") {
        //null이 아니라 None인 이유는 jinja2에서 null을 None으로 바꿔주기 때문
        return false;
    } else {
        return true;
    }
}

function saveCookieAfterUserAttandance() {
    // Get current date
    var currentDate = new Date();

    // Set to end of day
    currentDate.setHours(23);
    currentDate.setMinutes(59);
    currentDate.setSeconds(59);

    // Calculate remaining time until end of day
    var remainingTime = Math.ceil((currentDate.getTime() - Date.now()) / 1000); // in seconds

    // Create cookie string with max-age attribute
    var cookieString =
        "UserDidAttendanceCheck=true;max-age=" + remainingTime + ";path=/";

    document.cookie = cookieString;
}

function buttonDisabled(buttonId) {
    const element = document.getElementById(buttonId);
    element.disabled = true;
    element.style.color = "#BFBFBF";
    element.style.fontWeight = 500;
    element.style.backgroundColor = "#EFEFEF";
    element.style.cursor = "default";
}

const userPointInfo = {
    shareCountToday: 0,
    totalPoint: 0,
    isUserAttendedToday: false,
    attendedDaysInMonth: 0,
};

let pointMapping = {
    1: 25,
    2: 25,
    3: 25,
    4: 25,
    5: 50,
    6: 25,
    7: 25,
    8: 25,
    9: 25,
    10: 50,
    11: 25,
    12: 25,
    13: 25,
    14: 25,
    15: 50,
    16: 50,
    17: 50,
    18: 50,
    19: 50,
    20: 75,
    21: 50,
    22: 50,
    23: 50,
    24: 50,
    25: 75,
    26: 50,
    27: 50,
    28: 50,
    29: 50,
    30: 100,
};

function setPointMapping(mapping_) {
    pointMapping = mapping_;
}

function attendance(userId) {
    fetch(`/api/v1/users/${userId}/point/attendance`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Token": true,
        },
        body: JSON.stringify({
            point: howMuchPointToday(),
            point_source_id: 7,
        }),
    })
        .then((resp) => {
            return resp.json();
        })
        .catch((error) => {
            alert(error);
        });
}

async function updateUserPointInfo(userId) {
    return await fetch(`/api/v1/users/${userId}/point/attendances`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) => json["data"][0]["point_list"])
        .then((data) => {
            data.forEach((d) => {
                userPointInfo.totalPoint += d.amount;
                isTodayPoint = isToday(d.created_at);
                if (isTodayPoint && d.point_source_id == 7) {
                    userPointInfo.isUserAttendedToday = true;
                } else if (isTodayPoint && d.point_source_id == 8) {
                    userPointInfo.shareCountToday += 1;
                }
                if (d.point_source_id == 7) {
                    userPointInfo.attendedDaysInMonth += 1;
                }
            });
        })
        .then(() => {
            disableShareButtonIfAleadyDone();
            disableAttendanceButtonIfAleadyDone();
            updateNumberOfRemainingChanceToShare();
            updateStamps();
            updateCurrentQPoint(userPointInfo.totalPoint);
        })
        .catch((error) => {});
}

// NOTE: 나의 현재 큐포인트, 조회를 위한 API function.
async function updateUserCurrentQPoint() {
    // 여러 포인트 소스 ID를 쿼리 파라미터로 전달

    const url = `/api/v1/points/users/me?point_source_id_list=7&point_source_id_list=8&point_source_id_list=9&point_source_id_list=30&point_source_id_list=31&point_source_id_list=32&standard=amount&period=month`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();

        if (json && json.data && typeof json.data.totalPoint !== "undefined") {
            updateCurrentQPoint(json.data.totalPoint);
        }
    } catch (error) {}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function disableAttendanceButtonIfAleadyDone() {
    if (userPointInfo.isUserAttendedToday) {
        buttonDisabled("AttendanceButton");
    }
    return;
}

function completeStampHtml() {
    return `
                    <div style="position: relative; margin-bottom: 0.125rem">
                      <img
                      style='width:3.15rem; height:3.15rem;'
                        src= "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpzOtq%2FbtsGANLZsSK%2FeKHPUAiUL2yViOMqJumTx0%2Fimg.png"
                        alt="출석완료 이미지"
                      />
                    </div>
                    <p
                      style="
                        color: #121212;
                        text-align: center;
                        font-size: 0.75rem;
                        font-style: normal;
                        font-weight: 700;
                        line-height: 1.125rem; /* 150% */
                      "
                    >
                      완료
                    </p>`;
}

function notCompleteStampHtml(days) {
    return `
                    <div style="position: relative; margin-bottom: 0.125rem">
                      <img
                        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOWE2S%2FbtsGqXicQZR%2FjQw0OzjgPKdp0y3frF1AA1%2Fimg.png"
                        alt="출석체크 전 이미지"
                      />
                      <p
                        style="
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translateX(-50%) translateY(-50%);

                          color: #c3c7d2;
                          text-align: center;
                          font-size: 0.875rem;
                          font-style: normal;
                          font-weight: 500;
                          line-height: 1.25rem; /* 142.857% */
                        "
                      >
                        ${pointMapping[days]}P
                      </p>
                    </div>
                    <p
                      style="
                        color: #777;
                        text-align: center;
                        font-size: 0.75rem;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 1.125rem; /* 150% */
                      "
                    >
                      ${days}회
                    </p>
    `;
}

function updateStamps() {
    for (i = 1; i <= 30; i++) {
        const element = document.getElementById(`Stamp__${i}`);
        if (userPointInfo.attendedDaysInMonth >= i) {
            element.innerHTML = completeStampHtml();
        } else {
            element.innerHTML = notCompleteStampHtml(i);
        }
    }
}

function updateTodayStampComplete() {
    const element = document.getElementById(
        `Stamp__${userPointInfo.attendedDaysInMonth + 1}`
    );
    element.innerHTML = completeStampHtml();
}

function howMuchPointToday() {
    return pointMapping[userPointInfo.attendedDaysInMonth + 1];
}

function updatePointAfterAttend() {
    addPoint(howMuchPointToday());
    updateUserGotPoint();
}

function updateUserGotPoint() {
    document.getElementById("UserGotPoint").innerHTML = howMuchPointToday();
}

function updateCurrentQPoint(point) {
    document.querySelectorAll(".CurrentQPoint").forEach((e) => {
        e.innerHTML = `${numberWithCommas(point)}P`;
    });
}

function addPoint(point) {
    userPointInfo.totalPoint += point;
    updateCurrentQPoint(userPointInfo.totalPoint);
}

function isToday(dateString) {
    const today = new Date();
    const date = new Date(dateString);

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

function clickShareButton(accessToken, userId, this_) {
    if (userPointInfo.shareCountToday >= 3) {
        return;
    }
    shareMessage(
        title,
        description,
        linkUrl,
        buttonUrl,
        imageUrl,
        (buttonTitle = ""),
        {
            access_token: accessToken,
            user_id: userId,
        }
    );
    userPointInfo.shareCountToday += 1;
    setTimeout(() => {
        addPoint(25);
        document.getElementById("ShareCompleteModal").style.display = "block";
        updateNumberOfRemainingChanceToShare();
    }, 2000);

    if (userPointInfo.shareCountToday >= 3) {
        buttonDisabled("ShareButton");
        buttonDisabled("ShareAgainButton");
    }
}

function disableShareButtonIfAleadyDone() {
    if (userPointInfo.shareCountToday >= 3) {
        buttonDisabled("ShareButton");
        buttonDisabled("ShareAgainButton");
    }
}

function updateNumberOfRemainingChanceToShare() {
    document
        .querySelectorAll(".numberOfRemainingChanceToShare")
        .forEach((e) => {
            e.innerHTML = `${3 - userPointInfo.shareCountToday}`;
        });
}

function loadShareCompleteModal() {
    document.getElementById("ShareCompleteModal").innerHTML = `
      <div class="ModalSection">
        <div class="ModalContainer">
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd3Q9iF%2FbtsGq9JvGwv%2FCLf0cl4sd6R0yDzlICEYjk%2Fimg.png"
            alt=""
            class="ModalImage"
          />
          <div class="ModalTextSection">
            <p class="ModalInfoText" id="ShareCompleteModalInfoText">
              오늘 남은 공유 횟수
              <span class="numberOfRemainingChanceToShare"></span>회
            </p>
            <div class="ModalBodyText">
              <div class="ModalTitle" id="ShareCompleteModalTitleText">
                공유 완료! 50P 추가 적립
              </div>
              <div class="ModalBody">
                출석 체크 포인트로 어울림<br />
                할인을 받을 수 있습니다!
              </div>
            </div>
            <div class="ModalWarningText">
              실제로 공유를 하지 않으면, 포인트는 지급되지 않습니다.
            </div>
          </div>
          <div class="ModalButtonSection">
            <button class="AdditionalAction" id="ShareAgainButton">
              추가 공유
            </button>
            <button class="Okay close_btn" id="ShareCompleteModalCloseButton">
              확인
            </button>
          </div>
        </div>
      </div>
	`;
}

function resetRankingBoard() {
    for (i = 1; i <= 50; i++) {
        const order = i;
        const rank = i;
        document.getElementById(`RankerRow__${order}`).style.display = "flex";
        document.getElementById(`RankerRanking__${order}`).innerHTML =
            getRanking(rank);
        document.getElementById(`RankerProfileImage__${order}`).src =
            defaultProfileImage;
        document.getElementById(`RankerProfile__${order}`).href = `#`;
        document.getElementById(`RankerNickname__${order}`).innerHTML = "";
        document.getElementById(`RankerPoint__${order}`).innerHTML = `0P`;
    }
}

function updateRankingBoard() {
    const rankingSize = 50;
    fetch(`/api/v1/users/points/ranks/attendance?size=${rankingSize}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((json) =>
            json.data.forEach(function (d, i) {
                if (d.profile_image == null) {
                    d.profile_image = defaultProfileImage;
                }
                const order = i + 1;
                const rank = d.rank;
                // showMoreRanking(); 으로 인한 주석 처리
                // document.getElementById(`RankerRow__${order}`).style.display ="flex";
                document.getElementById(`RankerRanking__${order}`).innerHTML =
                    getRanking(rank);
                document.getElementById(`RankerProfileImage__${order}`).src =
                    d.profile_image;
                document.getElementById(
                    `RankerProfile__${order}`
                ).href = `/leader/${d.user_id}`;
                document.getElementById(`RankerNickname__${order}`).innerHTML =
                    d.nickname;
                document.getElementById(
                    `RankerPoint__${order}`
                ).innerHTML = `${numberWithCommas(d.point)}P`;
            })
        )
        .then(() => {
            showMoreRanking();
        });
}

// NOTE: 커뮤니티활동 포함한 새로운 랭킹보드 업데이트 function 추가.
function updateRankingBoardIncludingCommunityActivities() {
    const rankingSize = 50;
    fetch(
        `/api/v1/point/communities/ranks?period=month&page=1&size=${rankingSize}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then((response) => response.json())
        .then((json) =>
            json.data.forEach(function (d, i) {
                if (d.profileImage == null) {
                    d.profileImage = defaultProfileImage;
                }
                const order = i + 1;
                const rank = d.rank;
                // showMoreRanking(); 으로 인한 주석 처리
                // document.getElementById(`RankerRow__${order}`).style.display ="flex";
                document.getElementById(`RankerRanking__${order}`).innerHTML =
                    getRanking(rank);
                document.getElementById(`RankerProfileImage__${order}`).src =
                    d.profileImage ? d.profileImage : defaultProfileImage;
                document.getElementById(
                    `RankerProfile__${order}`
                ).href = `/leader/${d.userId}`;
                document.getElementById(`RankerNickname__${order}`).innerHTML =
                    d.nickname;
                document.getElementById(
                    `RankerPoint__${order}`
                ).innerHTML = `${numberWithCommas(d.point)}P`;
            })
        )
        .then(() => {
            showMoreRanking();
        });
}

var currentShowingRanking = 0;

function showMoreRanking() {
    currentShowingRanking += 10;
    if (currentShowingRanking >= 50) {
        hideShowMoreRankingButton();
    }
    for (i = 1; i <= currentShowingRanking; i++) {
        if (document.getElementById(`RankerNickname__${i}`).innerHTML != "") {
            document.getElementById(`RankerRow__${i}`).style.display = "flex";
        } else {
            hideShowMoreRankingButton();
        }
    }
}

function hideShowMoreRankingButton() {
    document.getElementById("ShowMoreRankingButton").style.display = "none";
}

function getRanking(rank) {
    if (rank == 1) {
        return trophy("gold");
    } else if (rank == 2) {
        return trophy("silver");
    } else if (rank == 3) {
        return trophy("bronze");
    } else {
        return `<div style="width: 24px; text-align: center; color: #565656; font-size: 16px; font-weight: 500; line-height: 24px; word-wrap: break-word">${rank}</div>`;
    }
}

function trophy(color) {
    if (color == "gold") {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 1.71429H16C16.5304 1.71429 17.0391 1.91751 17.4142 2.27919C17.7893 2.64087 18 3.13138 18 3.64287V11.3572C18 12.8916 17.3679 14.3633 16.2426 15.4483C15.1174 16.5333 13.5913 17.1429 12 17.1429C10.4087 17.1429 8.88257 16.5333 7.75735 15.4483C6.63214 14.3633 6 12.8916 6 11.3572V3.64287C6 3.13138 6.21071 2.64087 6.58578 2.27919C6.96086 1.91751 7.46957 1.71429 8 1.71429Z" fill="#FFD25D"/>
  <path d="M13.7142 13.7143H10.2856V21.4286H13.7142V13.7143Z" fill="#FFD25D"/>
  <path d="M19.8366 5.80954V8.19049C19.8366 8.56937 19.6818 8.93274 19.4063 9.20065C19.1307 9.46855 18.7569 9.61906 18.3672 9.61906H17.8774V5.80954H19.8366ZM20.3264 3.42859H15.4285V12H18.3672C19.4065 12 20.4031 11.5987 21.1379 10.8842C21.8728 10.1698 22.2856 9.20084 22.2856 8.19049V5.33335C22.2856 4.82818 22.0792 4.34369 21.7118 3.98648C21.3444 3.62927 20.846 3.42859 20.3264 3.42859Z" fill="#FFD25D"/>
  <path d="M6.1224 5.80954V9.61906H5.6326C5.24289 9.61906 4.86916 9.46855 4.59359 9.20065C4.31803 8.93274 4.16321 8.56937 4.16321 8.19049V5.80954H6.1224ZM8.57138 3.42859H3.67342C3.15381 3.42859 2.65548 3.62927 2.28806 3.98648C1.92065 4.34369 1.71423 4.82818 1.71423 5.33335V8.19049C1.71423 9.20084 2.12707 10.1698 2.86191 10.8842C3.59674 11.5987 4.59338 12 5.6326 12H8.57138V3.42859Z" fill="#FFD25D"/>
  <path d="M8.9206 19.7143H15.0792C15.6877 19.7917 16.2423 20.1034 16.6254 20.5833C17.0086 21.0633 17.1903 21.6738 17.1321 22.2857H6.86772C6.8095 21.6738 6.99122 21.0633 7.37439 20.5833C7.75756 20.1034 8.3121 19.7917 8.9206 19.7143Z" fill="#51C465"/>
  <path d="M11.9999 4.28571L12.9622 7.24706H16.0759L13.5568 9.07728L14.519 12.0386L11.9999 10.2084L9.48087 12.0386L10.4431 9.07728L7.92399 7.24706H11.0377L11.9999 4.28571Z" fill="white"/>
</svg>
        `;
    } else if (color == "silver") {
        return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 1.71429H16C16.5304 1.71429 17.0391 1.91751 17.4142 2.27919C17.7893 2.64087 18 3.13138 18 3.64287V11.3572C18 12.8916 17.3679 14.3633 16.2426 15.4483C15.1174 16.5333 13.5913 17.1429 12 17.1429C10.4087 17.1429 8.88257 16.5333 7.75735 15.4483C6.63214 14.3633 6 12.8916 6 11.3572V3.64287C6 3.13138 6.21071 2.64087 6.58578 2.27919C6.96086 1.91751 7.46957 1.71429 8 1.71429Z" fill="#CACACA"/>
  <path d="M13.7142 13.7143H10.2856V21.4286H13.7142V13.7143Z" fill="#CACACA"/>
  <path d="M19.8366 5.80954V8.19049C19.8366 8.56937 19.6818 8.93274 19.4063 9.20065C19.1307 9.46855 18.7569 9.61906 18.3672 9.61906H17.8774V5.80954H19.8366ZM20.3264 3.42859H15.4285V12H18.3672C19.4065 12 20.4031 11.5987 21.1379 10.8842C21.8728 10.1698 22.2856 9.20084 22.2856 8.19049V5.33335C22.2856 4.82818 22.0792 4.34369 21.7118 3.98648C21.3444 3.62927 20.846 3.42859 20.3264 3.42859Z" fill="#CACACA"/>
  <path d="M6.1224 5.80954V9.61906H5.6326C5.24289 9.61906 4.86916 9.46855 4.59359 9.20065C4.31803 8.93274 4.16321 8.56937 4.16321 8.19049V5.80954H6.1224ZM8.57138 3.42859H3.67342C3.15381 3.42859 2.65548 3.62927 2.28806 3.98648C1.92065 4.34369 1.71423 4.82818 1.71423 5.33335V8.19049C1.71423 9.20084 2.12707 10.1698 2.86191 10.8842C3.59674 11.5987 4.59338 12 5.6326 12H8.57138V3.42859Z" fill="#CACACA"/>
  <path d="M8.9206 19.7143H15.0792C15.6877 19.7917 16.2423 20.1034 16.6254 20.5833C17.0086 21.0633 17.1903 21.6738 17.1321 22.2857H6.86772C6.8095 21.6738 6.99122 21.0633 7.37439 20.5833C7.75756 20.1034 8.3121 19.7917 8.9206 19.7143Z" fill="#51C465"/>
  <path d="M11.9999 4.28571L12.9622 7.24706H16.0759L13.5568 9.07728L14.519 12.0386L11.9999 10.2084L9.48087 12.0386L10.4431 9.07728L7.92399 7.24706H11.0377L11.9999 4.28571Z" fill="white"/>
</svg>
        `;
    } else if (color == "bronze") {
        return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8 1.71429H16C16.5304 1.71429 17.0391 1.91751 17.4142 2.27919C17.7893 2.64087 18 3.13138 18 3.64287V11.3572C18 12.8916 17.3679 14.3633 16.2426 15.4483C15.1174 16.5333 13.5913 17.1429 12 17.1429C10.4087 17.1429 8.88257 16.5333 7.75735 15.4483C6.63214 14.3633 6 12.8916 6 11.3572V3.64287C6 3.13138 6.21071 2.64087 6.58578 2.27919C6.96086 1.91751 7.46957 1.71429 8 1.71429Z" fill="#C3700F"/>
  <path d="M13.7142 13.7143H10.2856V21.4286H13.7142V13.7143Z" fill="#C3700F"/>
  <path d="M19.8366 5.80954V8.19049C19.8366 8.56937 19.6818 8.93274 19.4063 9.20065C19.1307 9.46855 18.7569 9.61906 18.3672 9.61906H17.8774V5.80954H19.8366ZM20.3264 3.42859H15.4285V12H18.3672C19.4065 12 20.4031 11.5987 21.1379 10.8842C21.8728 10.1698 22.2856 9.20084 22.2856 8.19049V5.33335C22.2856 4.82818 22.0792 4.34369 21.7118 3.98648C21.3444 3.62927 20.846 3.42859 20.3264 3.42859Z" fill="#C3700F"/>
  <path d="M6.1224 5.80954V9.61906H5.6326C5.24289 9.61906 4.86916 9.46855 4.59359 9.20065C4.31803 8.93274 4.16321 8.56937 4.16321 8.19049V5.80954H6.1224ZM8.57138 3.42859H3.67342C3.15381 3.42859 2.65548 3.62927 2.28806 3.98648C1.92065 4.34369 1.71423 4.82818 1.71423 5.33335V8.19049C1.71423 9.20084 2.12707 10.1698 2.86191 10.8842C3.59674 11.5987 4.59338 12 5.6326 12H8.57138V3.42859Z" fill="#C3700F"/>
  <path d="M8.9206 19.7143H15.0792C15.6877 19.7917 16.2423 20.1034 16.6254 20.5833C17.0086 21.0633 17.1903 21.6738 17.1321 22.2857H6.86772C6.8095 21.6738 6.99122 21.0633 7.37439 20.5833C7.75756 20.1034 8.3121 19.7917 8.9206 19.7143Z" fill="#51C465"/>
  <path d="M11.9999 4.28571L12.9622 7.24706H16.0759L13.5568 9.07728L14.519 12.0386L11.9999 10.2084L9.48087 12.0386L10.4431 9.07728L7.92399 7.24706H11.0377L11.9999 4.28571Z" fill="white"/>
</svg>
        `;
    }
}
