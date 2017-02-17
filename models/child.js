/**
 * Created by Esat IBIS on 2017-02-16.
 * Project: MuskokaDiscoveryCenter.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */


const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    // to be filled in the future
});

module.exports = mongoose.model('Child', childSchema);