class CommentRepository {
  async addComment(newComment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isCommentExist(commentId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isCommentOwner(commentId, owner) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @TODO 6
   * Buatlah dua async method bernama `deleteComment` dan `getCommentsByThreadId`
   *
   * Pastikan method tersebut dibuat abstract dengan langsung
   * membangkitkan error dengan pesan "COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
   */
  async deleteComment(commentId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentsByThreadId(threadId) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
