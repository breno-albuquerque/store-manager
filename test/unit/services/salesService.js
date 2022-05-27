const chai = require('chai')
const sinon = require('sinon');

chai.use(require('chai-as-promised'));

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const MyError = require('../../../helpers/MyError');

const { expect } = chai;

describe('Busca todas vendas no service', () => {
  const completeSale1 = {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  }
  
  const completeSale2 = {
    sale_id: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2
  }
  before(async () => {
    const modelMock = [completeSale1, completeSale2];

    sinon.stub(salesModel, 'getAllSales').resolves(modelMock);
  });
  after(async () => {
    salesModel.getAllSales.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const result = await salesService.getSales();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object')
    });
  });
});

describe('Busca venda por id no service', () => {
  const saleExample1 = {
    id: 1,
    date: "2021-09-09T04:54:54.000Z"
  }

  const saleProductExample1 = {
    sale_id: 1,
    product_id: 1,
    quantity: 5
  }

  
  describe('Em caso de id válido', () => {
    before(async () => {
      sinon.stub(salesModel, 'getSalesById').resolves([saleExample1]);
      sinon.stub(salesModel, 'getSalesProduct').resolves([saleProductExample1]);
    });
  
    after(async () => {
      salesModel.getSalesById.restore();
      salesModel.getSalesProduct.restore();
    });

    it('Retorna um array de objetos', async () => {
      const result = await salesService.getSalesById(1);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });
    it('Os objetos possuem as chaves corretas', async () => {
      const result = await salesService.getSalesById(1);

      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
  });

  describe('Em caso de id inválido', () => {
    before(async () => {
      sinon.stub(salesModel, 'getSalesById').resolves([]);  
    });
    after(async () => {
      salesModel.getSalesById.restore();
    });

    it('Uma excessão deve ser lançada com a mensagem "Sale not found"', async () => {
      await expect(salesService.getSalesById('Id inválido')).to.be.rejectedWith(new MyError, 'Sale not found');
    });
  });
});