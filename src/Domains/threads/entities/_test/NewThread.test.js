const NewThread = require('../NewThread');

describe('NewThread entities', () => {
  it('should throw error when payload did not contain needed property', async () => {
    // Arrange
    const payload = {
      title: 'new thread',
    };

    // Action and Assert
    expect(() => new NewThread(payload))
      .toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', async () => {
    // Arrange
    const payload = {
      title: 'new thread',
      body: 123,
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new NewThread(payload))
      .toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewThread object correctly', async () => {
    // Arrange
    const payload = {
      title: 'new thread',
      body: 'this is a new thread',
      owner: 'user-123',
    };

    // Action
    const { title, body, owner } = new NewThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
