import db from './db.js'

export async function getPosts(maxNumber) {
  let limitClause = ''

  if (maxNumber) {
    limitClause = 'LIMIT ?'
  }

  const stmt = db.prepare(`
    SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}`)

  await new Promise(resolve => setTimeout(resolve, 1000))
  return maxNumber ? stmt.all(maxNumber) : stmt.all()
}

export async function storePost(post) {
  const stmt = db.prepare(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return stmt.run(post.imageUrl, post.title, post.content, post.userId)
}

export async function updatePostLikeStatus(postId, userId) {
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`)

  const isLiked = stmt.get(userId, postId).count === 0

  if (isLiked) {
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return stmt.run(userId, postId)
  } else {
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return stmt.run(userId, postId)
  }
}
