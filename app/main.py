from datetime import datetime
from flask import Flask, request

from app.utils import render_template_with_device
from app.api.v1 import api_v1, API_V1_PREFIX
from app.mock_data import POPULAR_STUDY_MOCK, FREE_MINI_LESSON_MOCK


app = Flask(__name__)
app.secret_key = b"Hello, developers!"
app.register_blueprint(api_v1, url_prefix=API_V1_PREFIX)


@app.route("/")
def main():
    return '<a href="/event/attendance-check">Test Page로 이동하기</a>'


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
