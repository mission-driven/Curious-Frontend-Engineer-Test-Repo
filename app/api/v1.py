from flask import Blueprint


api_v1 = Blueprint("api_v1", __name__)
API_V1_PREFIX = "/api/v1"

"""
Flask API는 API Gateway 로써의 역할을 한다.
즉, Flask API가 직접 페이지를 랜더링하는 요소를 점차 출여나가 추후에 Frontend
Stack이 들어올 공간을 만들어 두는 것을 목표로 한다.

지금은 Frontend 와 Backend가 모두 파이썬으로 묶여 있고 Frontend가 business
loginc을 수행하는 등 역할이 분명히 나뉘어져있지 않은 상태다. 
이는 곧 작업 공간의 공유를 만들어 내고 개발자의 작업 자유도를 해치는 일이 된다. 

따라서 Flask API 를 통해 Frontend side 에서 진행이 가능한 기능은 Client
side에서 진행할 수 있도록 구현한자. 이는 추후 Frontend 개발자가 재량것 리팩토링
할 수 있도록 파이썬 결합도를 낮출 것이다.

Flask API의 역할은 단순히 요청을 Backend API로 전달하는 역할을 하고 어떤
business logic이나 정책을 수행하지 않는다 다만, Flask origin 으로 들어온 요청을
Fastapi origin 으로 요청하는 역할을 수행한다.
"""


@api_v1.route("/study-schedules/<int:study_id>", methods=["GET"])
def study_schedules(study_id):
    "templates/event/attendance_check.html"
    return {
        "result": "success",
        "result_code": "S0000",
        "message": "ok",
        "data": [
            {
                "id": 1,
                "study_id": 1,
                "content": "[1] 일정 1 - 유효리더50",
                "datetime": "10월 14일 (화) 10:00 ~ 12:00",
            }
        ],
    }, 200


@api_v1.route("/users/<int:user_id>/point/attendances", methods=["GET"])
def get_users_point_attendances(user_id):
    "app/static/js/EVT.js"
    return {
        "result": "error",
        "result_code": "F0001",
        "message": "사용자 정보를 찾을 수 없습니다.",
        "data": [],
    }, 404


@api_v1.route("/point/communities/activities", methods=["GET"])
def get_community_activities():
    "app/static/js/page/community/point/fetch.js"
    return {"result": "success", "message": "정상 처리 되었습니다.", "data": []}, 200


@api_v1.route("/point/communities/ranks", methods=["GET"])
def get_users_point_rank_attendance_including_community_activites():
    "app/static/js/EVT.js"
    return {
        "data": [
            {
                "nickname": "늘상큼",
                "point": 725,
                "profileImage": "https://d1kz3wll5f1aue.cloudfront.net/images/undefined/Hm6cFWtf3gstracx44IRem8zYmqORV",
                "rank": 1,
                "userId": 1,
            },
            {
                "nickname": "책권자",
                "point": 685,
                "profileImage": "https://d1kz3wll5f1aue.cloudfront.net/images/profiles/sO8UjfLnTzB1JLmsBVEwI5gPKBsL5j",
                "rank": 2,
                "userId": 2,
            },
            {
                "nickname": "하늘바람이야기",
                "point": 650,
                "profileImage": "http://k.kakaocdn.net/dn/cFcLr2/btsELqkgMZF/Nbp9ap4KK9p1RG1tW4MEm1/img_640x640.jpg",
                "rank": 3,
                "userId": 3,
            },
        ],
        "message": "정상 처리 되었습니다.",
        "result": "success",
    }, 200


@api_v1.route("/points/users/me", methods=["GET"])
def get_points_users_me():
    "app/static/js/EVT.js"
    return {
        "result": "error",
        "message": "사용자 정보를 찾을 수 없습니다.",
        "data": [],
    }, 404
