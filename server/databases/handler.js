

class DataHandler {
  constructor(initData) {
    if ((typeof initData) !== 'object') {
      throw new TypeError('invalid input passed into datahandler')
    }
    this.validateInit(initData)
    this.data = {};
    /* Strip the values from the initializing data and check if they occur in this.hooks  */
  }

  validateInit(input) {
    this.hooks = [String, Number, Object, Array, Date];
    const vals = Object.values(input);
    const StringHooks = this.hooks.map(item => JSON.stringify(item));
    const mappedValues = vals.map((value) => {
      if (!StringHooks.includes(JSON.stringify(value))) {
        return 0;
      }
      return 1;
    });
    const mappedKeys = Object.keys(input);
    if (mappedValues.includes(0)) {
      throw new TypeError(`invalid input ${vals[mappedValues.indexOf(0)]} for ${mappedKeys[mappedValues.indexOf(0)]}`);
    }
    this.keys = input;
  }

    findByKey (key) {

   }

   findOne (list) {

   }

   all () {

   }


/* This method first validates input, then te*/
  async pushData(input) {
    try {
      const newData = await this.validateInput(input);
      if (Object.values(newData) === 0) {
        throw new Error('Sorry that was unsucessful');
      }
      const id = Object.values(this.data).length;
      const otherdata = { ...newData, id };
      this.data[`${id}`] = otherdata;
      return this.data[`${(Object.keys(this.data).length) - 1}`]
    } catch (err) {
      throw err;
    }
  }

/* This method should check the input frst and throw an error if it finds a wrong matched datatype,
 and throws an error, it ignores it if it doesnt find the field  */
  async validateInput(input) {
    const keys = Object.keys(this.keys);
    let validata = {};

    // mapping through the keys to check the input
    keys.forEach((key) => {
      if (input[`${key}`] && input[`${key}`].constructor === this.keys[`${key}`]) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && input[`${key}`].constructor !== this.keys[`${key}`]) {
        throw new TypeError(`Wrong datatype for field ${key}`);
      }
    });
    return validata;
  }

   findByKeyAndUpdate () {

   }

   findByKeyAndDelete () {

   }
}

export default DataHandler
