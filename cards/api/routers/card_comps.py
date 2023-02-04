# from queries.reviews import ReviewIn, ReviewOut, ReviewQueries, ReviewsOutAll
# from fastapi import APIRouter, Depends, Response
# from authenticator import authenticator


# router = APIRouter()


# @router.get("/api/reviews/", response_model=ReviewsOutAll)
# def reviews_list(queries: ReviewQueries = Depends()):
#     return {
#         "reviews": queries.get_all_reviews(),
#     }


# @router.get(
#     "/api/accounts/{account_id}/reviews/", response_model=ReviewsOutAll
# )
# def reviews_list_by_account(
#     account_id: int,
#     queries: ReviewQueries = Depends(),
# ):
#     return {
#         "reviews": queries.get_all_reviews_by_account(account_id),
#     }


# @router.get("/api/albums/{album_id}/reviews/", response_model=ReviewsOutAll)
# def reviews_list_by_album(
#     album_id: str,
#     queries: ReviewQueries = Depends(),
# ):
#     return {
#         "reviews": queries.get_all_reviews_by_album(album_id),
#     }


# @router.get("/api/reviews/{review_id}", response_model=ReviewOut)
# def get_review(
#     review_id: int,
#     response: Response,
#     queries: ReviewQueries = Depends(),
# ):
#     record = queries.get_review(review_id)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record


# @router.post("/api/reviews/", response_model=ReviewOut)
# def create_review(
#     review_in: ReviewIn,
#     queries: ReviewQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return queries.create_review(review_in)


# @router.put("/api/reviews/{review_id}", response_model=ReviewOut | str)
# def update_review(
#     review_id: int,
#     review_in: ReviewIn,
#     response: Response,
#     queries: ReviewQueries = Depends(),
# ):
#     record = queries.update_review(review_id, review_in)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record


# @router.delete("/api/reviews/{review_id}", response_model=bool | str)
# def delete_review(
#     review_id: int,
#     queries: ReviewQueries = Depends(),
# ):
#     queries.delete_review(review_id)
#     return True
