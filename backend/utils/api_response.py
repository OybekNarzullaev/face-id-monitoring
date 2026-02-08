from rest_framework.response import Response


def api_response(
    *,
    data=None,
    message="Success",
    success=True,
    meta=None,
    status=200
):
    return Response(
        {
            "success": success,
            "message": message,
            "result": {
                "data": data if data is not None else {} if success else None
            },
            "meta": meta
        },
        status=status
    )
