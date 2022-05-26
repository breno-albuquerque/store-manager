const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../db');

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

describe('Busca todas vendas no model', () => {
  before(async () => {
    const dataMock = [[completeSale1, completeSale2]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });
    it('O objeto possui as chaves corretas', async () => {
      const result = await salesModel.getAll();

      expect(result[0]).to.include.all.keys('sale_id', 'date', 'product_id', 'quantity');
    });
  });
});

describe('Busca venda por Id no model', () => {
  const saleExample1 = {
    id: 1,
    date: "2021-09-09T04:54:54.000Z"
  }

  before(async () => {
    const dataMock = [[saleExample1]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array com um único objeto', async () => {
      const result = await salesModel.getById(1);

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.be.an('object');
    });
    it('O objeto possui o id correto', async () => {
      const result = await salesModel.getById(1);

      expect(result[0]).to.have.property('id');
      expect(result[0].id).to.equal(1);
    });
  });
});

describe('Busca venda/produto por Id no model', () => {
  const saleProductExample1 = {
    sale_id: 1,
    product_id: 1,
    quantity: 5
  }

  before(async () => {
    const dataMock = [[saleProductExample1]];

    sinon.stub(connection, 'execute').resolves(dataMock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Em caso de sucesso', () => {
    it('Retorna um array de objetos', async () => {
      const result = await salesModel.getSalesProduct(1);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });
    it('Os objetos possuem as chaves corretas', async () => {
      const result = await salesModel.getById(1);

      expect(result[0]).to.include.all.keys('sale_id', 'product_id', 'quantity');
    });
  });
});
