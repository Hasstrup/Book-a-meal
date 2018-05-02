import 'babel-polyfill';

/* eslint no-underscore-dangle: 0 */
class DataHandler {
  constructor(initData, required = []) {
    if ((typeof initData) !== 'object') {
      throw new TypeError('invalid input passed into datahandler');
    }
    this.validateInit(initData);
    this.data = {};
    this.required = required;
  }


  validateInit(input) {
    this.hooks = [String, Number, Object, Array, Date, Boolean];
    const vals = Object.values(input);
    const StringHooks = this.hooks.map(item => JSON.stringify(item));
    const mappedValues = vals.map((value) => {
      if (StringHooks.includes(JSON.stringify(value)) || StringHooks.includes(JSON.stringify(value.constructor))) {
        return 1;
      }
      return 0;
    });
    const mappedKeys = Object.keys(input);
    if (mappedValues.includes(0)) {
      throw new TypeError(`invalid input ${vals[mappedValues.indexOf(0)]} for ${mappedKeys[mappedValues.indexOf(0)]}`);
    }
    this.keys = input;
    this.refs = this.checkForRefs(input);
  }

  setMasterKey(key) {
    // ensure that key is a number;
    if (!key || (typeof key) !== 'object' || !key.key || !key.type) {
      throw TypeError('The key has to be present and has to have a value and type');
    }
    this.masterKey = key;
  }


