from flask import jsonify


def success_response(data=None, status=200, message=None):
    response = {
        "success": True,
        "data": data,
    }

    if message:
        response["message"] = message

    return jsonify(response), status


def error_response(message, status=400):
    return jsonify({
        "success": False,
        "error": message,
    }), status