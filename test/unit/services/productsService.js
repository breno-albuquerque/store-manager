const chai = require('chai')
const sinon = require('sinon');

chai.use(require('chai-as-promised'))

const { expect } = chai;
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const MyError = require('../../../helpers/MyError');

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

describe('Busca todos produtos no service', () => {
  describe('Em caso de sucesso', () => {
    before(async () => {
      const modelMock = [productExample1, productExample2];

      sinon.stub(productsModel, 'getAll').resolves(modelMock)
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('productsModel.getAll deve ser chamada sem argumentos', async () => {
      await productsService.getProducts();

      expect(productsModel.getAll.calledWith()).to.equal(true);
    });
    it('Retorna um array de objetos', async () => {
      const products = await productsService.getProducts();

      expect(products).to.be.an('array');
      expect(products[0]).to.be.an('object');
    });
  });
});

describe('Busca produto por id no service', () => {
  describe('Em caso de id inválido', () => {
    before(async () => {
      const modelMock = [];
  
      sinon.stub(productsModel, 'getById').resolves(modelMock)
    });
  
    after(async () => {
      productsModel.getById.restore();
    });
    
    it('Uma excessão deve ser lançada com a mensagem "Product not found"', async () => {
      await expect(productsService.getProducts('id inválido'))
        .to.be.rejectedWith(new MyError, 'Product not found');
    });
  });
  describe('Em caso de id válido', () => {
    before(async () => {
      const modelMock = [productExample1];
  
      sinon.stub(productsModel, 'getById').resolves(modelMock)
    });
  
    after(async () => {
      productsModel.getById.restore();
    });

    it('Deve retornar um objeto', async () => {
      const product = await productsService.getProducts(1);

      expect(product).to.be.an('object');
    })
  });
});

describe('Adiciona produto no service', () => {
  describe('Em caso de sucesso', () => {

    before(async () => {
      const modelMock = { insertId: 1 };
  
      sinon.stub(productsModel, 'postProduct').resolves(modelMock);
      sinon.stub(productsModel, 'getAll').resolves([productExample1, productExample2]);
    });
  
    after(async () => {
      productsModel.postProduct.restore();
      productsModel.getAll.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await productsService.postProduct({name: 'Produto ainda não existente', quantity: 1});

      expect(result).to.be.an('object');
    });
    it('O objeto possui as chaves corretas', async () => {
      const result = await productsService.postProduct({name: 'Produto ainda não existente', quantity: 1});

      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });

  describe('No caso de ja existir um produto com o mesmo nome', () => {

    before(async () => {  
      sinon.stub(productsModel, 'getAll').resolves([productExample1, productExample2]);
    });

    after(async () => {
      productsModel.getAll.restore();
    });

    it('Uma excessão é lançada com a mensagem: "Product already exists"', async () => {
       await expect(productsService.postProduct({name: productExample1.name, quantity: 1}))
        .to.be.rejectedWith(new MyError, 'Product already exists');
    });
  });
});

describe('Atualiza um produto no service', () => {  
  describe('Em caso de id válido', () => {
    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves([productExample1, productExample2]);
      sinon.stub(productsModel, 'updateProduct').resolves([{ affectedRows: 1 }]);
    });
  
    after(async () => {
      productsModel.getAll.restore();
      productsModel.updateProduct.restore();
    });

    it('Retorna um objeto com as chaves corretas', async () => {
      const result = await productsService.updateProduct(1, { name: 'novo-nome', quantity: 20 });

      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });

  });

  describe('Em case de id inválido', () => {
    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves([productExample1, productExample2]);
      sinon.stub(productsModel, 'updateProduct').resolves([{ affectedRows: 1 }]);
    });
  
    after(async () => {
      productsModel.getAll.restore();
      productsModel.updateProduct.restore();
    });

    it('Uma excessão é lançada com a mensagem: "Product not found"', async () => {
      await expect(productsService.updateProduct('id inválido', {name: 'novo-nome', quantity: 15})).to.be.rejectedWith(new MyError, 'Product not found');
    })
  });
});