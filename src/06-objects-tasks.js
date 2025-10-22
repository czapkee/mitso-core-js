/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function getArea() {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = Object.create(proto);
  const data = JSON.parse(json);
  Object.assign(obj, data);
  return obj;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function validateOrder(obj, newType) {
  const order = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'];
  const newIndex = order.indexOf(newType);
  for (let i = 0; i < obj.parts.length; i += 1) {
    const existingType = obj.parts[i].type;
    const existingIndex = order.indexOf(existingType);

    if (newIndex < existingIndex) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
  }

  return obj;
}

const cssSelectorBuilder = {
  element(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    if (obj.parts.some((part) => part.type === 'element')) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    validateOrder(obj, 'element');
    obj.parts.push({ type: 'element', value });
    return obj;
  },

  id(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    if (obj.parts.some((part) => part.type === 'id')) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    validateOrder(obj, 'id');
    obj.parts.push({ type: 'id', value });
    return obj;
  },

  class(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    validateOrder(obj, 'class');
    obj.parts.push({ type: 'class', value });
    return obj;
  },

  attr(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    validateOrder(obj, 'attr');
    obj.parts.push({ type: 'attr', value });
    return obj;
  },

  pseudoClass(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    validateOrder(obj, 'pseudoClass');
    obj.parts.push({ type: 'pseudoClass', value });
    return obj;
  },

  pseudoElement(value) {
    const obj = Object.create(this);
    if (this.parts) {
      obj.parts = [...this.parts];
    } else {
      obj.parts = [];
    }

    if (obj.parts.some((part) => part.type === 'pseudoElement')) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    validateOrder(obj, 'pseudoElement');
    obj.parts.push({ type: 'pseudoElement', value });
    return obj;
  },

  combine(selector1, combinator, selector2) {
    const obj = Object.create(this);
    obj.combined = {
      selector1,
      combinator,
      selector2,
    };
    return obj;
  },

  stringify() {
    if (this.combined) {
      return `${this.combined.selector1.stringify()} ${this.combined.combinator} ${this.combined.selector2.stringify()}`;
    }

    if (!this.parts) {
      return '';
    }
    const order = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'];
    const sortedParts = this.parts.slice()
      .sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    return sortedParts.map((part) => {
      switch (part.type) {
        case 'element': return part.value;
        case 'id': return `#${part.value}`;
        case 'class': return `.${part.value}`;
        case 'attr': return `[${part.value}]`;
        case 'pseudoClass': return `:${part.value}`;
        case 'pseudoElement': return `::${part.value}`;
        default: return '';
      }
    }).join('');
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
