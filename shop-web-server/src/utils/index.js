const _ = require('lodash');
const { Types } = require('mongoose')

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
}

const convertTypes = (id) => {
    return new Types.ObjectId(id);
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((item) => [item, 1]));
}

const getUnselectData = (unselect = []) => {
    return Object.fromEntries(unselect.map((item) => [item, 0]));
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k];
        }
    })

    return obj;
}

const updateNestedObjectParser = obj => {
    const final = {};

    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
            const nested = updateNestedObjectParser(obj[k]);

            Object.keys(nested).forEach(nk => {
                final[`${k}.${nk}`] = nested[nk];
            })
        } else {
            final[k] = obj[k];
        }
    })

    return final;
}

module.exports = {
    getInfoData,
    convertTypes,
    getSelectData,
    getUnselectData,
    removeUndefinedObject,
    updateNestedObjectParser
}