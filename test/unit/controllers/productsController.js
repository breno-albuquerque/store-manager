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

describe('Busca todos produtos', () => {

  
  describe('Em caso de sucesso', () => {
    const response = {};
    const request = {};

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
      await productsController.getProducts(request, response)

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('É chamado o json com um array de objetos', async () => {
      await productsController.getProducts(request, response);

      expect(response.json.calledWith([productExample1, productExample2])).to.be.true;
    });
  });
});