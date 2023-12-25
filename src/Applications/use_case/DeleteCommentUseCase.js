const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const deleteComment = new DeleteComment(useCasePayload);

    const isThreadExist = await this._threadRepository.isThreadExist(deleteComment.threadId);
    if (!isThreadExist) {
      throw new Error('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    const isCommentExist = await this._commentRepository.isCommentExist(deleteComment.id);
    if (!isCommentExist) {
      throw new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
    }

    const isCommentOwner = await this._commentRepository.isCommentOwner(
      deleteComment.id,
      deleteComment.owner,
    );
    if (!isCommentOwner) {
      throw new Error('DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED');
    }

    return this._commentRepository.deleteComment(deleteComment.id);
  }
}

module.exports = DeleteCommentUseCase;
