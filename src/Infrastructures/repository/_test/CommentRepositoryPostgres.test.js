const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('AddComment', () => {
    it('should persist new comment and return added comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      const newThread = {
        title: 'this is new thread',
        body: 'this is thread body',
        owner: 'user-123',
      };
      const newComment = {
        content: 'this is new comment',
        threadId: 'thread-123',
        owner: 'user-123',
      };

      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await threadRepository.addThread(newThread);

      // Action
      const addedComment = await commentRepository.addComment(newComment);

      // Assert
      expect(addedComment.id).toEqual('comment-123');
      expect(addedComment.content).toEqual(newComment.content);
      expect(addedComment.owner).toEqual(newComment.owner);

      const foundComment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(foundComment).toBeDefined();
      expect(foundComment.id).toEqual('comment-123');
      expect(foundComment.content).toEqual(newComment.content);
      expect(foundComment.thread_id).toEqual(newComment.threadId);
      expect(foundComment.owner).toEqual(newComment.owner);
      expect(foundComment.is_delete).toEqual(false);
      expect(foundComment.date).toBeDefined();
    });
  });

  describe('isCommentExist', () => {
    it('should return true if comment exist', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', owner: 'user-123' });
      const repository = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(repository.isCommentExist('comment-123')).resolves.toBe(true);
    });
  });

  describe('isCommentOwner', () => {
    it('should return true if user is comment owner', async () => {
      // Arrange
      const userId = 'user-123';
      await UsersTableTestHelper.addUser({ id: userId });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      const repository = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(repository.isCommentOwner('comment-123', userId)).resolves.toBe(true);
    });
  });

  describe('deleteComment', () => {
    it('should delete comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      const repository = new CommentRepositoryPostgres(pool, {});

      // Action
      await repository.deleteComment('comment-123');

      // Assert
      const foundComment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(foundComment.is_delete).toEqual(true);
    });
  });

  describe('getCommentsByThreadId', () => {
    it('should return comments by threadId correctly', async () => {
      // Arrange
      const comment = {
        id: 'comment-123',
        threadId: 'thread-123',
        userId: 'user-123',
        content: 'this is comment',
      };
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'superuser' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addComment(comment);
      const repository = new CommentRepositoryPostgres(pool, {});

      // Action and Assert
      const foundComments = await repository.getCommentsByThreadId('thread-123');
      expect(foundComments).toBeDefined();
      expect(foundComments).toHaveLength(1);
      expect(foundComments[0].id).toEqual(comment.id);
      expect(foundComments[0].username).toEqual('superuser');
      expect(foundComments[0].content).toEqual(comment.content);
      expect(foundComments[0].date).toEqual(expect.any(String));
    });
  });
});
