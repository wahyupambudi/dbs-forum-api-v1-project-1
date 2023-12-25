const DeleteComment = require('../DeleteComment');

describe('DeleteComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
    };

    // Action and Assert
    expect(() => new DeleteComment(payload))
      .toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner: 'user-123',
      threadId: 1234567890,
    };

    // Action and Assert
    expect(() => new DeleteComment(payload))
      .toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create DeleteComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner: 'user-123',
      threadId: 'thread-123',
    };

    // Action
    const {
      id, owner, threadId,
    } = new DeleteComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(owner).toEqual(payload.owner);
    expect(threadId).toEqual(payload.threadId);
  });
});
