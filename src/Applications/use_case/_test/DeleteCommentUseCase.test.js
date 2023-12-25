const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('DeleteCommentUseCase', () => {
  it('should throw error if use case payload not contain correct property', async () => {
    // Arrange
    const useCasePayload = {};
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if thread is not found', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve('comment-123'));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action and Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND');
  });

  it('should throw error if comment is not found', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve('thread-123'));
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve(''));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action and Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND');
  });

  it('should throw error if comment is not owned', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve('thread-123'));
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve('comment-123'));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve(''));

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action and Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED');
  });

  it('should orchestrating delete comment properly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.isThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve('thread-123'));
    mockCommentRepository.isCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve('comment-123'));
    mockCommentRepository.isCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.isThreadExist)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.isCommentExist)
      .toHaveBeenCalledWith(useCasePayload.id);
    expect(mockCommentRepository.isCommentOwner)
      .toHaveBeenCalledWith(useCasePayload.id, useCasePayload.owner);
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith(useCasePayload.id);
  });
});
