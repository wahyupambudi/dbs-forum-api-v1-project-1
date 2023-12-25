const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const Thread = require('../../../Domains/threads/entities/Thread');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should throw error if thread is not found', async () => {
    // Arrange
    const threadId = 'thread-123';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(''));

    /** creating use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action and Assert
    await expect(getThreadUseCase.execute(threadId))
      .rejects.toThrowError('GET_THREAD_USE_CASE.THREAD_NOT_FOUND');
  });

  it('should orchestrating get thread properly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const payload = {
      id: threadId,
      title: 'this is thread title',
      body: 'this is thread body',
      date: 'somedate',
      username: 'superuser',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(new Thread(payload)));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve([]));

    /** creating use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await getThreadUseCase.execute(threadId);

    // Assert
    expect(mockThreadRepository.getThreadById)
      .toHaveBeenCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId)
      .toHaveBeenCalledWith(payload.id);
  });
});
