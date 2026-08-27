def success_response(data=None, message=None, status_code=200):
    """
    Builds a "this worked" response.

    data: whatever the frontend actually asked for (a list of
          users, a single resource, etc.) — can be left out.
    message: a short human-readable note, e.g. "User updated."
    status_code: the HTTP status number, defaults to 200 (OK).

    Returns a tuple of (body, status_code), which is exactly what
    Flask expects when you write: return success_response(...)
    """
    body = {"success": True}

    if data is not None:
        body["data"] = data

    if message is not None:
        body["message"] = message

    return body, status_code


def error_response(message, status_code=400):
    """
    Builds a "this went wrong" response.

    message: what went wrong, in plain English, e.g.
             "Email is already in use."
    status_code: the HTTP status number. Common ones:
        400 = bad request (something wrong with the input)
        401 = not logged in
        403 = logged in, but not allowed to do this
        404 = not found
        500 = something broke on the server
    """
    body = {"success": False, "error": message}
    return body, status_code