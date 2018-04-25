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
    this.keys = input
  }



  /* eslint class-methods-use-this: 0 */
  checkForRefs(input) {
    const vals = Object.values(input);
    const values = Object.keys(input).map((item, index) => {
      const log = new Object();
      log[`${item}`] = vals[index];
      return log;
    });
    this.checkForMultipleRefs(input);
    let refs = {}
    const valss = values.filter(item => (typeof Object.values(item)[0]) === 'object' && Object.values(item)[0].refs && Object.values(item)[0].refs.constructor === String);
    valss.forEach((item) => {
      refs[`${Object.keys(item)[0]}`] = Object.values(item)[0].refs;
    });
    this.refs = refs;
    return this.refs;
  }



// check has_many associations
  checkForMultipleRefs(input) {
    const vals = Object.values(input);
    const values = Object.keys(input).map((item, index) => {
      if (vals[index].constructor === Array && vals[index][0].refs) {
        const log = new Object()
        log[`${item}`] = vals[index];
        return log;
      }
      return null;
    });
    let ref = {}
    values.filter(item => item).forEach((item, index) => {
      ref[`${Object.keys(item)[0]}`] = Object.values(item)[0][0].refs;
    })
    this.refsMultiple = ref;
  }





  /* This method checks if the query is an object, after doing that,
 it checks if the field is registered in the schema,  */
  validateQuery(query) {
    if ((typeof query) !== 'object') {
      throw new TypeError('Invalid query passed, must be an object');
    } else if (!Object.keys(this.keys).includes(Object.keys(query)[0])) {
      throw new TypeError(`${Object.keys(query)[0]} is not contained in the schema of this model`);
    } else if (Object.values(query)[0].constructor !== this.keys[`${Object.keys(query)[0]}`]) {
      throw new TypeError(`Invalid datatype passed to ${Object.keys(query)[0]}`);
    } else {
      return true;
    }
  }

   all () {

   }


  /* This method first validates input, then te */
  async pushData(input) {
    try {
      const { validata } = await this.validateInput(input);
      if (Object.values(validata) === 0) {
        throw new Error('Sorry that was unsucessful');
      }
      const id = Object.values(this.data).length;
      const otherdata = { ...validata, id };
      this.data[`${id}`] = otherdata;
      return this.data[`${(Object.keys(this.data).length) - 1}`];
    } catch (err) {
      throw err;
    }
  }

/* This method should check the input frst and throw an error if it finds a wrong matched datatype,
 and throws an error, it ignores it if it doesnt find the field  */
  async validateInput(input) {
    const keys = Object.keys(this.keys);
    const validata = {};
    // mapping through the keys to check the input
    keys.forEach((key) => {
      if (input[`${key}`] && input[`${key}`].constructor === this.keys[`${key}`]) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && input[`${key}`].constructor !== this.keys[`${key}`]) {
        throw new TypeError(`Wrong datatype for field ${key}`);
      }
    });
    return { passing: true, validata }
  }

   findOneAndUpdate () {

   }

   findOneAndDelete () {

   }

   findOne(query) {
     if (this.validateQuery(query)) {
       const data = Object.values(this.data);
       const value = data.filter(item => item[`${Object.keys(query)[0]}`] === Object.values(query)[0]);
       return value[0]
     }
   }


   /* this method should populate both single and multiple fields by checking for the data path */
   getData(data) {
     if( Object.keys(this.refs).length > 0 || Object.keys(this.refsMultiple).length > 0) {
       // first get the single associations

     }
   }
}

export default DataHandler
