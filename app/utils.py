from flask import request, render_template


def render_template_with_device(*args, **kwargs):
    user_agent = request.headers.get("User-Agent")
    access_token = request.cookies.get("access_token")
    if "Mobile" in user_agent:
        mobile = True
    else:
        mobile = False
    if access_token:
        login_user = True
    else:
        login_user = False

    return render_template(*args, **kwargs, mobile=mobile, login_user=login_user)
