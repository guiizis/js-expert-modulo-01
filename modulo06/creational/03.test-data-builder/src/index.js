function productValidator(product) {
  const errors = []
  if (!(product.id.length >= 2 && product.id <= 20)) {
    errors.push(`id: invalid length, current [${product.id}] expected id between 2 and 20`)
  }

  if(/(\W|\d)/.test(product.name)) {
    errors.push(`name: invalid value, current [${product.name}] expected name to have only Words`)
  }

  if(Number(product.price) < 0 || Number(product.price) > 1000) {
    errors.push(`price: invalid value, current [${product.price}] expected price between 0 and 1000`)
  }

  if(product.category !== 'electronic' && product.category !== 'organic') {
    errors.push(`category: invalid category, current [${product.category}] expected category to be electronic or organic`)
  }

  return {
    result: errors.length === 0,
    errors
  }
}

module.exports = {productValidator}