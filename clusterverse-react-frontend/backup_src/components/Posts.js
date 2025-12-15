from fastapi import APIRouter

router = APIRouter()

posts = [
    {"id": 1, "user_id": 1, "content": "First post!", "upvotes": 3},
    {"id": 2, "user_id": 2, "content": "Hello Core4.AI!", "upvotes": 5},
]

@router.get("")
def get_posts():
    return posts

@router.post("")
def add_post(post: dict):
    new_id = len(posts) + 1
    post["id"] = new_id
    post["upvotes"] = 0
    posts.append(post)
    return post

@router.post("/{post_id}/upvote")
def upvote_post(post_id: int):
    for post in posts:
        if post["id"] == post_id:
            post["upvotes"] += 1
            return {"message": "ðŸ‘ Upvoted", "post": post}
    return {"error": "Post not found"}
