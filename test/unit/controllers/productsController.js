const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

const productExample1 = {
  id: 1,
  name: "Produto X",
  quantity: 10
}

const productExample2 = {
  id: 2,
  name: "Produto Y",
  quantity: 15
}

describe('Busca todos produtos no controller', () => {
  describe('Em caso de sucesso', () => {
    const response = {};
    const request = {};
    const next = () => {}

    before(async () => {
      const serviceMock = [productExample1, productExample2];
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves(serviceMock)
    });
  
    after(async () => {
      productsService.getProducts.restore();
    });

    it('É chamado o status com código 200', async () => {
      await productsController.getProducts(request, response, next)

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('É chamado o json com um array de objetos', async () => {
      await productsController.getProducts(request, response);

      expect(response.json.calledWith([productExample1, productExample2])).to.be.true;
    });
  });
});

describe('Busca produto pelo id no controller', () => {
  const response = {};
  const request = {};
  const next = () => {}

  before(async () => {
    const serviceMock = productExample1;

    request.params = { id: 1 }
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProducts').resolves(serviceMock)
  });

  after(async () => {
    productsService.getProducts.restore();
  });

  describe('Em caso de id válido', () => {
    it('É chamado status com o código 200', async () => {
      await productsController.getById(request, response, next);

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('É chamado o json com um objeto', async () => {
      await productsController.getById(request, response, next);

      expect(response.json.calledWith(productExample1)).to.be.true;
    });
  });
});

describe('Adiciona produto no controller', () => {
  const response = {};
  const request = {};
  const next = () => {}

  before(async () => {
    request.body = { name: 'Produto', quantity: 10 }
    request.status = sinon.stub().returns(response);
    request.json = sinon.stub().returns();

    sinon.stub(productsService, 'postProduct').resolves({ id: 10, name: 'Produto', quantity: 10 });
  });

  after(async () => {
    productsService.postProduct.restore();
  });

  describe('Em caso de sucesso', () => {
    it('É chamado o status com o código 201', async () => {
      await productsController.postProduct(request, response, next);

      expect(response.status.calledWith(201)).to.be.true;
    });
    it('É chamado o json com um objeto', async () => {
      await productsController.postProduct(request, response, next);

      expect(response.json.calledWith({ id: 10, name: 'Produto', quantity: 10 })).to.be.true;
    });
  });
});
