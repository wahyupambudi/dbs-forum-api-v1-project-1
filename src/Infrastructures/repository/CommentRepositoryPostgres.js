const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const Comment = require('../../Domains/comments/entities/Comment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, owner, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, content, owner, threadId, false, new Date().toISOString()],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async isCommentExist(commentId) {
    /**
     * @TODO 8
     * Lengkapi kode pada method `isCommentExist` yang berguna untuk
     * melihat apakah komentar berdasarkan `commentId` sudah ada di database atau belum.
     *
     * Method ini harus mengembalikan `true` jika komentar sudah tersedia dan
     * mengembalikan `false` jika komentar belum tersedia.
     */
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return result.rowCount > 0;
  }

  async isCommentOwner(commentId, owner) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return result.rows[0].owner === owner;
  }

  async deleteComment(commentId) {
    const query = {
      text: 'UPDATE comments SET is_delete = true WHERE id = $1',
      values: [commentId],
    };

    await this._pool.query(query);
  }

  async getCommentsByThreadId(threadId) {
    const query = {
      text: `SELECT 
                comments.id,
                comments.content,
                comments.date,
                comments.is_delete,
                users.username
              FROM comments 
              INNER JOIN users ON comments.owner = users.id 
              WHERE comments.thread_id = $1
              ORDER BY comments.date`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => new Comment({
      ...row,
      isDelete: row.is_delete,
    }));
  }
}

module.exports = CommentRepositoryPostgres;
