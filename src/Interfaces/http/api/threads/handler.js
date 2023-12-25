const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
  }

  async postThreadHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const useCase = this._container.getInstance(AddThreadUseCase.name);
    const useCasePayload = {
      ...request.payload,
      owner,
    };

    const addedThread = await useCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });

    response.code(201);
    return response;
  }

  async getThreadHandler(request) {
    const { id } = request.params;
    const useCase = this._container.getInstance(GetThreadUseCase.name);
    const thread = await useCase.execute(id);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }
}

module.exports = ThreadsHandler;
