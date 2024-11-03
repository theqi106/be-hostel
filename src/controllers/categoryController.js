import * as services from '../services/category'

export const getCategories = async (req, res) =>{
    try {
        const response = await services.getCategories()
        return res.status(200).json(response)
    } catch(err){
        return res.status(500).json({
            err : -1,
            msg: 'Fail at category controller : ' + err
        })
    }
}