  /* eslint class-methods-use-this: 0 */
  /* eslint no-new-object: 0 */
  checkForRefs(input) {
    const vals = Object.values(input);
    const values = Object.keys(input).map((item, index) => {
      const log = new Object();
      log[`${item}`] = vals[index];
      return log;
    });
    this.refsMultiple = this.checkForMultipleRefs(input);
    const refs = {};
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
        const log = new Object();
        log[`${item}`] = vals[index];
        return log;
      }
      return null;
    });
    const ref = {};
    values.filter(item => item).forEach((item) => {
      ref[`${Object.keys(item)[0]}`] = Object.values(item)[0][0].refs;
    });
    return ref;
  }


  /* This method checks if the query is an object, after doing that,
 it checks if the field is registered in the schema, then matches the data types */
  validateQuery(query) {
    if ((typeof query) !== 'object') {
      throw new TypeError('Invalid query passed, must be an object');
    } else if (Object.keys(query)[0] === 'id' && Object.values(query)[0].constructor === Number) {
      return true;
    } else if (this.refs[`${Object.keys(query)}`] && Object.values(query)[0].constructor === Number) {
      return true;
    } else if (!Object.keys(this.keys).includes(Object.keys(query)[0])) {
      throw new TypeError(`${Object.keys(query)[0]} is not contained in the schema of this model`);
    } else if (Object.values(query)[0].constructor !== this.keys[`${Object.keys(query)[0]}`]) {
      throw new TypeError(`Invalid datatype passed to ${Object.keys(query)[0]}`);
    } else {
      return true;
    }
  }

  /* This item gets all the items in the internal state and then populates the fields
  if the populate argument is passed
   */
  getAll(populate) {
    const data = Object.values(this.data);
    if (populate && populate === 'populate') {
      return Object.values(this.getData(this.data));
    }
    return data;
  }


  /* This method first validates input,
  then pushes the item into the the internal data state */
  async create(input) {
    try {
      const { validata } = await this.validateInput(input);
      if (Object.values(validata).length === 0) {
        throw new Error('Sorry that was unsucessful');
      }
      const id = Object.values(this.data).length + 1;
      const otherdata = { ...validata, id };
      this.data[`${id}`] = otherdata;
      return this.data[`${id}`];
    } catch (err) {
      throw err;
    }
  }

  /* This method should check the input frst and throw an
  error if it finds a wrong matched datatype,
  and throws an error, it ignores it if it doesnt find the field  */
  async validateInput(input) {
    const keys = Object.keys(this.keys);
    const validata = {};
    // mapping through the keys to check the input
    keys.forEach((key) => {
      if (input[`${key}`] === null) {
        validata[`${key}`] = null;
      } else if (input[`${key}`] && input[`${key}`].constructor === this.keys[`${key}`]) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && ((input[`${key}`].constructor === this.keys[`${key}`].constructor) || (input[`${key}`].constructor === Number && this.keys[`${key}`].constructor === Object))) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && this.refsMultiple[`${key}`] && input[`${key}`].constructor === Array) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && this.refs[`${key}`] && input[`${key}`].constructor === Number) {
        validata[`${key}`] = input[`${key}`];
      } else if (input[`${key}`] && input[`${key}`].constructor !== this.keys[`${key}`] && input[`${key}`] !== null) {
        throw new TypeError(`Wrong datatype for field ${key}`);
      }
    });
    return { passing: true, validata };
  }


  /* This method gets the item in the store that matches the query and
    loops through the fields of the item, replacing the specified fields,
    and setting the new item in the object state. Spewing an error if an invalid query is
    passed or the record isnt found on the schema;
  */
  /* eslint prefer-destructuring: 0 */
  async findOneAndUpdate(query, changes) {
    let target;
    let data;
    if (this.validateQuery(query) && this.validateInput(changes)) {
      // find the target from the query;
      data = Object.values(this.data);
      target = data.filter(item => item[`${Object.keys(query)[0]}`] === Object.values(query)[0])[0];
      if (target) {
        // check that the input keys  matches the correct datatype
        const { validata } = await this.validateInput(changes);
        Object.keys(validata).forEach((key) => {
          target[`${key}`] = validata[`${key}`];
        });
        // finally replace the target in this.data;
        this.data[`${target.id}`] = target;
        return target;
      }
      return null;
    }
    throw new TypeError('Soumething is either wrong with the input or the new changes');
  }


  /* This method takes in the query, searches for it in the internal data state for
  an item that matches the query and then forms a new object that doesnt contain the required item and
  sets that new object as the data of the object
    */
  findOneAndDelete(query) {
    let target;
    let data;
    let filterTray;
    const newState = {};
    if (this.validateQuery(query)) {
      data = Object.values(this.data);
      target = data.filter(item => item[`${Object.keys(query)[0]}`] === Object.values(query)[0])[0];
      if (target) {
        filterTray = data.filter(item => item.id !== target.id);
        filterTray.forEach((node) => {
          newState[`${node.id}`] = node;
        });
        this.data = newState;
        return true;
      }
      throw new Error('No record found with that query');
    }
    throw new Error('Invalid query passed');
  }


  /* this method will return the given object
  after checking the query and will occassionally populate the given fields if provided
  with the populate argument
 */
  findOne(query, populate) {
    if (this.validateQuery(query)) {
      const data = Object.values(this.data);
      const value = data.filter(item => item[`${Object.keys(query)[0]}`] === Object.values(query)[0])[0];
      if (value) {
        if (populate && populate === 'populate') {
          return this._populateMain(value);
        }
        return value;
      }
      return null;
    }
    throw new TypeError('Invalid query passed in');
  }


  /* this method should populate both single and multiple fields by checking for the data path and requiring
  the matching refs value in the data folder;
   */
  /* eslint global-require: 0 */
  /* eslint import/no-dynamic-require: 0  */
  getData(data = this.data) {
    if (Object.keys(this.refs).length > 0 || Object.keys(this.refsMultiple).length > 0) {
      Object.values(data).forEach((node) => {
        data[`${node.id}`] = this._populateMain(node);
      });
    }
    return data;
  }

  _populateMain(node) {
    let Source;
    Object.keys(this.refs).forEach((key) => {
      if (node[`${key}`]) {
        Source = require(`./data/${this.refs[`${key}`].toLowerCase()}.js`).default;
        node[`${key}`] = Source[`${node[`${key}`]}`];
      }
    });

    // secondly multiple relations
    Object.keys(this.refsMultiple).forEach((key) => {
      if (node[`${key}`] && node[`${key}`].constructor === Array) {
        Source = require(`./data/${this.refsMultiple[`${key}`].toLowerCase()}.js`).default;

        /* eslint max-len: 0 */
        /* looping through all the values in the refs field and fetching them from the source file */
        node[`${key}`].forEach((item, index) => {
          node[`${key}`][index] = Source[`${item}`];
        });
      }
    });

    return node;
  }
}

export default DataHandler;
