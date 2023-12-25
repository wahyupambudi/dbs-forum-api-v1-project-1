const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    /**
     * @TODO 3
     * Lengkapi pengujian `AddThreadUseCase` agar dapat memastikan
     * flow/logika yang dituliskan pada `AddThreadUseCase` benar!
     *
     * Tentunya, di sini Anda harus melakukan Test Double
     * untuk memalsukan implmentasi fungsi `threadRepository`.
     */

    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddThread = new AddedThread({
      id: 'thread-123',
      title: 'ini contoh thread title',
      owner: 'user-123',
    });

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const useCasePayload = {
      title: 'ini contoh thread title',
      body: 'ini contoh thread body',
      owner: 'user-123',
    };

    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: 'ini contoh thread title',
      owner: 'user-123',
    });

    // Action
    const addedThread = await useCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
