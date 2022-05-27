const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

const response = {};
const request = {};
const next = () => {}

const completeSale = {
  saleId: 1,
  date: "2021-09-09T04:54:29.000Z",
  productId: 1,
  quantity: 2
}

const salesProductExample = {
  date: "2021-09-09T04:54:29.000Z",
  productId: 1,
  quantity: 2
}

describe('Busca todas vendas no controller', () => {
  describe('Em caso de sucesso', () => {

    before(async () => {
      const serviceMock = [completeSale];
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves(serviceMock)
    });
  
    after(async () => {
      salesService.getSales.restore();
    });

    it('É chamado o status com código 200', async () => {
      await salesController.getSales(request, response, next)

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('É chamado o json com um array de objetos', async () => {
      await salesController.getSales(request, response);

      expect(response.json.calledWith([completeSale])).to.be.true;
    });
  });
});

describe('Busca venda pelo id no controller', () => {
  before(async () => {
    const serviceMock = [salesProductExample];

    request.params = { id: 1 }
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleById').resolves(serviceMock)
  });

  after(async () => {
    salesService.getSaleById.restore();
  });

  describe('Em caso de id válido', () => {
    it('É chamado status com o código 200', async () => {
      await salesController.getById(request, response, next);

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('É chamado o json com um objeto', async () => {
      await salesController.getById(request, response, next);

      expect(response.json.calledWith([salesProductExample])).to.be.true;
    });
  });
});

describe('Adiciona venda no controller', () => {
  const response = {};
  const request = {};
  const next = () => {}

  before(async () => {
    request.body =[ { productId: 1, quantity: 3 } ];
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, 'postSales').resolves({ affectedRows: 1 });
  });

  after(async () => {
    salesService.postSales.restore();
  });

  describe('Em caso de sucesso', () => {
    it('É chamado status com o código 201', async () => {
      await salesController.postSale(request, response, next);

      expect(response.status.calledWith(201)).to.be.true;
    });
  });
})