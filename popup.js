(function () {
  if (!_) {
    var _ = require('lodash');
  }

  let namespace = Ember.Application.NAMESPACES.find(n => n.__container__);
  let checkout = namespace && namespace.__container__.lookup('controller:checkout');
  let productType = checkout && checkout.appConfig.productType;

  let fillFieldsInterval = setInterval(function () {
    if (checkout && checkout.data && checkout.model) {
      if (checkout.data.modalities && checkout.data.modalities.length) {
        fillFields();
        clearInterval(fillFieldsInterval);
      }
    }
  }, 1000);

  function fillFields() {
    if (checkout && checkout.data && checkout.model) {
      let a = 97;

      _.each(checkout.data.customerGroups, cg => {
        _.each(cg, c => {
          Ember.setProperties(c, {
            firstName: 'maria',
            lastName: 'silva' + String.fromCharCode(a++),
            birthday: moment(c.referenceDate).subtract(c.range ? c.range[Math.floor(Math.random() * c.range.length)] : c.age, 'year').format('DD/MM/YYYY')
          });
        });
      });

      _.each(checkout.data.modalities, m => {
        if (m.isSelected) {
          Ember.setProperties(m, {
            number: '4242 4242 4242 4242',
            expirationDate: moment().add(5, 'years').format('MM/YYYY'),
            name: 'maria silva',
            securityCode: '123'
          });
        }
      });

      Ember.setProperties(checkout.data.payer, {
        number: '546',
        cep: '08345-000',
        state: 'MG',
        address: {
          cityName: 'Florinda',
          street: 'Rua nave mãe',
          district: 'Albertina'
        },
        birthday: moment().subtract(20, 'years').format('DD/MM/YYYY'),
        phone: '11956561122',
        cpf: '09606988686'
      });

      Ember.setProperties(checkout.data.voucher, {
        email: 'timesite@cvc.com.br',
        emailConfirm: 'timesite@cvc.com.br'
      });
      Ember.setProperties(checkout.data, {
        checkRules: true
      });
    }
  }
})();