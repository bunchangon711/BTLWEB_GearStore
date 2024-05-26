const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const { name, image, type, countInStock, price ,rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The product name already existed'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                countInStock, 
                price,
                rating, 
                description
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct == null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch(e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct == null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product succesfully',
            })
        } catch(e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise( async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})
            resolve({
                status: 'OK',
                message: 'Delete products succesfully',
            })
        } catch(e) {
            reject(e)
        }
    })
}


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise( async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if(filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex' : filter[1] } }).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'Find all products succesfully',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Find all products succesfully',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'OK',
                message: 'Find all products succesfully',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch(e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if(product == null) {
                resolve({
                    status: 'ERR',
                    message: 'The product does not exist'
                })
            }
            resolve({
                status: 'OK',
                message: 'Retrieved product details succesfully',
                data: product
            })
        } catch(e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Find all products type succesfully',
                data: allType,
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}