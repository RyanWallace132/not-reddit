SELECT p.id, p.title, p.author_id , u.email, u.profile_pic, p.content FROM posts p
JOIN users u ON p.author_id = u.id;