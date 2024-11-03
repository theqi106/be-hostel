import * as services from '../services/province'

export const getProvinces = async (req, res) =>{
    try {
        const response = await services.getProvince()
        return res.status(200).json(response)
    } catch(err){
        return res.status(500).json({
            err : -1,
            msg: 'Fail at province controller : ' + err
        })
    }
}