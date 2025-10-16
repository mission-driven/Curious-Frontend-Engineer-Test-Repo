from datetime import datetime
from flask import Flask, request

from app.utils import render_template_with_device
from app.api.v1 import api_v1, API_V1_PREFIX


app = Flask(__name__)
app.secret_key = b"Hello, developers!"
app.register_blueprint(api_v1, url_prefix=API_V1_PREFIX)


@app.route("/")
def main():
    return "ok"


@app.route("/login")
def login():
    return "ok"


@app.route("/studies/types/popular")
def popular_studies_page():
    return "ok"


@app.route("/study/<int:study_id>")
def study_page(study_id):
    return "ok"


@app.route("/event/attendance-check")
def event_attendance_check():
    # 만약 한번도 출석체크를 하지 않은 사람이라면 온보딩 페이지로 연결되게 하기
    user_id = None

    if datetime.now().month == 8:
        is_august = True
    else:
        is_august = False

    popular_study = POPULAR_STUDY_MOCK
    free_mini_lesson = FREE_MINI_LESSON_MOCK

    return render_template_with_device(
        "event/attendance_check.html",
        access_token=request.cookies.get("access_token"),
        user_id=user_id,
        is_august=is_august,
        popular_study=popular_study,
        free_mini_lesson=free_mini_lesson,
    )


# =============================== MOCK DATA FOR TESTING ===============================

null = None
true = True
false = False

POPULAR_STUDY_MOCK = [
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 4, "id": null, "study_id": 1}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 4,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[1] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-14",
                "end_time": "12:00:00",
                "id": 1,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 1,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "recruiting",
        "title": "[1] recruiting \uc5b4\uc6b8\ub9bc - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 4}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50-Extra1",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[4] \ucd94\uac00\uc77c\uc8151 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-14",
                "end_time": "16:00:00",
                "id": 4,
                "start_time": "14:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 4,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "recruiting",
        "title": "[4] recruiting \ucd94\uac00\uc5b4\uc6b8\ub9bc1 - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 2}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[2] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-07",
                "end_time": "12:00:00",
                "id": 2,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 2,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "in-progress",
        "title": "[2] in-progress \uc5b4\uc6b8\ub9bc - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 7}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-51",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[7] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35451",
                "date": "2025-10-07",
                "end_time": "12:00:00",
                "id": 7,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 7,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "in-progress",
        "title": "[7] in-progress \uc5b4\uc6b8\ub9bc - \uc0ac\uc5c5\uc790\ub9ac\ub35451",
        "writer_id": 51,
        "writer_nickname": "[writer_51] \uc720\ud6a8\ub9ac\ub35451",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-51",
    },
]

FREE_MINI_LESSON_MOCK = [
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 4, "id": null, "study_id": 1}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 4,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[1] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-14",
                "end_time": "12:00:00",
                "id": 1,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 1,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "recruiting",
        "title": "[1] recruiting \uc5b4\uc6b8\ub9bc - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 4}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50-Extra1",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[4] \ucd94\uac00\uc77c\uc8151 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-14",
                "end_time": "16:00:00",
                "id": 4,
                "start_time": "14:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 4,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "recruiting",
        "title": "[4] recruiting \ucd94\uac00\uc5b4\uc6b8\ub9bc1 - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 2}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-50",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[2] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35450",
                "date": "2025-10-07",
                "end_time": "12:00:00",
                "id": 2,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 2,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "in-progress",
        "title": "[2] in-progress \uc5b4\uc6b8\ub9bc - \ud504\ub9ac\ub79c\uc11c\ub9ac\ub35450",
        "writer_id": 50,
        "writer_nickname": "[writer_50] \uc720\ud6a8\ub9ac\ub35450",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-50",
    },
    {
        "StudyReview": [],
        "StudyViewCount": [{"count": 0, "id": null, "study_id": 7}],
        "category_list": ["\uc6a9\ub3c8\ubc8c\uae30"],
        "count": 0,
        "cover_image": "https://placehold.co/500x500/png?text=ValidLeader-51",
        "created_at": "2025-09-30T02:18:05.614362",
        "curriculum_detail_list": [
            {
                "content": "[7] \uc77c\uc815 1 - \uc720\ud6a8\ub9ac\ub35451",
                "date": "2025-10-07",
                "end_time": "12:00:00",
                "id": 7,
                "start_time": "10:00:00",
            }
        ],
        "date_detail_list": null,
        "id": 7,
        "is_display": true,
        "is_joining_allowed": true,
        "is_offline": false,
        "kind": "curriculum",
        "method": "lecture",
        "price": 0,
        "status": "in-progress",
        "title": "[7] in-progress \uc5b4\uc6b8\ub9bc - \uc0ac\uc5c5\uc790\ub9ac\ub35451",
        "writer_id": 51,
        "writer_nickname": "[writer_51] \uc720\ud6a8\ub9ac\ub35451",
        "writer_profile_image": "https://placehold.co/200x200/png?text=ValidLeader-51",
    },
]
